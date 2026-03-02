import React, { useState, useEffect, useRef } from "react";

const Shiva = () => {
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);

  // Media for 2023
  const media2023 = [
    {
      type: "video",
      src: `${process.env.PUBLIC_URL}/gallery/video/shiva/2023.mp4`,
      poster: `${process.env.PUBLIC_URL}/gallery/shiva/2023/video-thumb.webp`,
    },
    ...Array.from({ length: 21 }, (_, i) => ({
      type: "image",
      src: `${process.env.PUBLIC_URL}/gallery/shiva/2023/img${i + 1}.webp`,
    })),
  ];
  // Media for 2024
  const media2024 = [
    {
      type: "video",
      src: `${process.env.PUBLIC_URL}/gallery/video/shiva/2024-1.mp4`,
      poster: `${process.env.PUBLIC_URL}/gallery/shiva/2024/video-thumb1.webp`,
    },
    {
      type: "video",
      src: `${process.env.PUBLIC_URL}/gallery/video/shiva/2024-2.mp4`,
      poster: `${process.env.PUBLIC_URL}/gallery/shiva/2024/video-thumb2.webp`,
    },
    {
      type: "video",
      src: `${process.env.PUBLIC_URL}/gallery/video/shiva/2024-3.mp4`,
      poster: `${process.env.PUBLIC_URL}/gallery/shiva/2024/video-thumb3.webp`,
    },
    {
      type: "video",
      src: `${process.env.PUBLIC_URL}/gallery/video/shiva/2024-4.mp4`,
      poster: `${process.env.PUBLIC_URL}/gallery/shiva/2024/video-thumb4.webp`,
    },
    ...Array.from({ length: 114 }, (_, i) => ({
      type: "image",
      src: `${process.env.PUBLIC_URL}/gallery/shiva/2024/img${i + 1}.webp`,
    })),
  ];
  // Media for 2025
  const media2025 = [
    ...Array.from({ length: 79 }, (_, i) => ({
      type: "image",
      src: `${process.env.PUBLIC_URL}/gallery/shiva/2025/img${i + 1}.webp`,
    })),
  ];

  // Unified media list across years
  const mediaAll = [...media2023, ...media2024, ...media2025];

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
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mediaAll.length - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev < mediaAll.length - 1 ? prev + 1 : 0));
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
  // Swipe gesture
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
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
    <div>
      <h3 className="ms-3 mt-4 mb-3">06 November 2023</h3>
      <div style={styles.gallery}>
        {media2023.map((item, index) =>
          item.type === "image" ? (
            <img
              key={index}
              src={item.src}
              alt={`2023 Gallery ${index}`}
              style={styles.image}
              loading="lazy"
              decoding="async"
              onClick={() => setCurrentIndex(index)}
              onError={(e) => {
                // fallback for webp/jpeg
                if (e.target.src.endsWith(".webp")) {
                  e.target.src = item.src.replace(".webp", ".jpeg");
                } else {
                  e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.webp`;
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
      <h3 className="ms-3 mt-4 mb-3">06 November 2024</h3>
      <div style={styles.gallery}>
        {media2024.map((item, index) =>
          item.type === "image" ? (
            <img
              key={index}
              src={item.src}
              alt={`2024 Gallery ${index}`}
              style={styles.image}
              loading="lazy"
              decoding="async"
              onClick={() => setCurrentIndex(media2023.length + index)}
              onError={(e) => {
                // fallback for webp/jpeg
                if (e.target.src.endsWith(".webp")) {
                  e.target.src = item.src.replace(".webp", ".jpeg");
                } else {
                  e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.webp`;
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
                onClick={() => setCurrentIndex(media2023.length + index)}
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
      <h3 className="ms-3 mt-4 mb-3">06 November 2025</h3>
      <div style={styles.gallery}>
        {media2025.map((item, index) =>
          item.type === "image" ? (
            <img
              key={index}
              src={item.src}
              alt={`2024 Gallery ${index}`}
              style={styles.image}
              loading="lazy"
              decoding="async"
              onClick={() =>
                setCurrentIndex(media2023.length + media2024.length + index)
              }
              onError={(e) => {
                // fallback for webp/jpeg
                if (e.target.src.endsWith(".webp")) {
                  e.target.src = item.src.replace(".webp", ".jpeg");
                } else {
                  e.target.src = `${process.env.PUBLIC_URL}/gallery/profiles/placeholder.webp`;
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
                onClick={() =>
                  setCurrentIndex(media2023.length + media2024.length + index)
                }
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
        src={`${process.env.PUBLIC_URL}/gallery/audio/shiva.mp3`}
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
          <button style={styles.closeBtn} onClick={() => setCurrentIndex(null)}>
            ✖
          </button>
          <button style={styles.prevBtn} onClick={handlePrev}>
            ◀
          </button>
          {mediaAll[currentIndex].type === "image" ? (
            <img
              src={mediaAll[currentIndex].src}
              alt="Enlarged"
              style={styles.modalMedia}
              onError={(e) => {
                if (e.target.src.endsWith(".webp")) {
                  e.target.src = mediaAll[currentIndex].src.replace(
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
              src={mediaAll[currentIndex].src}
              poster={mediaAll[currentIndex].poster}
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
    boxShadow: "0 0 31px rgba(255, 64, 129, 0.8)",
  },
};

export default Shiva;
