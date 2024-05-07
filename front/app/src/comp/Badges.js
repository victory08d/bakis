import React, { useState, useEffect } from "react";
import axios from "axios";
// Import collected and uncollected badge images
import badge1 from "./badge1.png";
import badge2 from "./badge2.png";
import badge3 from "./badge3.png";
import badge4 from "./badge4.png";
import badge5 from "./badge5.png";
import nobadge1 from "./nobadge1.png";
import nobadge2 from "./nobadge2.png";
import nobadge3 from "./nobadge3.png";
import nobadge4 from "./nobadge4.png";
import nobadge5 from "./nobadge5.png";

function BadgesPage() {
  const [badges, setBadges] = useState([]);

  // Array of collected and uncollected badge images
  const badgeImages = [badge1, badge2, badge3, badge4, badge5];
  const nobadgeImages = [nobadge1, nobadge2, nobadge3, nobadge4, nobadge5];

  useEffect(() => {
    axios
      .get("http://localhost:8080/badge", {
        params: { userId: localStorage.getItem("user_id") },
      })
      .then(function (response) {
        console.log(response.data.badges);
        setBadges(response.data.badges);
      });
  }, []);

  return (
    <div>
      <h1>Surinkti ženkleliai:</h1>
      <div style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {badges.map((b, index) => (
          <div key={index} className="badge-container" style={{ display: 'inline-block', width: '200px', height: '250px' }}>
            <p> Skyrius {b.chapter} </p>
            <img
              src={b.received ? badgeImages[index % badgeImages.length] : nobadgeImages[index % nobadgeImages.length]}
              alt={b.received ? `Collected Badge ${index + 1}` : `Uncollected Badge ${index + 1}`}
              className="badge-icon"
              style={{
                width: b.received ? '70%' : '50%', // Adjusted for size in the same container
                height: 'auto',
                display: 'block',
                margin: '0 auto' // Centers the image in the div
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BadgesPage;
