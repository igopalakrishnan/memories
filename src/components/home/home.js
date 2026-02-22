import React from "react";
import { Link } from "react-router-dom";
import { birthday, other } from "./profiles";
import "./home.css";

const Home = () => {
  const renderProfileCards = (profiles) =>
    profiles.map((p, index) => (
      <div key={index} className="homeprofile-card">
        <img
          src={`/gallery/profiles/${p.image || "placeholder.png"}`}
          alt={p.name}
          className="homeprofile-img"
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
    </div>
  );
};

export default Home;
