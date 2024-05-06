import React, { useState, useEffect } from "react";
import badge from "./badge.png";
import axios from "axios";

function BadgesPage() {
  const [badges, setBadges] = useState([]);
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
      {badges.map((b) => (
        <>
          <p> Skyrius {b.chapter} </p>
          {b.received ? (
            <>
              <img
                src={badge}
                alt="Collected Badge"
                className="badge-icon"
                width={200}
              />
            </>
          ) : (
            <>
              <p>Dar nesurinkai ženklelių.</p>
            </>
          )}
        </>
      ))}
    </div>
  );
}

export default BadgesPage;
