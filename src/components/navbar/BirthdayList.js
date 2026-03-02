import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { birthday } from "../home/profiles";

const BirthdayList = ({ onClose }) => (
  <Nav className="flex-column">
    {birthday.map((p, index) => (
      <NavLink
        key={index}
        to={p.path}
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
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

export default BirthdayList;
