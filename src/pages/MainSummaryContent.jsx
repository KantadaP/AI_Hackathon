import React from "react";
import { useParams } from "react-router-dom";

export default function MainSummaryContent() {
  const { surveyId } = useParams();

  const surveys = JSON.parse(localStorage.getItem("surveys")) || [];
  const survey = surveys.find((s) => String(s.s_id) === surveyId);

  if (!survey) return <p className="text-red-500">Survey not found.</p>;

  return (
    <div className="h-[600px] shadow-xl bg-gray-default p-5">
      <h2 className="text-2xl font-semibold mb-4">{survey.title || "Untitled Survey"}</h2>
      <p>Total Questions: {survey.questions?.length || 0}</p>
      {/* Add more summary info here */}
    </div>
  );
}
