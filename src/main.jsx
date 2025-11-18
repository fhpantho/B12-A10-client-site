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
import { path } from 'framer-motion/client';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import AddHabbit from './components/AddHabbit.jsx';
import Myhabit from './components/Myhabit.jsx';
import UpdateHabit from './components/UpdateHabit.jsx';
import HabitDetails from './components/HabitDetails.jsx';

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
      },
      {


      path : 'addhabit',
      Component :PrivateRoute,
      children : [
        {
          index : true,
          Component : AddHabbit
        }
      ]
      
      },
      {
        path : 'myhabit',
        Component : PrivateRoute,
        children : [
          {
            index : true,
            Component : Myhabit
          }
        ]
      },
      {
        path : 'updatehabit/:id',
        Component : PrivateRoute,
        children : [
          {
            index : true,
            Component : UpdateHabit
          }
        ]
      },
       {
        path : 'habbitdetails/:id',
        Component : PrivateRoute,
        children : [
          {
            index : true,
            Component : HabitDetails
          }
        ]
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
