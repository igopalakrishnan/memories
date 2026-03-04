import React, { useState, useEffect } from "react";
import "./sidebarDial.css";

const profiles = [
  {
    name: "Abinash",
    dob: "01 Jan",
    color: "#1877f2",
    image: "/gallery/profiles/abinash.webp",
  },
  {
    name: "Abishek",
    dob: "02 Feb",
    color: "#1da1f2",
    image: "/gallery/profiles/abishek.webp",
  },
  {
    name: "Ajith",
    dob: "03 Mar",
    color: "#e60023",
    image: "/gallery/profiles/ajith.webp",
  },
  {
    name: "Kalai",
    dob: "04 Apr",
    color: "#0a66c2",
    image: "/gallery/profiles/kalai.webp",
  },
  {
    name: "Kavin",
    dob: "05 May",
    color: "#ff4500",
    image: "/gallery/profiles/kavin.webp",
  },
  {
    name: "Mani",
    dob: "06 Jun",
    color: "#ff9900",
    image: "/gallery/profiles/mani.webp",
  },
  {
    name: "Ravi",
    dob: "07 Jul",
    color: "#009688",
    image: "/gallery/profiles/ravi.webp",
  },
  {
    name: "Suresh",
    dob: "08 Aug",
    color: "#673ab7",
    image: "/gallery/profiles/suresh.webp",
  },
  // add more profiles...
];

const SidebarDial = () => {
  const [open, setOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);

  const angleGap = 45; // ✅ fixed gap between profiles
  const radius = 100; // ✅ fixed arc radius

  // Auto-rotate carousel
  useEffect(() => {
    let interval;
    if (open && !paused) {
      interval = setInterval(() => {
        setRotation((prev) => prev + 5);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [open, paused]);

  return (
    <div className="dial-container">
      {/* Left-edge anchor icon */}
      <div
        className="main-icon"
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: "#444" }}
      >
        <i className="bi bi-people-fill"></i>
      </div>

      {/* Half-circle dial expanding outward to the right */}
      {open && (
        <div className="dial">
          {profiles.map((p, index) => (
            <div
              key={index}
              className="profile-circle"
              style={{
                backgroundColor: p.color,
                transform: `rotate(${rotation + index * angleGap}deg) translateX(${radius}px) rotate(-${rotation + index * angleGap}deg)`,
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onClick={() => setSelectedProfile(p)}
            >
              <img src={p.image} alt={p.name} />
            </div>
          ))}
        </div>
      )}

      {/* Pill overlay with details */}
      {selectedProfile && (
        <div
          className="profile-pill"
          style={{ backgroundColor: selectedProfile.color }}
        >
          <span className="pill-name">{selectedProfile.name}</span>
          <span className="pill-dob">{selectedProfile.dob}</span>
        </div>
      )}
    </div>
  );
};

export default SidebarDial;
