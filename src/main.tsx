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
import DummyDashboard from './layout/DummyDashboard/DummyDashboard.tsx';
import AdminDashboard from './components/Dashboard/AdminDashboard.tsx';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import SignIn from './pages/SignIn'; // Import the SignIn component
import UsersManagement from './components/Dashboard/UsersManagement.tsx'; // Import the UsersManagement page
import Checkout from './pages/Checkout/Checkout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/allBicycles', element: <AllBicycles /> },
      { path: '/bicycles/:id', element: <BicycleDetails /> },
      {
        path: '/dummy-dashboard',
        element: <DummyDashboard></DummyDashboard>,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      { path: '/aboutUs', element: <AboutUs /> },
      { path: '/signUp' /* TODO */ },
      { path: '/signIn', element: <SignIn /> }, // Updated route for SignIn

      { path: '/unauthorized', element: <Unauthorized /> },

      // Protected Admin Route
      {
        path: '/admin',
        element: <RoleProtectedRoute allowedRoles={['admin']} />,
        children: [
          {
            path: '',
            element: <AdminDashboard />,
          },
          {
            path: 'users-management',
            element: <UsersManagement />, // Add the UsersManagement route
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
