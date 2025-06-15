import logo from "../assets/logo.svg";
import profile from "../assets/profile.svg";
import { useNavigate } from "react-router-dom";

export default function TopBar2() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between items-center mb-5">
      <img
        src={logo}
        alt="logo"
        className="w-15 h-15 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      />
      <h1 className="text-[50px] font-bold"></h1>
      <img
        src={profile}
        alt="profile"
        className="w-15 h-15 rounded-full"
      />
    </div>
  );
}
