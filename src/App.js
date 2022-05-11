import { Button } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import AdminBrandsPage from './admin/pages/adminBrandsPage';
import AdminCategoriesPage from './admin/pages/adminCategoriesPage';
import AdminCategoryAddPage from './admin/pages/adminCategoryAddPage';
import AdminOrdersPage from './admin/pages/adminOrdersPage';
import AdminProductAddPage from './admin/pages/adminProductAddPage';
import AdminProductsPage from './admin/pages/adminProductsPage';

function App() {
  let routes = useRoutes([
    { path: '/admin/products', element: <AdminProductsPage /> },

    { path: '/admin/brands', element: <AdminBrandsPage /> },
    { path: '/admin/categories', element: <AdminCategoriesPage /> },
    { path: '/admin/category/add', element: <AdminCategoryAddPage /> },
    { path: '/admin/product/add', element: <AdminProductAddPage /> },
    { path: '/admin/orders', element: <AdminOrdersPage /> },
  ]);
  return routes;
}

export default App;
