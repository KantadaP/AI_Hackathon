import React from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";

export default function AllsurveyPage() {
  const surveys = JSON.parse(localStorage.getItem("surveys"));
  console.log("Loaded surveys from localStorage:", surveys);

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="h-full">
      <Header title="All Surveys" />
      <Container>
        {surveys && (
          <ItemCard
            title={"Demo Survey 1"}
            author={"Kantada"}
            createdDate={"16 JUN 2025"}
            runningDate={"16 JUN 2025"}
            responses={0}
            onClick={() => handleNavigation("/dashboard/summary")}
          />
        )}
        <ItemCard
          title={"Millennials and Gen Z"}
          author={"Kantada"}
          createdDate={"16 JUN 2025"}
          runningDate={"16 JUN 2025"}
          responses={34}
        />
        <ItemCard
          title={"Integrates with wearables for holistic insights"}
          author={"Kantada"}
          createdDate={"16 JUN 2025"}
          runningDate={"16 JUN 2025"}
          responses={42}
        />
      </Container>
      <Container title="Inactive" color="bg-red-inactive">
        <ItemCard />
        <ItemCard />
      </Container>
    </div>
  );
}
