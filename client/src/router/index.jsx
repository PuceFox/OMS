import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import Login from "../views/Login";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
