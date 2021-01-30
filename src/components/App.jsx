import React from "react";
import "../index.css";
import Timer from "./Timer";
import LevelForm from "./LevelForm";
import CardsList from "./CardsList";
import CategoryChoose from "./CategoryChoose";
import { GameProvider } from "../context/GameProvider";

export default function App() {
  return (
    <GameProvider>
      <h1>best Memory game ever</h1>
      <CategoryChoose />
      <Timer />
      <LevelForm />
      <div className="container">
        <CardsList />
      </div>
    </GameProvider>
  );
}
