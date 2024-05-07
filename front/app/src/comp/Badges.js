import React, { useState, useEffect } from "react";
import axios from "axios";
// Import collected badge images
import badge1 from "./badge1.png";
import badge2 from "./badge2.png";
import badge3 from "./badge3.png";
import badge4 from "./badge4.png";
import badge5 from "./badge5.png";
// Import uncollected badge images
import nobadge1 from "./nobadge1.png";
import nobadge2 from "./nobadge2.png";
import nobadge3 from "./nobadge3.png";
import nobadge4 from "./nobadge4.png";
import nobadge5 from "./nobadge5.png";

function BadgesPage() {
  const [badges, setBadges] = useState([]);

  // Array of collected badge images
  const badgeImages = [badge1, badge2, badge3, badge4, badge5];
  // Array of uncollected badge images
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
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {badges.map((b, index) => (
          <div key={index}>
            <p> Skyrius {b.chapter} </p>
            {b.received ? (
              <img
                src={badgeImages[index % badgeImages.length]} // Use modulo to cycle through images if more badges than images
                alt={`Collected Badge ${index + 1}`}
                className="badge-icon"
                width={200}
              />
            ) : (
              <>
                
                <img
                  src={nobadgeImages[index % nobadgeImages.length]} // Use modulo similarly for no badge images
                  alt={`Uncollected Badge ${index + 1}`}
                  className="badge-icon"
                  width={100} // Smaller image for uncollected badges
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BadgesPage;
