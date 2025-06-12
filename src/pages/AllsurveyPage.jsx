import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

export default function AllsurveyPage() {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("surveys");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSurveys(parsed);
        console.log("Loaded surveys:", parsed);
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
      <Header title="All Surveys" />
      <Container>
        {surveys
          .filter((survey) => survey.status === "Active")
          .map((survey, index) => (
            <ItemCard
              key={survey.s_id}
              title={survey.name}
              author="Kantada"
              createdDate={new Date(survey.createdAt).toDateString()}
              runningDate={new Date(survey.createdAt).toDateString()}
              responses={survey.questions?.length || 0}
              onClick={() => handleNavigation(survey.s_id)}
            />
          ))}
      </Container>

      <Container title="Inactive" color="bg-red-inactive">
        {surveys
          .filter((survey) => survey.status !== "Active")
          .map((survey, index) => (
            <ItemCard
              key={survey.s_id}
              title={survey.name}
              author="Kantada"
              createdDate={new Date(survey.createdAt).toDateString()}
              runningDate={new Date(survey.createdAt).toDateString()}
              responses={survey.questions?.length || 0}
              onClick={() => handleNavigation(survey.s_id)}
            />
          ))}
      </Container>
    </div>
  );
}
