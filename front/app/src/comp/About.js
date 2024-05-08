import React from 'react';
import logo from './logo.png';

function AboutPage() {

    return (
        <div>
            <img src={logo} alt="Welcome Logo"/>
            <h3>Trikis yra sukurtas dirbtinio intelekto priemonės OpenArt. Jis sukurtas 4 klasės mokiniams norintiems pasitikrinti ir pastiprinti savo matematikos žinias.</h3>
            <div>
                <h3>Užduotys pateikiamos naudojant ChatGPT 4 ir parengtos pagal pradinių klasių mokymosi programą.</h3>
                <p>© 2024 Viktorija Drazdauskaitė</p>
            </div>

        </div>
    )
}

export default AboutPage;