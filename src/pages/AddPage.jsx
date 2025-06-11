import profile from "../assets/profile.svg";
import logo from "../assets/logo.svg";
import { Outlet, useParams, useNavigate } from "react-router-dom";

export default function AddPage() {
  const { surveyId } = useParams();

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
        <h1 className="text-[35px] font-bold"> Create New Survey </h1>
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
        </div>
        <div className=" h-[600px] rounded-b-2xl bg-gray-default overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
}