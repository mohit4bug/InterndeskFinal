import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Tracker from "./components/Tracker";
import Education from "./pages/Education";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Personal from "./pages/Personal";
import Preference from "./pages/Preference";
import Register from "./pages/Register";
import Samples from "./pages/Samples";
import Skills from "./pages/Skills";
import "@coreui/coreui/dist/css/coreui.min.css";
import ChangePassword from "./pages/ChangePassword";
import Verify from "./pages/Verify";
import { AuthContextProvider } from "./context/authContext";
import { CookiesProvider } from 'react-cookie';
import NavBar from "./components/Navbar";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/Profile/Profile";
const DetailsLayout = () => {
  return (
    <>
      <NavBar />
      <Tracker />
      <Outlet />
    </>
  );
};

const SimpleLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <SimpleLayout />,
    children: [
      {
        path: "/change_password",
        element: <ChangePassword />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/admin",
        element: <Admin />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/",
    element: <DetailsLayout />,
    children: [
      {
        path: "/preference",
        element: <Preference />,
      },
      {
        path: "/personal",
        element: <Personal />,
      },
      {
        path: "/education",
        element: <Education />,
      },
      {
        path: "/skills",
        element: <Skills />,
      },
      {
        path: "/samples",
        element: <Samples />,
      }
    ],
  },
]);

const App = () => {
  return (
    <AuthContextProvider>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </AuthContextProvider>
  );
};

export default App;
