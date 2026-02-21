import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/home";
import Gokul from "./components/pages/gokul";
import Vinoth from "./components/pages/vinoth";
import AppNavbar from "./components/navbar/navbar";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
         <Route path="/memories/home" element={<Home />} />
        <Route path="/memories/gokul" element={<Gokul />} />
        <Route path="/memories/vinoth" element={<Vinoth />} />
      </Routes>
    </Router>
  );
}

export default App;
