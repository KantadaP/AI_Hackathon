import React from "react";
import SummaryHeader from "../components/SummaryHeader";
import TopBar from "../components/TopBar";
import { Outlet } from "react-router-dom";

export default function SummaryPage() {
  const handleOpen = () => {
    window.open("http://localhost:5173/respond", "_blank");
  };

  return (
    <div className="p-10">
      <TopBar />
      <SummaryHeader onOpenSurvey={handleOpen} />
      <Outlet /> {/* 👈 Where nested routes like AllQuestionPage will appear */}
    </div>
  );
}
