import React, { useState } from "react";
import { Link } from "react-router-dom";
import { birthday, other, basePath } from "./profiles";
import "./home.css";

const Home = () => {
  const [zoomImage, setZoomImage] = useState(null);

  const renderProfileCards = (profiles) =>
    profiles.map((p, index) => (
      <div key={index} className="homeprofile-card">
        <img
          src={`${basePath}${p.image || "placeholder.png"}`}
          alt={p.name}
          className="homeprofile-img"
          onClick={() =>
            setZoomImage(`${basePath}${p.image || "placeholder.png"}`)
          }
          onError={(e) => {
            e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.png`;
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
              e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.png`;
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
