import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./IslandPage.css";
import axios from "axios";
import island5 from './island5.png'

function Island5({setPoints}) {
  const [questionMap, setQuestionMap] = useState(generateQuestionJson(30));
  useEffect(() => {
    var userId = localStorage.getItem("user_id");

    axios
      .get("http://localhost:8080/points", {
        params: { userId: userId },
      })
      .then(function (response) {
        setPoints(response.data.points);
        console.log(response.data.points);
      });

    axios
      .get("http://localhost:8080/progress", {
        params: { chapter: 5, userId: userId },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data === undefined || response.data === "") {
          axios
            .post("http://localhost:8080/progress", {
              chapter: 5,
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

  }, [setPoints]);

  return (
    <div>
      <img src={island5} alt="5 island" className="island-image"/>
    <div className="button-container">
      <h1>5 SALA</h1>
      <div>
        {questionMap.map((q) => (
          <Link key={q.number} to={`/exercise/5/${q.number}`}>
            <button
              className={`exercise-button ${q.completed ? "visited" : ""}`}
              disabled={q.completed}
            >
              {q.number} užduotis
            </button>
          </Link>
        ))}
        <div>
  <h3>Šioje saloje rasi:</h3>
  <div className="text-container-row">
    <div className="text-container">Išvadų sudarymo uždavinių.</div>
    <div className="text-container">Duomenų analizavimo uždavinių.</div>
    <div className="text-container">Statistikos uždavinių.</div>
  </div>
</div>
      </div>
    </div>
    </div>
  );

}


const Question = (number, completed) => {
    return { number: number, completed: completed };
  };
   
  function generateQuestionJson(question_count) {
    let list = [];
    for (let i = 1; i <= question_count; i++) {
      list.push(Question(i, false));
    }
    return list;
   }

export default Island5;
