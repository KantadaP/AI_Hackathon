import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SummaryHeader() {
  const navigate = useNavigate();
  const { surveyId } = useParams();

  return (
    <div className="bg-green-button p-7 rounded-t-2xl flex justify-between items-center">
      {/* Navigation Tabs */}
      <div className="flex gap-6">
        <p
          className="text-[25px] font-semibold text-white p-2 cursor-pointer"
          onClick={() => navigate(`/summary/${surveyId}`)}
        >
          Summary
        </p>
        <p
          className="text-[25px] font-semibold text-white p-2 cursor-pointer"
          onClick={() => navigate(`/summary/${surveyId}/question`)}
        >
          All Questions
        </p>
        <p
          className="text-[25px] font-semibold text-white p-2 cursor-pointer"
          onClick={() => navigate(`/summary/${surveyId}/respond`)}
        >
          All Respond
        </p>
      </div>
    </div>
  );
}
