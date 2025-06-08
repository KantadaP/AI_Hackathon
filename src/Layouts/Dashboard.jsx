import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex flex-row ">
      <Sidebar />
      <div className=" w-full px-7 pt-7 pb-20 bg-gray-default   min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
