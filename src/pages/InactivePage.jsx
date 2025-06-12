import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

export default function InactivePage() {
  const [inactiveSurveys, setInactiveSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("surveys");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const inactive = parsed.filter((survey) => survey.status === "Inactive");
        setInactiveSurveys(inactive);
      } catch (e) {
        console.error("Error parsing surveys", e);
      }
    }
  }, []);

  const handleNavigation = (id) => {
    navigate(`/dashboard/summary/${id}`);
  };

  return (
    <div className="h-full">
      <Header title="Inactive Surveys" />
      <Container color="bg-red-inactive">
        {inactiveSurveys.length > 0 ? (
          inactiveSurveys.map((survey) => (
            <ItemCard
              key={survey.s_id}
              title={survey.name}
              author="Kantada"
              createdDate={new Date(survey.createdAt).toDateString()}
              runningDate={new Date(survey.createdAt).toDateString()}
              responses={survey.questions?.length || 0}
              onClick={() => handleNavigation(survey.s_id)}
            />
          ))
        ) : (
          <p className="text-gray-500">No inactive surveys found.</p>
        )}
      </Container>
    </div>
  );
}
