import React from 'react';
import badge from './badge.png';

function BadgesPage({ hasBadge }) {
    console.log("Has badge:", hasBadge);  // Debugging line to see the value of hasBadge
    return (
        <div>
            <h1>Surinkti ženkleliai:</h1>
            {hasBadge ? <img src={badge} alt="Collected Badge" className="badge-icon" /> : <p>Dar nesurinkai jokių ženklelių.</p>}
        </div>
    );
}

export default BadgesPage;
