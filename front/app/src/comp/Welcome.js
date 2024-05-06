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
            <button id="button" onClick={() => navigate('/badges')}>Surinkti ženkleliai</button>
            <div>
            <button id="button" onClick={() => navigate('/about')}>Apie mus</button>
            </div>
        </div>
    );
}

export default Welcome;
