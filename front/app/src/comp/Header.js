// In src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="header">
            <button onClick={() => handleNavigate(-1)}>Atgal</button>
            {[1, 2, 3, 4, 5].map((num) => (
                <button key={num} className="round-button" onClick={() => handleNavigate(`/island${num}`)}>
                    {num}
                </button>
            ))}
            <button onClick={() => handleNavigate('/badges')}>Ženkleliai</button>
        </div>
    );
}

export default Header;
