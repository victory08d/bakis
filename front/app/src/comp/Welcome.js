import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
    let navigate = useNavigate();
    return (
        <div className="welcome">
            <h1>Sveikas! Pradėkime kelionę!</h1>
            <button onClick={() => navigate('/math-question')}>1 Klausimas</button>
            <button onClick={() => navigate('/badges')}>Surinkti ženkleliai</button>
        </div>
    );
}

export default Welcome;
