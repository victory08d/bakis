import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MathQuestion({ setHasBadge }) {
    const [question, setQuestion] = useState('');
    const [guess, setGuess] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/questions', { params: { id: 1 } })
            .then(function (response) {
                setQuestion(response.data.question)
                setAnswer(response.data.answer)
            })


    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (guess === answer) {
            alert('Teisingai!');
            setTimeout(() => navigate('/welcome'), 2000);
        } else {
            alert('Neteisingai! Bandyk iš naujo.');
            setGuess('');
            axios.get('http://localhost:8080/questions', { params: { id: 1 } })
                .then(function (response) {

                    setQuestion(response.data.question)
                    setAnswer(response.data.answer)
                })
        }
    };
    return (
        <div>
            {question}
            <div>
                <form onSubmit={handleSubmit} className="signup-form">
                    <label>
                        Atsakymas:
                        <input type="text" value={guess} required onChange={(e) => setGuess(e.target.value)} />
                    </label>
                    <button type="submit">Pateikti</button>
                </form>
                {answer}
            </div>
        </div>
    );





    /*const [number1, setNumber1] = useState(Math.floor(Math.random() * 10));
    const [number2, setNumber2] = useState(Math.floor(Math.random() * 10));
    const [userAnswer, setUserAnswer] = useState('');
    const [message, setMessage] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        setNumber1(Math.floor(Math.random() * 10));
        setNumber2(Math.floor(Math.random() * 10));
    }, []);

    const checkAnswer = (event) => {
        event.preventDefault();
        const correctAnswer = number1 * number2;
        if (parseInt(userAnswer, 10) === correctAnswer) {
            setMessage("Teisingai! Štai tavo ženklelis!");
            setHasBadge(true);
            setTimeout(() => navigate('/welcome'), 2000); // Navigate back after 2 seconds
        } else {
            setMessage('Neteisingai, pabandyk dar kartą!');
        }
    };

    return (
        <div>
            <h1>Math Question</h1>
            <p>Solve the following: {number1} x {number2}</p>
            <form onSubmit={checkAnswer}>
                <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
                <button type="submit">Submit Answer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );*/
}

export default MathQuestion;
