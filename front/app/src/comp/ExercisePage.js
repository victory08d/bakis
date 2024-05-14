import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import logo from './logo.png';

function ExercisePage() {
  let { chapter, id: number } = useParams();
  const [question, setQuestion] = useState("");
  const [guess, setGuess] = useState("");
  const [answer, setAnswer] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/questions", {
      params: { number: number, chapter: chapter },
    }).then(function (response) {
      setQuestion(response.data.question);
      setAnswer(response.data.answer);
    });
  }, [chapter, number]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (guess === answer) {
      setModalMessage("Atsakei teisingai! Gauni +1 tašką!");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/island" + chapter);
      }, 2000);
    } else {
      setModalMessage("Neteisingai! Pabandyk iš naujo su panašiu uždaviniu.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      setGuess("");
      axios.get("http://localhost:8080/questions", {
        params: { number: number, chapter: chapter },
      }).then(function (response) {
        setQuestion(response.data.question);
        setAnswer(response.data.answer);
      });
    }
  };

  const Modal = ({ message }) => (
    <div style={{
      position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
      backgroundColor: 'lightgreen', padding: '20px', borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', textAlign: 'center', color: 'darkgreen',
      fontSize: '20px', zIndex: 1000
    }}>
      {message}
    </div>
  );

  return (
    <div>
      <h1>Užduotis numeris {number}</h1>
      <div className="content-exercise">
        <img src={logo} alt="Welcome Logo" className="pulsating-image"/>
        <div className="dialog-bubble" style={{ fontSize: '24px' }}>
          {question}
        </div>
      </div>
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
      </div>
      {showModal && <Modal message={modalMessage} />}
    </div>
  );
}

export default ExercisePage;
