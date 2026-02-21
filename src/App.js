import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/home";
import AppNavbar from "./components/navbar/navbar";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
         <Route path="/memories" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
