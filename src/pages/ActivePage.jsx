import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Container from '../components/Container';
import ItemCard from '../components/ItemCard';
import { useNavigate } from 'react-router-dom';

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

  const handleNavigation = (id) => {
    navigate(`/dashboard/summary/${id}`);
  };

  return (
    <div className="h-full">
      <Header title="Active Surveys" />
      <Container>
        {activeSurveys.length > 0 ? (
          activeSurveys.map((survey) => (
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
          <p>No active surveys found.</p>
        )}
      </Container>
    </div>
  );
}
