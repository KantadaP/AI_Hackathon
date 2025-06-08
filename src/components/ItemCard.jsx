import React from "react";

export default function ItemCard({
  title = "Fried Chicken",
  icon = "fa-regular fa-file",
  author = "Kantada",
  createdDate = "7 JUN 2025",
  runningDate = "8 JUN 2025",
  responses = 120,
}) {
  return (
    <>
      <div className="w-full flex justify-between items-center h-[133px] bg-white rounded-full shadow-md py-4 px-4 mb-4 relative">
        <div className=" absolute left-10 flex items-center gap-[25px]">
          <i class={` ${icon} text-[40px]`}></i>
          <div>
            <p className="font-semibold text-2xl">{title}</p>
            <p className=" font-semibold text-gray-subtitle ">
              {/* Author Kantada | Created 7 JUN 2025 | Running 8 JUN 2025 */}
              Author {author} | Created {createdDate} | Running {runningDate}
            </p>
          </div>
        </div>
        <div className="absolute right-20 flex gap-10 items-center">
          <div className="flex flex-col items-center">
            <p className="font-bold text-[44px]"> {responses} </p>
            <p className="font-semibold text-gray-subtitle"> Responses </p>
          </div>
          <i class="fa-solid fa-ellipsis-vertical w-10 h-10 flex justify-center items-center text-[30px] cursor-pointer "></i>
        </div>
      </div>
    </>
  );
}
