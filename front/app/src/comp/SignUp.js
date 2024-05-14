import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:8080/register", {
        params: { username: username, password: password },
      })
      .then(function (response) {
        if (response.data.id === undefined) {
          axios
            .post("http://localhost:8080/register", {
              username: username,
              password: password,
            })
            .then(function (response) {
              localStorage.setItem("user_id", JSON.stringify(response.data.id));
              navigate("/welcome");
            })
            .catch(function (error) {
              alert("Neteisingi duomenys, bandykite dar kartą.");
            });
        } else {
          localStorage.setItem("user_id", JSON.stringify(response.data.id));
          navigate("/welcome");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label>
        Prisijungimo vardas:
        <input
          type="text"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Slaptažodis:
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Prisijungti</button>
    </form>
  );
}

export default SignUp;
