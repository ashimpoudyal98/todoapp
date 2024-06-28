import React from "react";
import Home from "../Home/Home";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const AppLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
