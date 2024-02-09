import React from "react";
import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import Login from "../ modules/auth/Login";
import AuthLayout from "../layout/AuthLayout";
import AddCategory from "../ modules/category/AddCategory";

const Publicrouter = createMemoryRouter([
  {
    path: "/",
    element: <AuthLayout />,

    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
]);
export default Publicrouter;
