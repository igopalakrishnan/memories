import React, { useState, useEffect, useRef } from "react";

// ✅ Base path logic
const basePath =
  process.env.NODE_ENV === "production" ? "/memories/gallery/" : "/gallery/";

const Ajith = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [activeList, setActiveList] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
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

  const images2024 = Array.from(
    { length: 4 },
    (_, i) => `${basePath}gokul/2024/img${i + 1}.jpg`,
  );

  const images2025 = Array.from(
    { length: 14 },
    (_, i) => `${basePath}gokul/2025/img${i + 1}.jpg`,
  );

  const handleSwipe = (endX) => {
    if (touchStartX === null) return;
    const diff = touchStartX - endX;
    if (diff > 50) {
      // swipe left → next image
      handleNext();
    } else if (diff < -50) {
      // swipe right → previous image
      handlePrev();
    }
    setTouchStartX(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : activeList.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < activeList.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex !== null) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "Escape") {
          setCurrentIndex(null);
          setActiveList(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, activeList]);

  return (
    <div>
      <h3 className="ms-3 mt-4 mb-3">31 October 2024</h3>
      <div style={styles.gallery}>
        {images2024.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`2024 Gallery ${index}`}
            style={styles.image}
            loading="lazy"
            onClick={() => {
              setCurrentIndex(index);
              setActiveList(images2024);
            }}
            // 👇 First fallback: try .jpeg if .jpg fails
            onError={(e) => {
              if (e.target.src.endsWith(".jpg")) {
                e.target.src = src.replace(".jpg", ".jpeg");
              } else {
                // 👇 Second fallback: placeholder if both fail
                e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.png`;
              }
            }}
          />
        ))}
      </div>

      <h3 className="ms-3 mt-4 mb-3">31 October 2025</h3>
      <div style={styles.gallery}>
        {images2025.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`2025 Gallery ${index}`}
            style={styles.image}
            loading="lazy"
            onClick={() => {
              setCurrentIndex(index);
              setActiveList(images2025);
            }}
            // 👇 First fallback: try .jpeg if .jpg fails
            onError={(e) => {
              if (e.target.src.endsWith(".jpg")) {
                e.target.src = src.replace(".jpg", ".jpeg");
              } else {
                // 👇 Second fallback: placeholder if both fail
                e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.png`;
              }
            }}
          />
        ))}
      </div>

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
        src={`${process.env.PUBLIC_URL}/gallery/audio/ajith.mp3`}
        // loop
      />

      {currentIndex !== null && (
        <div
          style={styles.modal}
          onClick={(e) => {
            // Close only if user clicks on the overlay itself
            if (e.target === e.currentTarget) {
              setCurrentIndex(null);
              setActiveList(null);
            }
          }}
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => handleSwipe(e.changedTouches[0].clientX)}
        >
          <button
            style={styles.closeBtn}
            onClick={() => {
              setCurrentIndex(null);
              setActiveList(null);
            }}
          >
            ✖
          </button>
          <button style={styles.prevBtn} onClick={handlePrev}>
            ◀
          </button>
          <img
            src={activeList[currentIndex]}
            alt="Enlarged"
            style={styles.modalImage}
            onError={(e) => {
              if (e.target.src.endsWith(".jpg")) {
                e.target.src = activeList[currentIndex].replace(
                  ".jpg",
                  ".jpeg",
                );
              } else {
                e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.png`;
              }
            }}
          />

          <button style={styles.nextBtn} onClick={handleNext}>
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  gallery: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  image: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    zIndex: 3000,
  },
  modalImage: { maxWidth: "70%", maxHeight: "80%", borderRadius: "8px" },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
  },
  prevBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },
  nextBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },
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
    // quick shrink
    boxShadow: "0 0 15px rgba(255, 64, 129, 0.8)",
    // glowing pink
  },
};

export default Ajith;
