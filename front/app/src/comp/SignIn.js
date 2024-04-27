import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/login', { username: username, password: password })
      .then(function (response) {
        navigate('/welcome'); // Assuming you want to navigate to the same page after login
      })
      .catch(function (error) {
        alert('Login failed, please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form">
      <label>
        El. paštas:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Slaptažodis:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Prisijungti</button>
    </form>
  );
}

export default SignIn;
