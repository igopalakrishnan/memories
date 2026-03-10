import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { birthday, other } from "./profiles";
import "./home.css";

const Home = () => {
  const [zoomImage, setZoomImage] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Auto-play when page loads
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          console.log("Autoplay blocked, user must click play");
        });
      // When audio finishes, reset button to Play
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {
        console.log("Autoplay blocked, user must click play");
      });
      setIsPlaying(true);
    }
  };

  const renderProfileCards = (profiles) =>
    profiles.map((p, index) => (
      <div key={index} className="homeprofile-card">
        <img
          src={`${process.env.PUBLIC_URL}/gallery/profiles/${p.image || "placeholder.webp"}`}
          alt={p.name}
          className="homeprofile-img"
          onClick={() =>
            setZoomImage(`${process.env.PUBLIC_URL}/gallery/profiles/${p.image || "placeholder.webp"}`)
          }
          onError={(e) => {
            e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.webp`;
          }}
        />
        <div className="homeprofile-info">
          <span className="homeprofile-name">{p.name}</span>
          <span className="homeprofile-dob">{p.dob}</span>
        </div>
        <Link
          to={p.path}
          className="homeprofile-btn"
          style={{ backgroundColor: p.color }}
        >
          Pictures
        </Link>
      </div>
    ));

  return (
    <div className="home">
      <header className="header my-3">
        <h1>Birthday's Memories</h1>
      </header>

      <div className="profile-list">{renderProfileCards(birthday)}</div>

      <header className="header mt-5">
        <h1>Other's Memories</h1>
      </header>

      <div className="profile-list">{renderProfileCards(other)}</div>

      {/* Zoom modal */}
      {zoomImage && (
        <div className="zoom-modal" onClick={() => setZoomImage(null)}>
          <img
            src={zoomImage}
            alt="Zoomed profile"
            className="zoom-img"
            onError={(e) => {
              e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.webp`;
            }}
          />
        </div>
      )}

      {/* Floating audio button */}
      <button
        style={{
          ...styles.audioBtn,
          ...(isPressed ? styles.audioBtnActive : {}),
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onClick={toggleAudio}
      >
        {isPlaying ? "⏸ Pause Music" : "▶ Play Music"}
      </button>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/gallery/audio/home.mp3`}
        // loop
      />
    </div>
  );
};

const styles = {
  audioBtn: {
    position: "fixed",
    bottom: "5px",
    right: "20px",
    backgroundColor: "#ff4081",
    color: "white",
    border: "none",
    borderRadius: "30px",
    padding: "10px 16px",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    zIndex: 4000,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  audioBtnActive: {
    transform: "scale(0.9)",
    boxShadow: "0 0 15px rgba(255, 64, 129, 0.8)",
  },
};

export default Home;
