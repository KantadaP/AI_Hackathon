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

  // Delete survey handler
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this survey?");
    if (!confirmed) return;

    // Remove survey from localStorage
    const updatedSurveys = inactiveSurveys.filter((survey) => survey.s_id !== id);
    setInactiveSurveys(updatedSurveys);

    // Also update in localStorage
    const allSurveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    const filteredAll = allSurveys.filter((survey) => survey.s_id !== id);
    localStorage.setItem("surveys", JSON.stringify(filteredAll));
  };

  return (
    <div className="h-full">
      <Header title="Inactive Surveys" />
      <Container color="bg-red-inactive">
        {inactiveSurveys.length > 0 ? (
          inactiveSurveys.map((survey) => (
            <ItemCard
              key={survey.s_id}
              s_id={survey.s_id} // important for edit/delete
              title={survey.name}
              author="Kantada"
              createdDate={new Date(survey.createdAt).toDateString()}
              runningDate={new Date(survey.createdAt).toDateString()}
              responses={survey.questions?.length || 0}
              path={`/summary/${survey.s_id}`} // navigate on whole card click
              onDelete={handleDelete} // pass delete callback
            />
          ))
        ) : (
          <p className="text-gray-500">No inactive surveys found.</p>
        )}
      </Container>
    </div>
  );
}
