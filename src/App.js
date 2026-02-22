import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/home";
import AppNavbar from "./components/navbar/navbar";
import Gokul from "./components/pages/gokul";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/memories/gokul" element={<Gokul />} />
      </Routes>
    </Router>
  );
}

export default App;
