import React from 'react';
import { useParams } from 'react-router-dom';

function ExercisePage() {
  let { id } = useParams(); // Gets the id from the URL

  return (
    <div>
      <h1>Exercise {id}</h1>
      <p>Here's a math question related to exercise {id}.</p>
    </div>
  );
}

export default ExercisePage;
