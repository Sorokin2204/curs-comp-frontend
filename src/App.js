import { Button } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import AdminBrandsPage from './admin/pages/adminBrandsPage';
import AdminCategoriesPage from './admin/pages/adminCategoriesPage';
import AdminCategoryAddPage from './admin/pages/adminCategoryAddPage';
import AdminProductsPage from './admin/pages/adminProductsPage';

function App() {
  let routes = useRoutes([
    { path: '/admin/products', element: <AdminProductsPage /> },

    { path: '/admin/brands', element: <AdminBrandsPage /> },
    { path: '/admin/categories', element: <AdminCategoriesPage /> },
    { path: '/admin/category/add', element: <AdminCategoryAddPage /> },
  ]);
  return routes;
}

export default App;
