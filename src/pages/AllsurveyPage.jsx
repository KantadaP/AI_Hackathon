import React from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import ItemCard from "../components/ItemCard";

export default function AllsurveyPage() {
  return (
    <div className="h-full">
      <Header title="All Surveys" />
      <Container>
        <ItemCard />
        <ItemCard />
      </Container>
      <Container title="Inactive" color="bg-red-inactive">
        <ItemCard />
        <ItemCard />
      </Container>
    </div>
  );
}
