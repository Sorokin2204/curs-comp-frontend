import { Button } from '@mui/material';
import { useRoutes, useLocation } from 'react-router-dom';
import AdminBrandsPage from './admin/pages/adminBrandsPage';
import AdminCategoriesPage from './admin/pages/adminCategoriesPage';
import AdminCategoryAddPage from './admin/pages/adminCategoryAddPage';
import AdminOrdersPage from './admin/pages/adminOrdersPage';
import AdminProductAddPage from './admin/pages/adminProductAddPage';
import AdminProductsPage from './admin/pages/adminProductsPage';
import Wrapper from './admin/Wrapper';
import CartPage from './client/pages/CartPage';
import CategoryPage from './client/pages/CategoryPage';
import CategorySinglePage from './client/pages/CategorySinglePage';
import HomePage from './client/pages/HomePage';
import OrdersPage from './client/pages/OrdersPage';
import ProductSinglePage from './client/pages/ProductSinglePage';
import WrapperStore from './client/WrapperStore';
import socketIOClient from 'socket.io-client';
import { useContext, useEffect } from 'react';
import { SocketContext } from './socket';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin/');
  const socket = useContext(SocketContext);
  useEffect(() => {
    // const socket = socketIOClient(ENDPOINT);
    // socket.on('FromAPI', (data) => {
    //   console.log('DATA FROM SOCKET -', data);
    // });
    return () => socket.disconnect();
  }, []);

  let routes = useRoutes([
    { path: '/admin/products', element: <AdminProductsPage /> },

    { path: '/admin/brands', element: <AdminBrandsPage /> },
    { path: '/admin/categories', element: <AdminCategoriesPage /> },
    { path: '/admin/category/add', element: <AdminCategoryAddPage /> },
    { path: '/admin/product/add', element: <AdminProductAddPage /> },
    { path: '/admin/orders', element: <AdminOrdersPage /> },

    { path: '/', element: <HomePage /> },
    { path: '/category', element: <CategoryPage /> },
    { path: '/orders', element: <OrdersPage /> },
    { path: '/category/:categoryId', element: <CategorySinglePage /> },
    { path: '/product/:productId', element: <ProductSinglePage /> },
    { path: '/cart', element: <CartPage /> },
  ]);

  return isAdminPage ? <Wrapper>{routes}</Wrapper> : <WrapperStore>{routes}</WrapperStore>;
}

export default App;
