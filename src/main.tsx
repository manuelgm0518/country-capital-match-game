import React from "react";
import ReactDOM from "react-dom/client";
import { MatchGame } from "./components/MatchGame";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MatchGame data={{ Germany: "Berlin", France: "Paris", China: "Beijing" }}></MatchGame>
);
