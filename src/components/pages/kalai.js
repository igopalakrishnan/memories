import React, { useState, useEffect, useRef } from "react";

const Kalai = () => {
  const audioRef = useRef(null);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);

  // Unified media list: images + videos
  const media2025 = [
    // Images
    ...Array.from({ length: 35 }, (_, i) => ({
      type: "image",
      src: `${process.env.PUBLIC_URL}/gallery/kalai/2025/img${i + 1}.webp`,
    })),
  ];

  // Toggle audio
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
    } else {
      audio.play().catch(() => {
        console.log("Autoplay blocked, user must click play");
      });
      setIsAudioPlaying(true);
    }
  };

  // Navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : media2025.length - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev < media2025.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex !== null) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "Escape") setCurrentIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  //Swipe gesture in mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      // swipe left → next
      handleNext();
    } else if (diff < -50) {
      // swipe right → prev
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Auto‑play audio when page loads
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch((err) => {
          console.log(
            "Autoplay blocked by browser, user must click play:",
            err,
          );
        });
      // When audio finishes, reset button to Play
      audio.addEventListener("ended", () => {
        setIsAudioPlaying(false);
      });
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "70px", flex: 1 }} className="p-3 pt-1">
        <h3 className="ms-3 mt-4 mb-3">07 October 2025</h3>
        {/* ✅ Gallery */}
        <div style={styles.gallery}>
          {media2025.map((item, index) =>
            item.type === "image" ? (
              <img
                key={index}
                src={item.src}
                alt={`Gallery ${index}`}
                style={styles.image}
                loading="lazy"
                decoding="async"
                onClick={() => setCurrentIndex(index)}
                onError={(e) => {
                  // fallback for webp/jpeg
                  if (e.target.src.endsWith(".webp")) {
                    e.target.src = item.src.replace(".webp", ".jpeg");
                  } else {
                    e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.png`;
                  }
                }}
              />
            ) : (
              <div key={index} style={{ position: "relative" }}>
                <video
                  src={item.src}
                  poster={item.poster}
                  style={styles.image}
                  muted
                  preload="none"
                  onClick={() => setCurrentIndex(index)}
                  // fallback for poster
                  onError={(e) => {
                    e.target.poster = `${process.env.PUBLIC_URL}/gallery/profiles/video-placeholder.webp`;
                  }}
                />
                <span style={styles.playIcon}>▶</span>
              </div>
            ),
          )}
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
          {isAudioPlaying ? "⏸ Pause Music" : "▶ Play Music"}
        </button>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={`${process.env.PUBLIC_URL}/gallery/audio/kalai.mp3`}
        />

        {/* Unified Modal */}
        {currentIndex !== null && (
          <div
            style={styles.modal}
            onClick={(e) => {
              if (e.target === e.currentTarget) setCurrentIndex(null);
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              style={styles.closeBtn}
              onClick={() => setCurrentIndex(null)}
            >
              ✖
            </button>
            <button style={styles.prevBtn} onClick={handlePrev}>
              ◀
            </button>

            {media2025[currentIndex].type === "image" ? (
              <img
                src={media2025[currentIndex].src}
                alt="Enlarged"
                style={styles.modalMedia}
                onError={(e) => {
                  if (e.target.src.endsWith(".webp")) {
                    e.target.src = media2025[currentIndex].src.replace(
                      ".webp",
                      ".jpeg",
                    );
                  } else {
                    e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.webp`;
                  }
                }}
              />
            ) : (
              <video
                src={media2025[currentIndex].src}
                poster={media2025[currentIndex].poster}
                style={styles.modalMedia}
                controls
                autoPlay
                muted
                preload="auto"
                onError={(e) => {
                  e.target.poster = `${process.env.PUBLIC_URL}/gallery/profiles/video-placeholder.webp`;
                }}
              />
            )}

            <button style={styles.nextBtn} onClick={handleNext}>
              ▶
            </button>
          </div>
        )}
      </div>
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
    width: "65px",
    height: "65px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
  },
  playIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "10px",
    color: "white",
    background: "rgba(0,0,0,0.6)",
    borderRadius: "50%",
    padding: "5px 8px",
    pointerEvents: "none",
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
  modalMedia: {
    maxWidth: "70%",
    maxHeight: "80%",
    borderRadius: "8px",
  },
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
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    fontSize: "18px",
  },
  nextBtn: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    fontSize: "18px",
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
    boxShadow: "0 0 15px rgba(255, 64, 129, 0.8)",
  },
};

export default Kalai;
