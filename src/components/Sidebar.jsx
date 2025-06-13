import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';
import profile from '../assets/profile.svg';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const Menus_top = [
    {
      title: "All Surveys",
      path: "/dashboard/",
    },
    {
      title: "Drafts",
      path: "/dashboard/draft",
    },
    {
      title: "Active",
      path: "/dashboard/active",
    },
    {
      title: "Inactive",
      path: "/dashboard/inactive",
    },
    {
      title: "Upgrade",
      path: "/dashboard/upgrade",
    },
  ];

  const handleNavtoPath = (path) => {
    navigate(path);
  };

  return (
    <>
      <div
        className={`${
          isOpen
            ? "w-[13rem] lg:w-[163px] left-0"
            : " -left-[242px] xl:left-0 md:w-20"
        } duration-500 md:duration-300 p-5 pt-8 border-r-2 border-gray-200 bg-white h-full lg:h-screen gap-y-10 fixed z-50 flex flex-col  2xl:sticky top-0`}
      >
        {/* Logo */}
        <div className="py-4 flex justify-center">
          <img
            src={logo}
            alt="logo"
            className={`${!isOpen && "scale-0"} duration-300 object-cover`}
          />
        </div>

        {/* Top Menu Items */}
        <div className="flex flex-col gap-5 flex-grow">
          {Menus_top.map((menu, index) => (
            <div
              key={index}
              className="flex items-center cursor-pointer py-3 hover:bg-gray-100 hover:font-semibold rounded-md relative"
              onClick={() => handleNavtoPath(menu.path)}
            >
              <div
                className={`${
                  !isOpen && "scale-0"
                } w-full text-center duration-300 md:text-sm 2xl:text-base`}
              >
                {menu.title}
              </div>
            </div>
          ))}
        </div>

        {/* Survey Agent Button */}
        <div className="py-2 mt-4 border-t border-gray-200">
          <div
            className="flex items-center cursor-pointer py-3 hover:bg-gray-100 hover:font-semibold rounded-md relative"
            onClick={() => handleNavtoPath("/")}
          >
            <div
              className={`${
                !isOpen && "scale-0"
              } w-full text-center duration-300 md:text-sm 2xl:text-base text-green-600`}
            >
              Survey Agent
            </div>
          </div>
        </div>

        {/* Profile at Bottom */}
        <div className="flex flex-col text-center mt-auto">
          <img
            src={profile}
            alt="profile"
            className={`w-15 h-15 rounded-full mx-auto ${
              !isOpen && "scale-0"
            } duration-300`}
          />
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <i
        className={`${
          isOpen && "hover:bg-gray-100"
        } z-30 duration-300 shadow-md fixed top-5 right-3 sm:right-6 fa-solid fa-bars text-3xl px-5 py-3 border rounded-sm border-gray-200 cursor-pointer xl:hidden bg-white`}
        onClick={() => setIsOpen(!isOpen)}
      ></i>
    </>
  );
}
