import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./IslandPage.css";
import axios from "axios";

function Island3() {
  const [questionMap, setQuestionMap] = useState(generateQuestionJson(30));
  useEffect(() => {
    var userId = localStorage.getItem("user_id");

    axios
      .get("http://localhost:8080/progress", {
        params: { chapter: 3, userId: userId },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data === undefined || response.data === "") {
          axios
            .post("http://localhost:8080/progress", {
              chapter: 3,
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

  }, []);

  return (
    <div>
      <h1>3 Skyrius</h1>
      <div className="button-container">
        {questionMap.map((q) => (
          <Link key={q.number} to={`/exercise/1/${q.number}`}>
            <button
              className={`exercise-button ${q.completed ? "visited" : ""}`}
            >
               {q.number} užduotis
            </button>
          </Link>
        ))}
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

export default Island3;
