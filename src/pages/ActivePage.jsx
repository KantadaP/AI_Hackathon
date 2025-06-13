import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

export default function ActivePage() {
  const [activeSurveys, setActiveSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("surveys");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const active = parsed.filter((survey) => survey.status === "Active");
        setActiveSurveys(active);
      } catch (e) {
        console.error("Error parsing surveys", e);
      }
    }
  }, []);

  const handleEdit = (id) => {
    navigate(`/dashboard/add/${id}`);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this survey?");
    if (!confirmed) return;

    const updated = activeSurveys.filter((s) => s.s_id !== id);
    setActiveSurveys(updated);
    localStorage.setItem("surveys", JSON.stringify(updated));
  };

  return (
    <div className="h-full">
      <Header title="Active Surveys" />
      <Container>
        {activeSurveys.length > 0 ? (
          <div className="flex flex-col items-center h-full px-7 pt-7 w-full">
            {activeSurveys.map((survey) => (
              <ItemCard
                key={survey.s_id}
                s_id={survey.s_id}
                title={survey.name}
                author="Kantada"
                icon="fa-regular fa-file" // Or customize per survey type
                createdDate={new Date(survey.createdAt).toLocaleDateString()}
                runningDate={new Date(survey.createdAt).toLocaleDateString()}
                responses={survey.questions?.length || 0}
                path={`/summary/${survey.s_id}`}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No active surveys found.</p>
        )}
      </Container>
    </div>
  );
}
