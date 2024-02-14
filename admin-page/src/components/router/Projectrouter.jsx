import React from "react";
import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import Master from "../layout/Master";

import Dashboard from "../ modules/Dashboard";
import AddCategory from "../ modules/category/AddCategory";
import NotFound from "../ modules/NotFound";
import CategoryList from "../ modules/category/CategoryList";
import { createHashRouter } from "react-router-dom";
import Login from "../ modules/auth/Login";
import EditCategory from "../ modules/category/EditCategory";
import AddSubCategory from "../ modules/subcategory/AddSubCategory";
import SubCategory from "../ modules/subcategory/SubCategory";
import EditSubCategory from "../ modules/subcategory/EditSubCategory";
import AddBrands from "../ modules/brands/AddBrands";
import Brands from "../ modules/brands/Brands";
import EditBrands from "../ modules/brands/EditBrands";
import AddSupplier from "../ modules/suppliers/AddSupplier";
import SupplierList from "../ modules/suppliers/Supplier";
import EditSupplier from "../ modules/suppliers/EditSupplier";
const Projectrouter = createBrowserRouter([
  {
    path: "/",
    element: <Master />,
    children: [
      {
        path: "category",
        element: <CategoryList />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      {
        path: "category/create",
        element: <AddCategory />,
      },
      {
        path: "category/edit/:id",
        element: <EditCategory />,
      },
      {
        path: "sub-category/",
        element: <SubCategory />,
      },
      {
        path: "sub-category/create",
        element: <AddSubCategory />,
      },
      {
        path: "sub-category/edit/:id",
        element: <EditSubCategory />,
      },
      {
        path: "brand/",
        element: <Brands />,
      },
      {
        path: "brand/create",
        element: <AddBrands />,
      },
      {
        path: "brand/edit/:id",
        element: <EditBrands />,
      },
      {
        path: "supplier/",
        children: [
          { index: true, element: <SupplierList /> },
          { path: "create", element: <AddSupplier /> },
          { path: "edit/:id", element: <EditSupplier /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
export default Projectrouter;
