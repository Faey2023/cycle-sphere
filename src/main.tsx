import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './layout/MainPage.tsx';
import './index.css';
import Home from './pages/Home/Home.tsx';
import AboutUs from './pages/AboutUs/AboutUs.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import AllBicycles from './pages/AllBicycles/AllBicycles.tsx';
import BicycleDetails from './pages/BicycleDetails/BicycleDetails.tsx';
import AdminDashboard from './components/Dashboard/AdminDashboard.tsx';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import SignIn from './pages/SignIn'; // Import the SignIn component
import UsersManagement from './components/Dashboard/UsersManagement.tsx'; // Import the UsersManagement page
import Checkout from './pages/Checkout/Checkout.tsx';
import Products from './components/Products/Products.tsx';
import CreateBicycleForm from './components/Products/CreateBicycleForm.tsx';
import UpdateBicycleForm from './components/Products/UpdateBicycleForm.tsx';
import ProductDetails from './components/Products/ProductDetails.tsx';
import Order from './pages/Orders/Orders.tsx';
import Register from './pages/Register.tsx';
import AuthProvider from './context/AuthProvider.tsx';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/allBicycles', element: <AllBicycles /> },
      { path: '/bicycles/:id', element: <BicycleDetails /> },
      {
        path: '/Products',
        element: <Products />,
      },
      {
        path: '/Products/add',
        element: <CreateBicycleForm />,
      },
      {
        path: '/Products/edit/:id',
        element: <UpdateBicycleForm />,
      },
      {
        path: '/Products/details/:id',
        element: (
          // <RoleProtectedRoute allowedRoles={['admin', 'user']}>
            <ProductDetails />
          // </RoleProtectedRoute>
        ),
      },
      {
        path: '/checkout',
        element: (
          // <RoleProtectedRoute allowedRoles={['admin', 'user']}>
            <Checkout />
          // </RoleProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: <Order />,
      },
      { path: '/aboutUs', element: <AboutUs /> },
      { path: '/signUp', element: <Register /> }, // Updated route for Register
      { path: '/signIn', element: <SignIn /> }, // Updated route for SignIn

      { path: '/unauthorized', element: <Unauthorized /> },

      // Protected Admin Route
      {
        path: '/admin',
        element: <RoleProtectedRoute allowedRoles={['admin']} children={undefined} />,
        children: [
          {
            path: '',
            element: <AdminDashboard />,
          },
          {
            path: 'users-management',
            element: <UsersManagement />, // Add the UsersManagement route
          },
          // {
          //   path: 'orders',
          //   element: <Order />,
          // },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
