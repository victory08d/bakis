import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./IslandPage.css";
import axios from "axios";
import Modal from './Modal';

function Island1({ setPoints }) {
  const [questionMap, setQuestionMap] = useState(generateQuestionJson(30));

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(true);  // Open the modal when the page loads
  }, []);

  const handleClose = () => {
    setModalOpen(false);  // This function should close the modal
  }

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
  }, []);

  return (
    <div>
      <Modal isOpen={modalOpen} onClose={handleClose}>
        <h2>1 saloje rasi:</h2>
        <p>Skaičių skaitymą;
        </p>
      </Modal>
      
      <h1>1 Skyrius</h1>
      <div className="button-container">
        {questionMap.map((q) => (
          <Link key={q.number} to={`/exercise/1/${q.number}`}>
            <button
              className={`exercise-button ${q.completed ? "visited" : ""}`}
              disabled={q.completed}
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

export default Island1;
