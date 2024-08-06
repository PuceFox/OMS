import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import Login from "../views/Login";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import Form from "../views/Form";

const url = "http://localhost:3000";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login url={url} />,
  },
  {
    path: "/form",
    element: <Form />,
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
