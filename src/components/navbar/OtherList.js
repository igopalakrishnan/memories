import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { other } from "../home/profiles";

const OtherList = ({ onClose }) => (
  <Nav className="flex-column">
    {other.map((p, index) => (
      <NavLink
        key={index}
        to={p.path}
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        onClick={onClose}
      >
        <div className="profile-item">
          <span className="profile-name">{p.name}</span>
          <span className="profile-dob">{p.dob}</span>
        </div>
      </NavLink>
    ))}
  </Nav>
);

export default OtherList;
