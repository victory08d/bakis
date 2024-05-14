import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import island1 from './island1.png';
import island2 from './island2.png';
import island3 from './island3.png';
import island4 from './island4.png';
import island5 from './island5.png';

function Welcome() {
    let navigate = useNavigate();

    return (
        <div className="welcome">
            <div className="content">
                <img src={logo} alt="Welcome Logo" style={{width: '30%'}}/>
                <h2>Sveikas atvykęs! Turime 5 salas, per kurias eidamas pasitikrinsi 4 klasės kurso žinias. Pradėkime kelionę!</h2>
            </div>
            <div className="island-container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '30px'}}>
                <img src={island1} alt="Island 1" onClick={() => navigate('/island1')} style={{ width: '18%', cursor: 'pointer' }} />
                <img src={island2} alt="Island 2" onClick={() => navigate('/island2')} style={{ width: '18%', cursor: 'pointer' }} />
                <img src={island3} alt="Island 3" onClick={() => navigate('/island3')} style={{ width: '18%', cursor: 'pointer' }} />
                <img src={island4} alt="Island 4" onClick={() => navigate('/island4')} style={{ width: '18%', cursor: 'pointer' }} />
                <img src={island5} alt="Island 5" onClick={() => navigate('/island5')} style={{ width: '18%', cursor: 'pointer' }} />
            </div>
            <div style={{marginTop: '30px'}}>
                <button id="collect-badges" onClick={() => navigate('/badges')}>Surinkti ženkleliai</button>
                <button id="about-us" onClick={() => navigate('/about')}>Apie mus</button>
            </div>
        </div>
    );
}

export default Welcome;
