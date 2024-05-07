// In src/components/Header.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Header({ points, setPoints }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    axios.get("http://localhost:8080/points", {
      params: { userId: localStorage.getItem("user_id") },
    })
    .then(function (response) {
      setPoints(response.data.points);
      console.log(response.data.points);
    });
  }, []);

  // Determine if the current page is ExercisePage
  const isExercisePage = location.pathname.includes("/exercise");

  return (
    <div className="header">
      <button id="back-button" onClick={() => handleNavigate(-1)}>
        Atgal
      </button>
      {/* Conditionally render other elements based on whether it's the exercise page or not */}
      {!isExercisePage && (
        <div className="button-group">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className="round-button"
              onClick={() => handleNavigate(`/island${num}`)}
            >
              {num}
            </button>
          ))}
        </div>
      )}
      {!isExercisePage && (
        <span style={{
            marginLeft: "5px",
            marginRight: "10px",
            color: "white",
            fontSize: "18px",
            alignSelf: "center",
          }}>
          Surinkti taškai: {points}/150
        </span>
      )}
      {!isExercisePage && (
        <button id="badge-button" onClick={() => handleNavigate("/badges")}>
          Ženkleliai
        </button>
      )}
      <button id="out-button" onClick={() => handleNavigate("/")}>
        Atsijungti
      </button>
    </div>
  );
}

export default Header;
