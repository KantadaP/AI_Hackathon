import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

export default function ItemCard({
  s_id,
  title = "Fried Chicken",
  icon = "fa-regular fa-file",
  author = "Kantada",
  createdDate = "7 JUN 2025",
  runningDate = "8 JUN 2025",
  responses = 120,
  path = "/dashboard", // 🔹 default fallback
  onDelete, // callback to delete survey
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const handleNavigation = () => {
    navigate(path);
  };

  const toggleMenu = (e) => {
    e.stopPropagation(); // prevent triggering card click navigation
    setMenuOpen((prev) => !prev);
  };

  // Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    navigate(`/dashboard/add/${s_id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    if (onDelete) onDelete(s_id);
  };

  return (
    <div
      className="w-full flex justify-between items-center h-[133px] bg-white rounded-full shadow-md py-4 px-4 mb-4 relative cursor-pointer"
      onClick={handleNavigation}
    >
      <div className="absolute left-10 flex items-center gap-[25px]">
        <i className={`${icon} text-[40px]`}></i>
        <div>
          <p className="font-semibold text-2xl">{title}</p>
          <p className="font-semibold text-gray-subtitle">
            Author {author} | Created {createdDate} | Running {runningDate}
          </p>
        </div>
      </div>

      <div className="absolute right-20 flex gap-10 items-center">
        <div className="flex flex-col items-center">
          <p className="font-bold text-[44px]">{responses}</p>
          <p className="font-semibold text-gray-subtitle">Responses</p>
        </div>

        <div className="relative">
          <i
            className="fa-solid fa-ellipsis-vertical w-10 h-10 flex justify-center items-center text-[30px] cursor-pointer"
            onClick={toggleMenu}
            title="More options"
          ></i>

          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 top-full mt-2 w-40 bg-white border rounded shadow-lg z-50"
            >
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={handleEdit}
              >
                Edit Survey
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                onClick={handleDelete}
              >
                Delete Survey
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
