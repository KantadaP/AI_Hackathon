import React from "react";
import { useNavigate } from "react-router";

export default function Header({ title = "header" }) {
  const navigate = useNavigate();
  const handleNewSurvey = () => {
    navigate("/dashboard/add");
  };
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-[35px] font-bold">{title}</h1>
        <button className=" bg-green-button text-white px-4 py-2 rounded-2xl shadow-md font-bold flex gap-3 items-center hover:bg-lime-500"
        
        onClick={handleNewSurvey}
        >
          <i class="fa-regular fa-square-plus text-xl"></i>
          New Survey
        </button>
      </div>
    </>
  );
}
