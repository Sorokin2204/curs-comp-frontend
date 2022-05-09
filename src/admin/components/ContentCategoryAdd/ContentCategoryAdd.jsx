import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './ContentCategoryAdd.module.scss';
import { useNavigate } from 'react-router';
import { Alert, Button, FormControl, FormControlLabel, FormLabel, IconButton, Input, Radio, RadioGroup, Snackbar, TextField } from '@mui/material';
import { AddOutlined, Close } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAttribute, categoryReset, createCategory, removeCategoryAttribute, setCategoryAttribute, updateCategory, updateCategoryAttribute } from '../../../redux/slices/category.slice';

import { updateAttribute } from '../../../redux/slices/attribute.slice';

import TableAttributeCategory from '../TableAttributeCategory/TableAttributeCategory';
import TableOption from '../TableOption/TableOption';
import { attributeReset, createAttribute, getCategoryAttributes } from '../../../redux/slices/attribute.slice';
import Loading from '../Loading/Loading';
const ContentCategoryAdd = () => {
  const [activeAttribute, setActiveAttribute] = useState({
    type: 'text',
    name: '',
  });
  const {
    createCategoryState: { data: categoryData, loading: categoryLoading, error: categoryError },
    activeCategory,
    updateCategoryState: { loading: updateCategoryLoading },
  } = useSelector((state) => state.category);
  const {
    createAttributeState: { data: attributeData, loading: attributeLoading, error: attributeError },
    getCategoryAttributes: { data: categoryAttributesData, error: categoryAttributesError },
    updateAttributeState: { loading: updateAttributeLoading },
  } = useSelector((state) => state.attribute);
  const [activeSelectOptions, setActiveSelectOptions] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [activeOptionName, setActiveOptionName] = useState('');
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeCategory) {
      setCategoryName(activeCategory.name);
      dispatch(getCategoryAttributes(activeCategory.id));
    }
  }, [activeCategory]);

  useEffect(() => {
    return () => {
      console.log('EXIT');
      dispatch(attributeReset());
      dispatch(categoryReset());
      setActiveAttribute({ name: '', type: 'text' });
      setActiveSelectOptions([]);
    };
  }, []);

  useEffect(() => {
    if (categoryAttributesData) {
      dispatch(setCategoryAttribute(categoryAttributesData));
    }
  }, [categoryAttributesData]);

  useEffect(() => {
    if (categoryError || attributeError || categoryAttributesError) {
      setOpenError(true);
    }
  }, [categoryError, attributeError, categoryAttributesError]);

  const onClickBtnAddCategory = () => {
    if (activeCategory?.id) {
      dispatch(
        updateCategory({
          id: activeCategory?.id,
          name: categoryName,
        }),
      );
      dispatch(
        updateAttribute({
          id: activeCategory?.id,
          attributes: categoryAttributes,
        }),
      );
      dispatch(categoryReset());
      dispatch(attributeReset());
      navigate('/admin/categories');
    } else {
      dispatch(createCategory(categoryName));
    }
  };
  useEffect(() => {
    if (categoryData && !categoryLoading) {
      dispatch(
        createAttribute({
          id: categoryData.id,
          attributes: categoryAttributes,
        }),
      );
      dispatch(categoryReset());
      dispatch(attributeReset());
      navigate('/admin/categories');
    }
  }, [categoryData]);

  const onClickTypeAttribute = (type) => {
    if (!activeAttribute?.oldName) {
      setActiveAttribute({ ...activeAttribute, name: activeAttribute.name, type });
    }
  };
  const onChangeNameAttribute = (name) => {
    setActiveAttribute({ ...activeAttribute, name: name, type: activeAttribute.type });
  };
  const { categoryAttributes } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className={clsx(styles.headerBox)}>
        <h2 className={clsx(styles.title)}>{activeCategory ? `Изменить категорию "${activeCategory?.name}"` : 'Новая категория'}</h2>
        <Button
          sx={{
            ...(activeCategory?.id && {
              backgroundColor: 'success.light',
              '&:hover': {
                backgroundColor: 'success.light',
              },
            }),
          }}
          className={clsx(styles.addBtn)}
          disabled={!categoryName || !(categoryAttributes.length !== 0)}
          onClick={() => {
            onClickBtnAddCategory();
          }}>
          {activeCategory?.id ? 'Изменить' : 'Добавить'}
        </Button>
      </div>

      <div className={clsx(styles.wrapper)}>
        <TextField autoComplete="off" label={'Название'} value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        <div className={clsx(styles.addAttributeBox)}>
          <div style={{ display: 'flex', alignItems: 'start' }}>
            <h3 style={{ marginTop: '0px' }}>{activeAttribute?.oldName ? `Изменить аттрибут "${activeAttribute?.oldName}"` : 'Добавить аттрибут'}</h3>
            {activeAttribute?.oldName && (
              <IconButton
                sx={{ pt: '4px' }}
                onClick={() => {
                  setActiveAttribute({ name: '', type: 'text' });
                  setActiveSelectOptions([]);
                }}>
                <Close />
              </IconButton>
            )}
          </div>
          <div className={clsx(styles.addAttributeNewBox)}>
            <TextField autoComplete="off" label={'Название'} value={activeAttribute.name} onChange={(e) => onChangeNameAttribute(e.target.value)} />
            <Button
              sx={{
                ...(activeAttribute?.oldName && {
                  backgroundColor: 'success.light',
                  '&:hover': {
                    backgroundColor: 'success.light',
                  },
                }),
              }}
              disabled={
                !activeAttribute.name ||
                categoryAttributes.find((attribute) => {
                  return attribute.name === activeAttribute.name && attribute.name !== activeAttribute?.oldName;
                }) ||
                (activeAttribute.type == 'select' && activeSelectOptions.length == 0) ||
                (activeAttribute.type == 'select' && !activeSelectOptions.find((opt) => opt.status !== 'deleted'))
              }
              className={clsx(styles.addBtn)}
              onClick={() => {
                if (activeAttribute?.oldName) {
                  dispatch(
                    updateCategoryAttribute({
                      ...activeAttribute,
                      ...(activeAttribute.type == 'select' && { options: activeSelectOptions }),

                      ...(activeCategory?.id && { status: 'added' }),
                      ...(activeCategory?.id && activeAttribute?.status !== 'added' && { status: 'updated' }),
                    }),
                  );
                } else {
                  dispatch(addCategoryAttribute({ ...activeAttribute, ...(activeAttribute.type == 'select' && { options: activeSelectOptions }), ...(activeCategory?.id && { status: 'added' }) }));
                }

                setActiveAttribute({ name: '', type: 'text' });
                setActiveSelectOptions([]);
              }}>
              {activeAttribute?.oldName ? 'Изменить' : 'Добавить'}
            </Button>
          </div>
          <FormControl disabled={activeAttribute?.oldName}>
            <FormLabel id="attribute-type-group">Тип аттрибута</FormLabel>
            <RadioGroup row aria-labelledby="option-type-group">
              <FormControlLabel value="text" control={<Radio checked={activeAttribute.type === 'text'} />} label="Текст" onClick={(e) => onClickTypeAttribute(e.target.value)} />
              <FormControlLabel value="number" control={<Radio checked={activeAttribute.type === 'number'} />} label="Число" onClick={(e) => onClickTypeAttribute(e.target.value)} />
              <FormControlLabel value="select" control={<Radio checked={activeAttribute.type === 'select'} />} label="Список" onClick={(e) => onClickTypeAttribute(e.target.value)} />
              <FormControlLabel value="checkbox" control={<Radio checked={activeAttribute.type === 'checkbox'} />} label="Да/Нет" onClick={(e) => onClickTypeAttribute(e.target.value)} />
            </RadioGroup>
          </FormControl>

          {activeAttribute.type === 'select' && (
            <div className={clsx(styles.addSelectBox)}>
              <TextField autoComplete="off" label={'Опция'} value={activeOptionName} onChange={(e) => setActiveOptionName(e.target.value)} style={{ gridColumn: '1/2' }} />
              <Button
                style={{ gridColumn: '2/3' }}
                onClick={() => {
                  if (activeCategory?.id) {
                    setActiveSelectOptions([...activeSelectOptions, { name: activeOptionName, status: 'added' }]);
                  } else {
                    setActiveSelectOptions([...activeSelectOptions, { name: activeOptionName }]);
                  }
                  setActiveOptionName('');
                }}
                disabled={!activeOptionName || activeSelectOptions.find((option) => option.name === activeOptionName)}>
                Добавить
              </Button>
              <TableOption
                options={activeSelectOptions}
                onRemove={(option) => {
                  if (option?.id) {
                    const optionsWithoutDeleted = activeSelectOptions.map((opt) => {
                      if (opt.name === option.name) {
                        return { ...opt, status: 'deleted' };
                      }
                      return opt;
                    });
                    setActiveSelectOptions(optionsWithoutDeleted);
                  } else {
                    setActiveSelectOptions(activeSelectOptions.filter((opt) => opt.name !== option.name));
                  }
                }}
              />
            </div>
          )}
        </div>
        <div style={{ gridRow: '2/3', gridColumn: '2/3', marginLeft: 'auto', alignSelf: 'start', width: 'min-content' }} className={clsx(styles.attributeCategoryBox)}>
          <h3 style={{ marginTop: '0' }}>Аттрибуты</h3>
          <TableAttributeCategory
            activeAttribute={activeAttribute}
            onEdit={(attribute) => {
              setActiveAttribute({ ...attribute, oldName: attribute.name });
              if (attribute?.options) {
                setActiveSelectOptions(attribute?.options);
              }
            }}
            onRemove={(attribute) => {
              dispatch(removeCategoryAttribute(attribute));
              setActiveAttribute({ name: '', type: 'text' });
              setActiveSelectOptions([]);
            }}
          />
        </div>
      </div>
      {(categoryLoading || attributeLoading || updateAttributeLoading || updateCategoryLoading) && <Loading />}
      <Snackbar autoHideDuration={2000} open={openError} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={() => setOpenError(false)}>
        <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
          {categoryError?.message ? categoryError?.message : attributeError?.message ? attributeError?.message : categoryAttributesError?.message ? categoryAttributesError?.message : ''}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContentCategoryAdd;
