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
import DashboardOverview from "./components/DashboardOverview.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Statistic from "./pages/Statistic.jsx";

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
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "privacy",
        Component: Privacy,
      },
      {
        path: "terms",
        Component: Terms,
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
                Component: Statistic
              },
              
              {
                path: "profile",
                Component: Profile,
              },
              {
                path: "add-habit",
                Component: AddHabbit,
              },
              {
                path: "my-habit",
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
