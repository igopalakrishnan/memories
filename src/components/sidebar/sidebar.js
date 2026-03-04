import React, { useState, useEffect } from "react";
import "./sidebarDial.css";
import { basePath, profileGroups } from "./profileGroups";
import { useNavigate } from "react-router-dom";

const SidebarDial = () => {
  const [openGroup, setOpenGroup] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [pillPosition, setPillPosition] = useState({ top: 0, left: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [startAngle, setStartAngle] = useState(null);
  const navigate = useNavigate();

  const angleGap = 45;
  const radius = 100;

  const handleNavigate = (profile) => {
    // Navigate to a profile-specific route
    navigate(`${profile.name.toLowerCase()}`);
    // ✅ Close the dial and pill after navigation
    setOpenGroup(null);
    setSelectedProfile(null);
    // trigger fade‑out
    setIsClosing(true);
    // after animation duration, reset states
    setTimeout(() => {
      setOpenGroup(null);
      setSelectedProfile(null);
      setIsClosing(false);
    }, 300); // match CSS transition duration
  };

  const handleProfileClick = (p, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.parentElement.getBoundingClientRect();

    setPillPosition({
      top: rect.top - parentRect.top + rect.height / 2,
      left: rect.right - parentRect.left + 8,
    });
    setSelectedProfile(p);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle =
      Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    setStartAngle(angle - rotation);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle =
      Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    setRotation(angle - startAngle);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (selectedProfile) {
      const timeout = setTimeout(() => {
        setSelectedProfile(null);
      }, 2000); // pill disappears after 2 seconds
      return () => clearTimeout(timeout);
    }
  }, [selectedProfile]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // If a group is open and the click is outside any group-container
      if (openGroup !== null) {
        const dialContainer = document.querySelector(".dial-container");
        if (dialContainer && !dialContainer.contains(e.target)) {
          setOpenGroup(null); // close the group
          setSelectedProfile(null); // hide pill
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openGroup]);

  return (
    <>
      {openGroup !== null && (
        <div
          className={`overlay ${isClosing ? "fade-out" : ""}`}
          onClick={() => {
            setIsClosing(true);
            setTimeout(() => {
              setOpenGroup(null);
              setSelectedProfile(null);
              setIsClosing(false);
            }, 300);
          }}
        ></div>
      )}

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
              <div
                className={`dial ${isClosing ? "fade-out" : ""}`}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                {group.profiles.map((p, index) => (
                  <div
                    key={index}
                    className="profile-circle"
                    style={{
                      backgroundColor: p.color,
                      transform: `rotate(${rotation + index * angleGap}deg) translateX(${radius}px) rotate(-${rotation + index * angleGap}deg)`,
                    }}
                    onClick={(e) => handleProfileClick(p, e)}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/gallery/profiles/${p.image}`}
                      alt={p.name}
                    />
                  </div>
                ))}

                {/* Pill */}
                {selectedProfile && (
                  <div
                    className="profile-pill"
                    style={{
                      backgroundColor: selectedProfile.color,
                      position: "absolute",
                      top: pillPosition.top,
                      left: pillPosition.left,
                    }}
                  >
                    <div
                      className="pill-name"
                      onClick={() => handleNavigate(selectedProfile)}
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      {selectedProfile.name}
                    </div>
                    <div className="pill-dob">{selectedProfile.dob}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SidebarDial;
