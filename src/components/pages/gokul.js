import React, { useState, useEffect } from "react";

const Gokul = () => {
  const images2024 = Array.from(
    { length: 4 },
    (_, i) => `/gallery/2024/img${i + 1}.jpg`,
  );

  const images2025 = Array.from(
    { length: 6 },
    (_, i) => `/gallery/2025/img${i + 1}.jpg`,
  );

  const [currentIndex, setCurrentIndex] = useState(null);
  const [activeList, setActiveList] = useState(null); // track which list is open

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : activeList.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < activeList.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
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
      <h3 className="my-3">31 October 2024</h3>
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
          />
        ))}
      </div>

      <h3 className="my-3">31 October 2025</h3>
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
          />
        ))}
      </div>

      {/* Modal */}
      {currentIndex !== null && (
        <div style={styles.modal}>
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
  },
  modalImage: {
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
};

export default Gokul;
