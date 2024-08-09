import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import Login from "../views/Login";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import Form from "../views/Form";
import Profile from "../views/Profile";
import Report from "../views/Report";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: () => {
      if (localStorage.token) {
        // console.log("udh login bos");
        return redirect("/dashboard");
      }
      return null;
    },
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.token) {
        // console.log("udh login bos");
        return redirect("/dashboard");
      }
      return null;
    },
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.token) {
        // console.log("Must Login First");
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/report",
        element: <Report />,
      },
    ],
  },
]);

export default router;
