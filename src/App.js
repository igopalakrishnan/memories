import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/home";
import AppNavbar from "./components/navbar/navbar";
import Gokul from "./components/pages/gokul";
import Abinash from "./components/pages/abinash";
import Abishek from "./components/pages/abishek";
import Ajith from "./components/pages/ajith";
import Jaynath from "./components/pages/jaynath";
import Kalai from "./components/pages/kalai";
import Kavin from "./components/pages/kavin";
import Kaviya from "./components/pages/kaviya";
import Kishore from "./components/pages/kishore";
import Manoj from "./components/pages/manoj";
import Nithya from "./components/pages/nithya";
import Sathish from "./components/pages/sathish";
import Shiva from "./components/pages/shiva";
import Siddiq from "./components/pages/siddiq";
import Soundarya from "./components/pages/soundarya";
import Tamil from "./components/pages/tamil";
import Vicky from "./components/pages/vicky";
import Vinoth from "./components/pages/vinoth";
import Kfc from "./components/pages/kfc";
import Ooty from "./components/pages/ooty";
import Parvathamalai from "./components/pages/parvathamalai";
import Pothys from "./components/pages/pothys";
import Thiruvannamalai from "./components/pages/thiruvannamalai";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/abinash" element={<Abinash />} />
         <Route path="/abishek" element={<Abishek />} />
         <Route path="/ajith" element={<Ajith />} />
         <Route path="/gokul" element={<Gokul />} />
         <Route path="/jaynath" element={<Jaynath />} />
         <Route path="/kalai" element={<Kalai />} />
         <Route path="/kavin" element={<Kavin />} />
         <Route path="/kaviya" element={<Kaviya />} />
         <Route path="/kishore" element={<Kishore />} />
         <Route path="/manoj" element={<Manoj />} />
         <Route path="/nithya" element={<Nithya />} />
         <Route path="/sathish" element={<Sathish />} />
         <Route path="/shiva" element={<Shiva />} />
         <Route path="/siddiq" element={<Siddiq />} />
         <Route path="/soundarya" element={<Soundarya />} />
         <Route path="/tamil" element={<Tamil />} />
         <Route path="/vicky" element={<Vicky />} />
         <Route path="/vinoth" element={<Vinoth />} />

         <Route path="/kfc" element={<Kfc />} />
         <Route path="/ooty" element={<Ooty />} />
         <Route path="/parvathamalai" element={<Parvathamalai />} />
         <Route path="/pothys" element={<Pothys />} />
         <Route path="/thiruvannamalai" element={<Thiruvannamalai />} />
      </Routes>
    </Router>
  );
}

export default App;