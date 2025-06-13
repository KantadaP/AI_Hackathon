import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import ItemCard from "../components/ItemCard";

export default function AllsurveyPage() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("surveys");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSurveys(parsed);
      } catch (e) {
        console.error("Error parsing surveys from localStorage", e);
      }
    }
  }, []);

  const deleteSurvey = (id) => {
    if (!window.confirm("Are you sure you want to delete this survey?")) return;

    const filtered = surveys.filter((s) => s.s_id !== id);
    setSurveys(filtered);
    localStorage.setItem("surveys", JSON.stringify(filtered));
  };

  return (
    <div className="h-full">
      <Header title="All Surveys" />

      {/* Active Surveys */}
      <Container>
        {surveys
          .filter((survey) => survey.status === "Active")
          .map((survey) => (
            <ItemCard
              key={survey.s_id}
              s_id={survey.s_id}
              title={survey.name}
              author="Kantada"
              createdDate={new Date(survey.createdAt).toDateString()}
              runningDate={new Date(survey.createdAt).toDateString()}
              responses={survey.questions?.length || 0}
              path={`/summary/${survey.s_id}`}
              onDelete={deleteSurvey} // pass delete handler
            />
          ))}
      </Container>

      {/* Inactive Surveys */}
      <Container title="Inactive" color="bg-red-inactive">
        {surveys
          .filter(
            (survey) => survey.status !== "Active" && survey.status !== "Draft"
          )
          .map((survey) => (
            <ItemCard
              key={survey.s_id}
              s_id={survey.s_id}
              title={survey.name}
              author="Kantada"
              createdDate={new Date(survey.createdAt).toDateString()}
              runningDate={new Date(survey.createdAt).toDateString()}
              responses={survey.questions?.length || 0}
              path={`/summary/${survey.s_id}`}
              onDelete={deleteSurvey}
            />
          ))}
      </Container>

      {/* Draft Surveys */}
      <Container title="Drafts" color="bg-yellow-100">
        {surveys
          .filter((survey) => survey.status === "Draft")
          .map((survey) => (
            <ItemCard
              key={survey.s_id}
              s_id={survey.s_id}
              title={survey.name}
              author="Kantada"
              createdDate={new Date(survey.createdAt).toDateString()}
              runningDate={new Date(survey.createdAt).toDateString()}
              responses={survey.questions?.length || 0}
              path={`/summary/${survey.s_id}`}
              onDelete={deleteSurvey}
            />
          ))}
      </Container>
    </div>
  );
}
