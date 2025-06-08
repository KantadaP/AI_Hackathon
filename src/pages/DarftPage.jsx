import React from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import ItemCard from "../components/ItemCard";

export default function DarftPage() {
  return (
    <div className="h-full">
      <Header title="Draft" />
      <div className="flex flex-col items-center  h-full px-7 pt-7">
        <ItemCard icon="fa-regular fa-pen-to-square" />
        <ItemCard icon="fa-regular fa-pen-to-square" />
      </div>
    </div>
  );
}
