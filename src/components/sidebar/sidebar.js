import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { basePath, birthday, other } from "../home/profiles";
import "./sidebar.css";

const Sidebar = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [position, setPosition] = useState({ top: 0 });

  const handleClick = (event, profile) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({ top: rect.top + window.scrollY + rect.height / 2 });
    setSelectedProfile(profile);

    // Auto-hide after 3s
    setTimeout(() => setSelectedProfile(null), 3000);
  };

  const renderSection = (profiles, prefix) =>
    profiles.map((p, index) => (
      <div key={`${prefix}-${index}`} className="sidebar-item">
        <div
          className="icon-circle"
          //   style={{ backgroundColor: p.color }}
          onClick={(e) => handleClick(e, p)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/gallery/profiles/${p.image}`}
            alt={p.name}
            className="profile-icon"
            onError={(e) => {
              e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.webp`;
            }}
          />
        </div>
      </div>
    ));

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-section mb-5">
          {renderSection(birthday, "birthday")}
        </div>
        <div className="sidebar-section">{renderSection(other, "other")}</div>
      </div>

      {/* Floating overlay outside sidebar */}
      {selectedProfile && (
        <div
          className="profile-overlay-floating"
          style={{
            backgroundColor: selectedProfile.color,
            top: position.top,
          }}
        >
          <NavLink to={selectedProfile.path} className="profile-name-link">
            {selectedProfile.name}
          </NavLink>
          <span className="profile-dob">{selectedProfile.dob}</span>
        </div>
      )}
    </>
  );
};

export default Sidebar;
