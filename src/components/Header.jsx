import React from "react";

export default function Header({ title = "header" }) {
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-[35px] font-bold">{title}</h1>
        <button className=" bg-green-button text-white px-4 py-2 rounded-2xl shadow-md font-bold flex gap-3 items-center">
          <i class="fa-regular fa-square-plus text-xl"></i>
          New Survey
        </button>
      </div>
    </>
  );
}
