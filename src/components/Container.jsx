import React, { useState } from "react";

export default function Container({ children, title = "Active", color = "bg-green-active" }) {
  const [activeSurveys, setActiveSurveys] = useState(true);
  return (
    <div className=" border-b-2 pb-5">
      <div className="flex flex-col items-center  h-full px-7 pt-7">
        <div className="w-full flex items-center gap-5">
          <button
            className=" bg-white text-black px-4 py-2 text-2xl rounded-2xl shadow-md font-bold flex gap-3 items-center"
            onClick={() => setActiveSurveys(!activeSurveys)}
          >
            <i
              className={` ${
                activeSurveys && "rotate-0"
              } rotate-180 fa-solid fa-angle-down`}
            ></i>
          </button>
          <div className={`w-5 h-5 rounded-full  ${color}`}></div>
          <p className="text-xl font-semibold">{title}</p>
        </div>
        <div
          className={` ${
            !activeSurveys && " hidden"
          } w-full flex flex-col items-center gap-2 mt-5`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
