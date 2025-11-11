import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layout/RootLayout.jsx';
import Home from './components/Home.jsx';
import PublicHabbit from './components/PublicHabbit.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Singup from './components/authonticate/Singup.jsx';
import Login from './components/authonticate/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component : RootLayout,
    children : [
      {
        index : true,
        Component : Home

      },
      {
        path : 'publichabit',
        Component : PublicHabbit
      },
      {
        path : 'singup',
        Component : Singup
      },
      {
        path : "login",
        Component : Login
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
    
  </StrictMode>,
)
