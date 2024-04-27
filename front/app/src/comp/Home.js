import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './Home.css';

function Home() {
  let navigate = useNavigate();
  return (
    <div className="home">
      <header>
        <h1>Labas! Aš Trikis!</h1>
        <div>
        <img src={logo} alt="Welcome Logo" className="pulsating-image"/>
        </div>
        <button onClick={() => navigate('/signup')}>Prisijungti</button>
      </header>
    </div>
  );
}

export default Home;
