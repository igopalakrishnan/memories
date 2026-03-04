import React, { useState, useEffect } from "react";
import "./sidebarDial.css";

const profileGroups = [
  {
    mainColor: "#444",
    icon: "bi bi-people-fill",
    profiles: [
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
    ],
  },
  {
    mainColor: "#555",
    icon: "bi bi-star-fill",
    profiles: [
      // 8 profiles for group 2
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
    ],
  },
  {
    mainColor: "#666",
    icon: "bi bi-heart-fill",
    profiles: [
      // 8 profiles for group 3
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
    ],
  },
];

const SidebarDial = () => {
  const [openGroup, setOpenGroup] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);

  const angleGap = 45;
  const radius = 100;

  useEffect(() => {
    let interval;
    if (openGroup !== null && !paused) {
      interval = setInterval(() => {
        setRotation((prev) => prev + 5);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [openGroup, paused]);

  return (
    <div className="dial-container">
      {profileGroups.map((group, gIndex) => (
        <div
          key={gIndex}
          className={`group-container ${openGroup === gIndex ? "expanded" : ""}`}
        >
          {/* Main icon */}
          <div
            className="main-icon"
            onClick={() => setOpenGroup(openGroup === gIndex ? null : gIndex)}
            style={{ backgroundColor: group.mainColor }}
          >
            <i className={group.icon}></i>
          </div>

          {/* Dial */}
          {openGroup === gIndex && (
            <div className="dial">
              {group.profiles.map((p, index) => (
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
        </div>
      ))}

      {/* Pill overlay */}
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
