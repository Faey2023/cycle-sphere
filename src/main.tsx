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
import SignIn from './pages/SignIn';  // Import the SignIn component
import UsersManagement from './components/Dashboard/UsersManagement.tsx'; // Import the UsersManagement page

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/allBicycles', element: <AllBicycles /> },
      { path: '/bicycles/:id', element: <BicycleDetails /> },
      {
        path: '/checkout',
        element: (
          <div className="mx-auto max-w-5xl p-6">
            <h1 className="mb-4 text-3xl font-bold">Checkout Page</h1>
            <div className="space-y-4">
              <p><strong>Order Summary</strong></p>
              <div className="rounded-xl bg-gray-100 p-4">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <ul>
                  <li>Item 1 - Price: $1200</li>
                  <li>Item 2 - Price: $800</li>
                </ul>
                <div className="mt-4"><p><strong>Total: </strong>$2000</p></div>
              </div>
              <div className="mt-4">
                <button className="w-full rounded-xl bg-blue-600 py-2 text-white">Proceed to Payment</button>
              </div>
            </div>
          </div>
        ),
      },
      { path: '/aboutUs', element: <AboutUs /> },
      { path: '/signUp' /* TODO */ },
      { path: '/signIn', element: <SignIn /> },  // Updated route for SignIn

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
            element: <UsersManagement />,  // Add the UsersManagement route
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
