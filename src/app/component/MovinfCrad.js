"use client";

import { useState, useRef, useEffect } from "react";

export default function MovingCards() {
  const cards = [
    "https://pngimg.com/uploads/car_bumper/car_bumper_PNG22.png",
    "https://pngimg.com/uploads/headlight/headlight_PNG22.png",
    "https://pngimg.com/uploads/motor_oil/motor_oil_PNG36.png",
    "https://pngimg.com/uploads/car_battery/car_battery_PNG14.png",
    "https://pngimg.com/uploads/tires/tires_PNG31.png",
    "https://pngimg.com/uploads/disc_brake/disc_brake_PNG33.png",
    "https://pngimg.com/uploads/turbo/turbo_PNG27.png"
  ];

  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let animationFrame;

    const updatePosition = () => {
      if (!isPaused) {
        setPosition((prev) => {
          const newPosition = prev - 1;
          const totalWidth = cards.length * 5 * 14 * 1.7; // 16rem per card * 16px per rem
          return newPosition <= -totalWidth ? 0 : newPosition;
        });
      }
      animationFrame = requestAnimationFrame(updatePosition);
    };

    animationFrame = requestAnimationFrame(updatePosition);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused, cards.length]);

  return (
    <div
      className=" "
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on hover out
    >
      <div
        ref={containerRef}
        className="flex space-x-4 md:space-x-6"
        style={{
          width: `calc(16rem * ${cards.length * 2})`,
          transform: `translateX(${position}px)`,
        }}
      >
        {/* Duplicate the cards for a seamless loop */}
        {[...cards, ...cards].map((card, index) => (
          <div
            key={index}
            className="w-[16rem] h-[10rem] sm:w-[10rem] sm:h-[6rem] md:w-[14rem] md:h-[8rem] flex-shrink-0 bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden transform hover:scale-105 transition duration-300 border border-slate-100"
          >
            <img
              src={card}
              alt={`Car ${index + 1}`}
              className="w-full h-full object-contain p-6"
            />
          </div>
        ))}
      </div>
    </div>
  );
}


