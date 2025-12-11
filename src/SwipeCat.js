import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SwipeCat() {
  const [cats, setCats] = useState([]);
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const animations = useAnimation();
  const preloadedImages = useRef({});

  const loadCats = async () => {
    const arr = Array.from({ length: 20 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      url: `https://cataas.com/cat?rand=${Math.random()}`
    }));

    setCats(arr);
    setIndex(0);
    setLiked([]);
    setShowSummary(false);
  };

  useEffect(() => {
    loadCats();
  }, []);

  useEffect(() => {
    preload(index);
  }, [index]);

  const preload = (idx) => {
    const urls = [
      cats[idx]?.url,
      cats[idx + 1]?.url,
      cats[idx + 2]?.url
    ];

    urls.forEach(url => {
      if (!url) return;
      if (preloadedImages.current[url]) return;

      const img = new Image();
      img.src = url;

      img.onload = () => {
        preloadedImages.current[url] = true;
        if (url === cats[index]?.url) setLoading(false);
      };
    });
  };

  const swipe = async (dir) => {
    // Animate card off-screen
    await animations.start({
      x: dir === "right" ? 500 : -500,
      rotate: dir === "right" ? 25 : -25,
      opacity: 0,
      transition: { duration: 0.3 },
    });

    if (dir === "right") setLiked(prev => [...prev, cats[index]]);

    if (index < cats.length - 1) {
      setIndex(i => i + 1);
      setLoading(true);
    } else setShowSummary(true);

    animations.set({ x: 0, rotate: 0, opacity: 1 });
  };

  if (!cats[index] && !showSummary) return null;

  return (
    <div
      className="container-fluid p-0 d-flex flex-column min-vh-100 text-center"
      style={{
        background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fad0c4 100%)",
        color: "#fff",
      }}
    >
      <div className="py-3 d-flex justify-content-center align-items-center">
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

      <div className="d-flex flex-column justify-content-center align-items-center px-3">

        {!showSummary && (
          <>
            <motion.div
              style={{
                width: "100%",
                maxWidth: 400,
                height: 500,
                aspectRatio: "3/4",
                borderRadius: "25px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                backgroundColor: "#fff",
                cursor: "grab",
                touchAction: "none"
              }}
              animate={animations}
              drag="x"
              dragListener={true}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDrag={(e, info) => {
                if (info.offset.x > 40) setSwipeDirection("right");
                else if (info.offset.x < -40) setSwipeDirection("left");
                else setSwipeDirection(null);
              }}
              onDragEnd={(e, info) => {
                setSwipeDirection(null);
                if (info.offset.x > 120) swipe("right");
                else if (info.offset.x < -120) swipe("left");
                else animations.start({ x: 0, rotate: 0 });
              }}
            >
              {/* Loading */}
              {loading && (
                <div className="position-absolute top-50 start-50 translate-middle">
                  <div className="spinner-border text-warning"></div>
                </div>
              )}
              {/* Swipe Indicator */}
              {swipeDirection === "right" && (
                <div
                  style={{
                    position: "absolute",
                    top: 40,
                    left: 20,
                    padding: "10px 20px",
                    border: "5px solid #4caf50",
                    color: "#4caf50",
                    fontSize: "3rem",
                    fontWeight: "900",
                    transform: "rotate(-20deg)",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.7)",
                    pointerEvents: "none",
                  }}
                >
                  ❤️ LIKE
                </div>
              )}

              {swipeDirection === "left" && (
                <div
                  style={{
                    position: "absolute",
                    top: 40,
                    right: 20,
                    padding: "10px 20px",
                    border: "5px solid #ff1744",
                    color: "#ff1744",
                    fontSize: "3rem",
                    fontWeight: "900",
                    transform: "rotate(20deg)",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.7)",
                    pointerEvents: "none",
                  }}
                >
                  ❌ NOPE
                </div>
              )}
              <img
                key={cats[index].id}
                src={cats[index].url}
                alt="cat"
                onLoad={() => setLoading(false)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "grab",
                  userSelect: "none",
                  pointerEvents:"none"
                }}
              />
            </motion.div>

            {/* Buttons */}
            <div className="d-flex justify-content-center mb-3 mt-3">
              <div className="btn-group shadow-lg" style={{ borderRadius: "15px", overflow: "hidden" }}>
                
                <button
                  className="btn btn-light btn-lg px-4 py-2 fw-bold"
                  style={{ color: "#ff6a00", borderRight: "1px solid #ddd", width:"200px" }}
                  onClick={() => swipe("left")}
                >
                  🙈 Pass
                </button>

                <button
                  className="btn btn-warning btn-lg px-4 py-2 fw-bold"
                  style={{width:"200px"}}
                  onClick={() => swipe("right")}
                >
                  Like ❤️
                </button>

              </div>
            </div>

            {/* Progress bar */}
            <div className="progress w-75" style={{ height: "12px", borderRadius: "10px" }}>
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: `${((index + 1) / cats.length) * 100}%` }}
                aria-valuenow={index + 1}
                aria-valuemin="0"
                aria-valuemax={cats.length}
              ></div>
            </div>
            <p className="mt-2 fw-semibold">{index + 1} / {cats.length}</p>
          </>
        )}

        {showSummary && <Summary liked={liked} onRetry={loadCats} />}
      </div>
    </div>
  );
}

function Summary({ liked, onRetry }) {
  const [selectedCat, setSelectedCat] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let scrollAmount = 0;
    const step = 1;
    const interval = setInterval(() => {
      if (carousel.scrollWidth - carousel.clientWidth <= scrollAmount) {
        scrollAmount = 0;
      } else {
        scrollAmount += step;
      }
      carousel.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }, 20);

    return () => clearInterval(interval);
  }, [liked]);

  // Full-screen preview modal
  const FullscreenModal = ({ cat, onClose }) => (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content position-relative p-0" style={{ background: "rgba(0,0,0,0.9)" }}>
          <button
            className="btn btn-light position-absolute top-0 end-0 m-3"
            style={{ 
              fontSize: "1.5rem", 
              zIndex: 10, 
              backgroundColor: "transparent", 
              border:"none", 
              color:"#fff", 
              boxShadow: "none" 
            }}
            onClick={onClose}
          >
            ❌
          </button>
          <img
            src={cat.url}
            alt="full cat"
            className="w-100 h-auto"
            style={{ objectFit: "contain", maxHeight: "90vh" }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {selectedCat && (
        <FullscreenModal cat={selectedCat} onClose={() => setSelectedCat(null)} />
      )}

      {!selectedCat && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content text-center p-3">

              <div className="modal-header border-0 justify-content-center">
                <h2>🎉 Finished 🎉</h2>
              </div>

              <div className="modal-body d-flex flex-column align-items-center">
                <p style={{ fontSize: "1.2rem" }}>
                  You liked {liked.length} cat{liked.length !== 1 ? "s" : ""}!
                </p>
                {liked.length > 0 && (
                  <p style={{ fontSize: "1.2rem", marginBottom: "10px", fontWeight: "500" }}>
                    Click Image to view Cat ⬇️
                  </p>
                )}

                {liked.length > 0 ? (
                  <div
                    ref={carouselRef}
                    className="d-flex overflow-auto py-3"
                    style={{ gap: "10px", width: "100%", scrollBehavior: "smooth" }}
                  >
                    {liked.map(cat => (
                      <img
                        key={cat.id}
                        src={cat.url}
                        alt="liked cat"
                        className="img-thumbnail"
                        style={{
                          flex: "0 0 auto",
                          width: "180px",
                          height: "180px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          cursor: "pointer"
                        }}
                        onClick={() => setSelectedCat(cat)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 fw-bold text-danger">No cats liked this round 😿</p>
                )}
              </div>

              <div className="modal-footer border-0 justify-content-center">
                <button className="btn btn-success btn-lg px-4 py-2 fw-semibold" onClick={onRetry}>
                  Start Again
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
