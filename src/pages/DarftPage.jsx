import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

export default function DraftPage() {
  const [draftSurveys, setDraftSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("surveys");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const drafts = parsed.filter((survey) => survey.status === "Draft");
        setDraftSurveys(drafts);
      } catch (e) {
        console.error("Error parsing surveys from localStorage", e);
      }
    }
  }, []);

  const handleNavigation = (id) => {
    navigate(`/dashboard/summary/${id}`);
  };

  return (
    <div className="h-full">
      <Header title="Draft" />
      <div className="flex flex-col items-center h-full px-7 pt-7">
        {draftSurveys.length > 0 ? (
          draftSurveys.map((survey) => (
            <ItemCard
              key={survey.s_id}
              icon="fa-regular fa-pen-to-square"
              title={survey.name}
              author="Kantada"
              createdDate={new Date(survey.createdAt).toDateString()}
              runningDate={new Date(survey.createdAt).toDateString()}
              responses={survey.questions?.length || 0}
              onClick={() => handleNavigation(survey.s_id)}
            />
          ))
        ) : (
          <p className="text-gray-500">No draft surveys available.</p>
        )}
      </div>
    </div>
  );
}
