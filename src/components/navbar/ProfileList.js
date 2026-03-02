import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { birthday, other } from "../home/profiles";

const BATCH_SIZE = 20; // render 20 items at a time

const ProfileList = ({ onClose }) => {
  const [visibleBirthday, setVisibleBirthday] = useState(BATCH_SIZE);
  const [visibleOther, setVisibleOther] = useState(BATCH_SIZE);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // load more when near bottom
      setVisibleBirthday((prev) =>
        Math.min(prev + BATCH_SIZE, birthday.length),
      );
      setVisibleOther((prev) => Math.min(prev + BATCH_SIZE, other.length));
    }
  };

  useEffect(() => {
    // reset when reopened
    setVisibleBirthday(BATCH_SIZE);
    setVisibleOther(BATCH_SIZE);
  }, []);

  return (
    <div
      style={{ maxHeight: "80vh", overflowY: "auto" }}
      onScroll={handleScroll}
    >
      <h5 className="mt-2 mb-3">Birthday's Memories</h5>
      <Nav className="flex-column">
        {birthday.slice(0, visibleBirthday).map((p, index) => (
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

      <h5 className="mt-5 mb-3">Other's Memories</h5>
      <Nav className="flex-column">
        {other.slice(0, visibleOther).map((p, index) => (
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
    </div>
  );
};

export default ProfileList;
