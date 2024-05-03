import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./IslandPage.css"; // Ensure this CSS file is correctly linked
import axios from "axios";

function Island1() {
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    var userId = localStorage.getItem("user_id");

    axios
      .get("http://localhost:8080/progress", {
        params: { chapter: 1, userId: userId },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data === undefined || response.data === "") {
          axios
            .post("http://localhost:8080/progress", {
              chapter: 1,
              count: 30,
              userId,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              alert();
            });
        }

        //logika paverst į objekta kuri galesim veliau applyint ar exercice done or not
      });

    // // Load visited state from local storage
    // const visitedExercises =
    //   JSON.parse(localStorage.getItem("visitedExercises")) || [];
    // setVisited(visitedExercises);
  }, []);

  return (
    <div>
      <h1>1 Skyrius</h1>
      <div className="button-container">
        {Array.from({ length: 30 }, (_, i) => (
          <Link key={i} to={`/exercise/${i + 1}`}>
            <button
              className={`exercise-button ${
                visited.includes(i + 1) ? "visited" : ""
              }`}
              onClick={() => handleVisit(i + 1)}
            >
              Exercise {i + 1}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );

  function handleVisit(id) {
    const updatedVisited = Array.from(new Set([...visited, id])); // Add new id to the set
    localStorage.setItem("visitedExercises", JSON.stringify(updatedVisited));
    setVisited(updatedVisited);
  }
}

export default Island1;
