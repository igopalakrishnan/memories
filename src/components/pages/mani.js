import React, { useState, useEffect } from "react";

function Mani() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#3498db",
        }}
      >
        Loading ... <br />
        come soon
      </div>
    </>
  );
}

export default Mani;
