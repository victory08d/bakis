import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./comp/Home";
import SignUp from "./comp/SignUp";
import Welcome from "./comp/Welcome";
import "./App.css";
import "./comp/Header.css";
//import Header from './comp/Header';
import IslandPage1 from "./comp/Island1";
import IslandPage2 from "./comp/Island2";
import IslandPage3 from "./comp/Island3";
import IslandPage4 from "./comp/Island4";
import IslandPage5 from "./comp/Island5";
import ExercisePage from "./comp/ExercisePage";
import Badges from "./comp/Badges";
import HeaderWrapper from "./comp/HeaderWrapper";
import AboutPage from "./comp/About";

function App() {
  const [hasBadge, setHasBadge] = useState("");
  const [points, setPoints] = useState("");

  return (
    <Router>
      <div>
        <HeaderWrapper points={points} setPoints={setPoints} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/welcome" element={<Welcome hasBadge={hasBadge} setHasBadge={setHasBadge} />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="/island1"
            element={<IslandPage1 setPoints={setPoints} />} />
          <Route path="/exercise/:chapter/:id" element={<ExercisePage />} />
          <Route path="/island2"
            element={<IslandPage2 setPoints={setPoints} />} />
          <Route path="/island3"
            element={<IslandPage3 setPoints={setPoints} />} />
          <Route path="/island4"
            element={<IslandPage4 setPoints={setPoints} />} />
          <Route path="/island5"
            element={<IslandPage5 setPoints={setPoints} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
