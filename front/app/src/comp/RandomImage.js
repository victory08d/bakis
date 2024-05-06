import React from 'react';
// Import the images from their respective paths
import logo from './logo.png';
import logo2 from './logo2.png';
import logo3 from './logo3.png';
import './Home.css';

const images = [logo, logo2, logo3];

function RandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  const imageUrl = images[randomIndex];

  return (
    <div>
      <img src={imageUrl} alt="Random Logo" className="pulsating-image"/>
    </div>
  );
}

export default RandomImage;
