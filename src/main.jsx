import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./Layout/RootLayout.jsx";
import Home from "./components/Home.jsx";
import PublicHabbit from "./components/PublicHabbit.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Singup from "./components/authonticate/Singup.jsx";
import Login from "./components/authonticate/Login.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import AddHabbit from "./components/AddHabbit.jsx";
import Myhabit from "./components/Myhabit.jsx";
import UpdateHabit from "./components/UpdateHabit.jsx";
import HabitDetails from "./components/HabitDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardStats from "./components/DashboardStats.jsx";
import Profile from "./pages/Profile.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "publichabit",
        Component: PublicHabbit,
      },
      {
        path: "singup",
        Component: Singup,
      },
      {
        path: "login",
        Component: Login,
      },

      {
        path: "habbitdetails/:id",
        Component: PrivateRoute,
        children: [
          {
            index: true,
            Component: HabitDetails,
          },
        ],
      },
      {
        path: "dashboard",
        Component: PrivateRoute,
        children: [
          {
            path: "",
            Component: Dashboard,
            children: [
              {
                index: true,
                Component: DashboardStats,
              },
              {
                path: "profile",
                Component: Profile,
              },
              {
                path: "addhabit",
                Component: AddHabbit,
              },
              {
                path: "myhabit",
                Component: Myhabit,
              },
              {
                path: "updatehabit/:id",
                Component: UpdateHabit,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
