import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ExercisePage() {
  let { chapter, id: number } = useParams(); // Gets the id from the URL
  console.log(chapter);
  console.log(number);

  const [question, setQuestion] = useState("");
  const [guess, setGuess] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/questions", { params: { id: number } })
      .then(function (response) {
        setQuestion(response.data.question);
        setAnswer(response.data.answer);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (guess === answer) {
      // alert("Teisingai!");
      axios.put("http://localhost:8080/progress", {
        userId: localStorage.getItem("user_id"),
        chapter: chapter,
        number: number,
      });
      setTimeout(() => navigate("/island" + chapter), 2000);
    } else {
      alert("Neteisingai! Bandyk iš naujo.");
      setGuess("");
      axios
        .get("http://localhost:8080/questions", { params: { id: 1 } })
        .then(function (response) {
          setQuestion(response.data.question);
          setAnswer(response.data.answer);
        });
    }
  };
  return (
    <div>
      <h1>Užduotis numeris {number}</h1>
      <div>
        {question}
        <div>
          <form onSubmit={handleSubmit} className="signup-form">
            <label>
              <input
                type="text"
                value={guess}
                required
                onChange={(e) => setGuess(e.target.value)}
              />
            </label>
            <button type="submit">Pateikti</button>
          </form>
          {answer}
        </div>
      </div>
     </div>
  );
}

export default ExercisePage;
