import React from 'react';
import ReactDOM from 'react-dom/client';
import Signin from './components/Signin';
import Home from './components/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />
  },
  {
    path: "/home",
    element: <Home />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


