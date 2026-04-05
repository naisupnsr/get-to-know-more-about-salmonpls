import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import fishWithHeart from "./assets/fish-with-heart.jpg";

import "./App.css";

function App() {
  const [position, setPosition] = useState(null);
  const [isResizing, setIsResizing] = useState(false); // Track resize state
  const containerRef = useRef(null);
  const anchorRef = useRef(null);
  const timer = useRef(null);

  const updateHome = () => {
    if (anchorRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const anchorRect = anchorRef.current.getBoundingClientRect();
      setPosition({
        x: anchorRect.left - containerRect.left + anchorRect.width / 2,
        y: anchorRect.top - containerRect.top + anchorRect.height / 2,
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // 1. ปิด Transition ทันทีที่เริ่มขยับจอ
      setIsResizing(true);
      updateHome();

      // 2. ถ้าหยุดขยับจอเกิน 100ms ค่อยเปิด Transition ใหม่
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setIsResizing(false);
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    updateHome(); // คำนวณครั้งแรก

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer.current);
    };
  }, []);

  const moveButton = (e) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    setPosition({
      x: Math.random() * (width - 100) + 50,
      y: Math.random() * (height - 50) + 25,
    });
  };

  const btnStyle =
    "text-[#1900FF] back-white w-100 hover:bg-[#1900FF] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-center block";

  return (
      <section
        ref={containerRef}
        id="center"
        onMouseLeave={updateHome} // <--- พอมือออก ให้วิ่งกลับไปหาจุด Anchor
        className="relative"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}
      >
        <div className="p-5">
          <h1 style={{ fontSize: '2rem', color: '#1900FF'}} className="!m-5">salmonpls!</h1>
          <p >5.9 kg frozen salmon on the shelf</p>
          <p>hobby artist?— fulltime programmer</p>
          <img width="300" height="200" src={fishWithHeart} alt="logo?" />
        </div>

        <div className="flex flex-col items-center gap-4 p-5">
          <a href="https://www.facebook.com/schnenschine" className={btnStyle}>
            Facebook
          </a>
          <a href="https://x.com/salmononweekend" className={btnStyle}>
            Twitter/X
          </a>
          <a href="https://www.instagram.com/schnenschine" className={btnStyle}>
            Instagram
          </a>

          <div ref={anchorRef} className="h-[100px] w-[100px] bg-transparent"></div>
        </div>

        {position && (
          <a
          href="https://youtu.be/dQw4w9WgXcQ?si=bfrWWqPHjLYWIjEs"
          // onClick={}
            onMouseEnter={moveButton}
            style={{
              position: "absolute",
              left: `${position?.x}px`,
              top: `${position?.y}px`,
              transform: "translate(-50%, -50%)",
              transition: isResizing ? "none" : "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              zIndex: 50,
            }}
            className={btnStyle}
          >
          Commission Info          
          </a>
        )}
      </section>
  );
}

export default App;
