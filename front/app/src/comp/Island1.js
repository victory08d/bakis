import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./IslandPage.css";
import axios from "axios";

function Island1() {
  const [questionMap, setQuestionMap] = useState([]);
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
        } else {
          const jsonArrayParsed = JSON.parse(response.data.question);
          setQuestionMap(jsonArrayParsed);
        }

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
        {questionMap.map((q) => (
          <Link key={q.number} to={`/exercise/${q.number}`}>
            <button
              className={`exercise-button ${q.completed ? "visited" : ""}`}
            >
              Exercise {q.number}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );


}

export default Island1;
