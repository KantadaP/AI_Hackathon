import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';
import profile from '../assets/profile.svg';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

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

  const navigate = useNavigate();
  const handleNavtoPath = (path) => {
    navigate(path);
  };

  return (
    <>
      <div
        // onMouseEnter={() => setIsOpen(true)}
        // onMouseLeave={() => setIsOpen(false)}
        className={`${
          isOpen
            ? "w-[13rem] lg:w-[163px] left-0"
            : " -left-[242px] xl:left-0 md:w-20"
        } duration-500 md:duration-300 p-5 pt-8 border-r-2 border-gray-200 bg-white h-full lg:h-screen gap-y-10 fixed z-50 flex flex-col  2xl:sticky top-0`}
      >
        <div className="  py-4 flex justify-center">
          {/* <i
            // onClick={() => setIsOpen(!isOpen)}
            className={`${
              isOpen && " -rotate-45"
            } fa-solid fa-card-diamond  p-2 transition-all duration-300 cursor-pointer bg-white text-2xl`}
          ></i> */}
          {/* <h2 className={`${!isOpen && "scale-0"}   duration-300 font-bold `}>
            Survery
          </h2> */}
          <img
            src={logo}
            alt="logo"
            className={`${!isOpen && "scale-0"} duration-300  object-cover`}
          />
        </div>

        {/* Option Section */}
        {/* Menu 1 */}
        <div className="flex flex-col gap-5 flex-grow ">
          {Menus_top.map((menu, index) => (
            <div
              key={index}
              className="flex items-center cursor-pointer py-3   hover:bg-gray-100 hover:font-semibold rounded-md relative"
              onClick={() => handleNavtoPath(menu.path)}
            >
              {/* <i className={`${menu.icon} text-xl`}></i> */}
              <div
                className={`${
                  !isOpen && "scale-0"
                }  w-full text-center duration-300 md:text-sm 2xl:text-base  `}
              >
                {menu.title}
              </div>
            </div>
          ))}
        </div>
        {/* Menu 2 */}
        {/* <div className=" flex flex-col gap-4 ">
          {Menus_down.map((menu, index) => (
            <div
              key={index}
              className=" flex items-center gap-4 cursor-pointer text-center p-2 hover:bg-gray-100 hover:font-semibold rounded-md relative"
              onClick={() => {
                handleNavtoPath(menu.path);
              }}
            >
              <i className={`${menu.icon} text-xl`}></i>
              <div
                className={`${
                  !isOpen && "md:scale-0"
                } md:absolute left-12 origin-left duration-300 `}
              >
                {menu.title}
              </div>
            </div>
          ))}
        </div> */}
        <div className=" flex flex-col text-center ">
          <img
            src={profile}
            alt="profile"
            className={`w-15 h-15 rounded-full mx-auto ${
              !isOpen && "scale-0"
            } duration-300`}
          />
        </div>
      </div>
      {/* Side bar tockle */}

      <i
        className={` ${
          isOpen && "hover:bg-gray-100"
        } z-30 duration-300 shadow-md fixed top-5 right-3 sm:right-6  fa-solid fa-bars text-3xl px-5 py-3 border rounded-sm border-gray-200 cursor-pointer xl:hidden bg-white`}
        onClick={() => setIsOpen(!isOpen)}
      ></i>
    </>
  );
}
