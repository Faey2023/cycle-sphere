import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainPage from './layout/MainPage.tsx';
import './index.css';
import Home from './pages/Home/Home.tsx';
import AboutUs from './pages/AboutUs/AboutUs.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/allBicycles',
        // element: <Home />,
      },
      {
        path: '/checkout',
        // element: <Home />,
      },
      {
        path: '/aboutUs',
        element: <AboutUs />,
      },
      {
        path: '/signUp',
        // element: <Home />,
      },
      {
        path: '/signIn',
        // element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
