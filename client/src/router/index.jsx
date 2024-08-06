import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import Login from "../views/Login";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import Form from "../views/Form";
import Profile from "../views/Profile";

const url = "http://localhost:3000";

const router = createBrowserRouter([
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
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
