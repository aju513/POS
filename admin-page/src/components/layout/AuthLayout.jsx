import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
