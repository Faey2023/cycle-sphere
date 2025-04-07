import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainPage from './layout/MainPage.tsx';
import './index.css';
import Home from './pages/Home/Home.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import AllBicycles from './pages/AllBicycles/AllBicycles.tsx';
import BicycleDetails from './pages/BicycleDetails/BicycleDetails.tsx';

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
        element: <AllBicycles />,
      },
      {
        path: '/bicycles/:id',
        element: <BicycleDetails />,
      },
      {
        path: '/checkout',
        // dummy page
        element: (
          <div className="mx-auto max-w-5xl p-6">
            <h1 className="mb-4 text-3xl font-bold">Checkout Page</h1>
            <div className="space-y-4">
              <p>
                <strong>Order Summary</strong>
              </p>
              {/* Example of how the cart items could be displayed */}
              <div className="rounded-xl bg-gray-100 p-4">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <ul>
                  <li>Item 1 - Price: $1200</li>
                  <li>Item 2 - Price: $800</li>
                  {/* Loop over cart items dynamically here */}
                </ul>
                <div className="mt-4">
                  <p>
                    <strong>Total: </strong>$2000
                  </p>
                </div>
              </div>
              {/* You can replace this with an actual payment form later */}
              <div className="mt-4">
                <button className="w-full rounded-xl bg-blue-600 py-2 text-white">
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        ),
      },
      {
        path: '/aboutUs',
        // element: <Home />,
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
