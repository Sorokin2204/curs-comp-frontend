import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './ContentProductAdd.module.scss';
import { Alert, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { categoryReset, getCategories } from '../../../redux/slices/category.slice';
import { getBrands } from '../../../redux/slices/brand.slice';
import { attributeReset, getCategoryAttributes, getProductAttributes } from '../../../redux/slices/attribute.slice';
import { Delete, Edit, Image, Update } from '@mui/icons-material';
import { createProduct, productReset, updateProduct, uploadProduct } from '../../../redux/slices/product.slice';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router';
const ContentProductAdd = () => {
  const {
    getCategoriesState: { data: categories },
  } = useSelector((state) => state.category);
  const {
    getBrandsState: { data: brands },
  } = useSelector((state) => state.brand);
  const {
    getCategoryAttributes: { data: categoryAttributes },
    getProductAttributesState: { data: productAttributes },
  } = useSelector((state) => state.attribute);
  const {
    createProductState: { data: productData, loading: productLoading, error: productError },
    updateProductState: { data: updateProductData, loading: updateProductLoading, error: updateProductError },
    activeProduct,
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [productImage, setProductImage] = useState('');
  const [productImageURL, setProductImageURL] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeBrand, setActiveBrand] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [openError, setOpenError] = useState(false);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);
  const inputFileRef = React.useRef();
  useEffect(() => {}, [categories, brands, categoryAttributes]);

  useEffect(() => {
    return () => {
      dispatch(productReset());
      dispatch(attributeReset());
    };
  }, []);

  useEffect(() => {
    if (activeProduct) {
      dispatch(getProductAttributes(activeProduct.id));
      dispatch(getCategoryAttributes(activeProduct.categoryId));
      if (activeProduct.image) {
        setProductImageURL(`http://localhost:8080/${activeProduct.image}`);
      }
      setActiveCategory(activeProduct.categoryId);
      setActiveBrand(activeProduct.brandId);
      setProductName(activeProduct.name);
      setProductPrice(activeProduct.price);
    }
  }, [activeProduct]);

  const onImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleChangeCategory = (event) => {
    setActiveCategory(event.target.value);
    dispatch(getCategoryAttributes(event.target.value));
  };
  const handleChangeBrand = (event) => {
    setActiveBrand(event.target.value);
  };

  //   useEffect(() => {
  //     const productAttributesWithTypes = {};
  //   }, [productAttributes, categoryAttributes]);

  useEffect(() => {
    if (productError || updateProductError) {
      setOpenError(true);
    }
  }, [productError, updateProductError]);

  useEffect(() => {
    let defaultSelectedAttributes = {};
    if (productAttributes && categoryAttributes && activeCategory === activeProduct?.categoryId) {
      for (let prodAttr of productAttributes) {
        let type = categoryAttributes?.find((catAttr) => catAttr.id === prodAttr.id).type;
        defaultSelectedAttributes[prodAttr.id] = { value: type === 'checkbox' ? !!prodAttr.value : prodAttr.value, type };
      }
    } else if (categoryAttributes) {
      for (let categoryAttribute of categoryAttributes) {
        switch (categoryAttribute.type) {
          case 'text':
            defaultSelectedAttributes[categoryAttribute.id] = { type: categoryAttribute.type, value: '' };
            break;
          case 'number':
            defaultSelectedAttributes[categoryAttribute.id] = { type: categoryAttribute.type, value: undefined };
            break;
          case 'select':
            defaultSelectedAttributes[categoryAttribute.id] = { type: categoryAttribute.type, value: undefined };
            break;
          case 'checkbox':
            defaultSelectedAttributes[categoryAttribute.id] = { type: categoryAttribute.type, value: false };
            break;
          default:
            break;
        }
      }
    }
    setSelectedAttributes(defaultSelectedAttributes);
  }, [productAttributes, categoryAttributes, activeCategory]);

  const onChangeAttributeField = (value, type, id) => {
    setSelectedAttributes({ ...selectedAttributes, [id]: { value, type } });
  };

  const typeAttributes = (attribute) => {
    if (selectedAttributes[attribute?.id])
      switch (attribute.type) {
        case 'checkbox': {
          console.log('ccc', selectedAttributes[attribute.id]?.value);
          return (
            <label
              style={{
                display: 'flex',
                alignItems: 'center',

                fontFamily: 'inherit',
              }}>
              <input
                style={{
                  width: '22px',
                  height: '22px',
                  marginRight: '10px',
                }}
                type="checkbox"
                checked={selectedAttributes[attribute.id]?.value}
                onChange={(e) => {
                  onChangeAttributeField(e.target.checked, attribute.type, attribute.id);
                }}
              />
              {attribute.name}
            </label>
          );
        }
        case 'number':
          return (
            <NumberFormat
              value={selectedAttributes[attribute.id]?.value}
              thousandSeparator={' '}
              customInput={TextField}
              label={attribute.name}
              autoComplete="off"
              onValueChange={({ floatValue }) => {
                onChangeAttributeField(floatValue, attribute.type, attribute.id);
              }}
            />
          );
        case 'text':
          return <TextField label={attribute.name} autoComplete="off" value={selectedAttributes[attribute.id]?.value} onChange={(e) => onChangeAttributeField(e.target.value, attribute.type, attribute.id)} />;
        case 'select':
          return (
            <FormControl fullWidth>
              <InputLabel id={`${attribute.id}-select`}>{attribute.name}</InputLabel>
              <Select
                labelId={`${attribute.id}-select`}
                value={selectedAttributes[attribute.id]?.value}
                label={attribute.name}
                onChange={(e) => {
                  onChangeAttributeField(e.target.value, attribute.type, attribute.id);
                }}>
                {attribute.options.map((opt, i) => (
                  <MenuItem value={opt.id} key={opt.id}>
                    {opt.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        default:
          break;
      }
  };

  const onClickAddProduct = () => {
    let formData = new FormData();
    const attributes = [];
    for (let key of Object.keys(selectedAttributes)) {
      attributes.push({ id: key, ...selectedAttributes[key] });
    }
    if (activeProduct) {
      formData.append('id', activeProduct.id);
    }

    if (productImage) {
      formData.append('image', productImage);
    }
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('categoryId', activeCategory);
    formData.append('brandId', activeBrand);
    formData.append('attributes', JSON.stringify(attributes));

    // console.log(JSON.parse(JSON.stringify(attributes)));
    if (activeProduct) {
      dispatch(updateProduct(formData));
    } else {
      dispatch(createProduct(formData));
    }
  };

  useEffect(() => {
    if (!productImage) return;
    setProductImageURL(URL.createObjectURL(productImage));
  }, [productImage]);
  const onEmptyImageClick = () => {
    inputFileRef.current.click();
  };
  const navigate = useNavigate();
  useEffect(() => {
    if ((productData && !productLoading) || (updateProductData && !updateProductLoading)) {
      dispatch(categoryReset());
      dispatch(productReset());
      dispatch(attributeReset());
      navigate('/admin/products');
    }
  }, [productData, updateProductData]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>{activeProduct ? `Изменить товар "${activeProduct.name}"` : 'Добавить товар'}</h2>
        <Button
          sx={{
            ...(activeProduct && { backgroundColor: 'success.light' }),
          }}
          onClick={() => onClickAddProduct()}
          disabled={!productName || !productPrice || !activeCategory || !activeBrand}>
          {activeProduct ? `Изменить` : 'Добавить'}
        </Button>
      </div>
      <div className={styles.wrapper}>
        <input style={{ display: 'none' }} ref={inputFileRef} type="file" multiple accept="image/*" onChange={onImageChange} />

        {productImageURL ? (
          <>
            <div className={styles.setImage}>
              <img src={productImageURL} className={styles.productImage} />
              <IconButton
                style={{
                  position: 'absolute',
                  top: '0px',
                  left: '0px',
                }}>
                <Edit sx={{ fontSize: '46px !important' }} onClick={() => onEmptyImageClick()} />
              </IconButton>{' '}
              <IconButton
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                }}>
                <Delete
                  sx={{ fontSize: '46px !important', color: 'error.main' }}
                  onClick={() => {
                    setProductImage();
                    setProductImageURL();
                  }}
                />
              </IconButton>
            </div>
          </>
        ) : (
          <div onClick={() => onEmptyImageClick()} className={clsx(styles.image)}>
            <Image />
          </div>
        )}

        <div className={clsx(styles.mainFiledWrapper)}>
          <TextField label="Название" autoComplete="off" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <NumberFormat
            onValueChange={({ floatValue }) => {
              setProductPrice(floatValue);
            }}
            autoComplete="off"
            value={productPrice}
            thousandSeparator={' '}
            suffix={' руб'}
            customInput={TextField}
            label="Цена"
          />
          {categories && (
            <FormControl fullWidth>
              <InputLabel id="category-select">Категория</InputLabel>
              <Select labelId="category-select" value={activeCategory} label="Категория" onChange={handleChangeCategory}>
                {categories.map((category) => (
                  <MenuItem value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {brands && (
            <FormControl fullWidth>
              <InputLabel id="brand-select">Бренд</InputLabel>
              <Select labelId="brand-select" value={activeBrand} label="Бренд" onChange={handleChangeBrand}>
                {brands.map((brand) => (
                  <MenuItem value={brand.id}>{brand.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
        <div
          style={{
            display: 'grid',
            gridGap: '20px',
            maxWidth: '500px',
          }}>
          {' '}
          {categoryAttributes && selectedAttributes && categoryAttributes.map((attribute) => typeAttributes(attribute))}
        </div>
      </div>

      {(productLoading || updateProductLoading) && <Loading />}
      <Snackbar autoHideDuration={2000} open={openError} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={() => setOpenError(false)}>
        <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
          {productError?.message ? productError?.message : updateProductError?.message ? updateProductError?.message : ''}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContentProductAdd;
