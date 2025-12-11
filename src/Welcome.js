import React from "react";

export default function Welcome({ onStart }) {
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 text-center"
      style={{
        background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fad0c4 100%)",
        color: "#fff",
        padding: "20px"
      }}
    >
      <div className="d-flex justify-content-center align-items-center">
        <img
          src="/CatAppLogo.png"
          alt="Cat App Logo"
          style={{
            height: "200px",
            width: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
          }}
        />
      </div>

      <h1 className="mb-4 display-6 fw-bold" style={{ textShadow: "2px 2px #ff6a00" }}>
        Welcome to Swipe Cats! 😺
      </h1>

      <p className="mb-4 fs-5 fw-semibold" style={{ color: "#333", textShadow: "1px 1px #fff" }}>
        Swipe right to like a cat, left to pass!
      </p>

      {/* Animated cat GIF */}
      <img
        src="https://cataas.com/cat/gif/says/Henlo?filter=mono&fontColor=orange&fontSize=20&type=square"
        alt="Hello Cat"
        className="img-fluid mb-4 shadow-lg rounded"
        style={{
          maxWidth: "300px",
          borderRadius: "20px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
        }}
      />

      <button
        className="btn btn-warning btn-lg px-5 py-3 fw-bold"
        onClick={onStart}
        style={{
          fontSize: "1.3rem",
          borderRadius: "15px",
          transition: "transform 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        Start Swiping 🐱
      </button>
    </div>
  );
}
