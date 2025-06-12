import profile from "../assets/profile.svg";
import logo from "../assets/logo.svg";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { QuestionsProvider } from "../contexts/QuestionsContext";
import CopyLinkButton from '../components/CopyLinkButton';

export default function AddPage() {

  const { surveyId } = useParams();

  const [ surveys, setSurveys ] = useState('')

  useEffect(() => {
    const get_surveys = JSON.parse(localStorage.getItem("surveys"));
    console.log("Loaded surveys from localStorage:", get_surveys);
    setSurveys(get_surveys)
  },[])

  const myLink = "http://localhost:5173/respond";

  const handleOpen = () => {
    navigate("/respond");
  };

  const Nav = [
    { name: "Chat", path: `/dashboard/add/${surveyId}` },
    { name: "Edit", path: `/dashboard/add/${surveyId}/edit` },
    { name: "Preview", path: `/dashboard/add/${surveyId}/preview` },
  ];

  const navigate = useNavigate();
  const handleNavigation = (path) => {
      navigate(path);
  };
  return (
    <div className=" h-full p-5 px-10">
      <div className="w-full flex justify-between items-center mb-5">
        <img
          src={logo}
          alt="logo"
          className={`w-15 h-15 cursor-pointer `}
          onClick={() => handleNavigation("/dashboard")}
        />
        <h1 className="text-[35px] font-bold"
        > Create New Survey </h1>
        <img
          src={profile}
          alt="profile"
          className={`w-15 h-15 rounded-full `}
        />
      </div>
      <div className="h-full w-full">
        <div className=" bg-green-button p-7 rounded-t-2xl flex gap-16 ">
          <p
            className="text-[25px] w-[100px] text-center font-semibold text-white p-2 cursor-pointer hover:bg-lime-400 hover:font-semibold rounded-md"
            onClick={() => handleNavigation(Nav[0].path)}
          >
            {" "}
            Chat{" "}
          </p>
          <p
            className="text-[25px] w-[100px] text-center font-semibold text-white p-2 cursor-pointer hover:bg-lime-400 hover:font-semibold rounded-md"
            onClick={() => handleNavigation(Nav[1].path)}
          >
            {" "}
            Edit{" "}
          </p>
          <p
            className="text-[25px] w-[100px] text-center font-semibold text-white p-2 cursor-pointer hover:bg-lime-400 hover:font-semibold rounded-md"
            onClick={() => handleNavigation(Nav[2].path)}
          >
            {" "}
            Preview{" "}
          </p>
          {surveys && (
            <div className="flex gap-4 items-center">
              <CopyLinkButton
                className="block text-white px-4 py-2 rounded"
                link={myLink}
              />
              <button
                className="block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={handleOpen}
              >
                {" "}
                Open Survey{" "}
              </button>
            </div>
          )}
        </div>
        <div className=" h-[600px]  shadow-xl bg-gray-default">
          <QuestionsProvider>
            <Outlet />
          </QuestionsProvider>
        </div>
      </div>
    </div>
  );
}
