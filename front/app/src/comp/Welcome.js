import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

function Welcome() {
    let navigate = useNavigate();
    return (
        <div className="welcome">
            <div class="content">
                <img src={logo} alt="Welcome Logo" />
                <h1>Sveikas! Pradėkime kelionę!</h1>
            </div>

            <button id="button2" onClick={() => navigate('/math-question')}>1 Klausimas</button>
            <button id="button2" onClick={() => navigate('/badges')}>Surinkti ženkleliai</button>
        </div>
    );
}

export default Welcome;
