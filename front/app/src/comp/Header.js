// In src/components/Header.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header({ points, setPoints }) {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/points", {
        params: { userId: localStorage.getItem("user_id") },
      })
      .then(function (response) {
        setPoints(response.data.points);
        console.log(response.data.points);
      });
  }, []);

  return (
    <div className="header">
      <button id="back-button" onClick={() => handleNavigate(-1)}>
        Atgal
      </button>{" "}
      {/* Back button with id for specific styling */}
      <div className="button-group">
        {" "}
        {/* Encapsulate round buttons in a div for grouped styling */}
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
      <span
        style={{
          marginLeft: "5px",
          marginRight: "10px",
          color: "white",
          fontSize: "18px",
          alignSelf: "center",
        }}
      >
        Surinkti taškai: {points}
      </span>
      <button id="badge-button" onClick={() => handleNavigate("/badges")}>
        Ženkleliai
      </button>{" "}
      {/* Badge button with id for specific styling */}
      <button id="out-button" onClick={() => handleNavigate("/")}>
        Atsijungti
      </button>
    </div>
  );
}

export default Header;
