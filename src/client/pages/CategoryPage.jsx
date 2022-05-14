import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoryAttributes } from '../../redux/slices/attribute.slice';
import { getCategories } from '../../redux/slices/category.slice';
const CategoryPage = () => {
  const {
    getCategoriesState: { data: categories },
  } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ mt: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Категории
      </Typography>
      <div
        className="categoryList"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gridGap: '20px',
          marginTop: '20px',
        }}>
        {categories?.map((category) => (
          <Link to={`/category/${category.id}`} style={{ fontSize: '26px', padding: '40px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', textDecoration: 'none', border: '1px solid grey', borderRadius: '5px' }} className="categoryItem">
            {category.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
