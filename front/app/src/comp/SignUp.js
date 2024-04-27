import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleSubmit = (event) => {

    event.preventDefault();
    axios.post('http://localhost:8080/register', {username:username, password:password})
    .then(function (response) {
      navigate('/welcome');
    })
    .catch(function (error) {
      alert('Neteisingi duomenys, bandykite dar kartą.');
    });
    
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label>
        Prisijungimo vardas:
        <input type="text" value={username} required onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Slaptažodis:
        <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Registruoti</button>
    </form>
  );
}

export default SignUp;
