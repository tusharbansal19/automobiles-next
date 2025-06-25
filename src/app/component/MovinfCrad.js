"use client";

import { useState, useRef, useEffect } from "react";

export default function MovingCards() {
  const cards = [
    "/Image/cardi1.jpg",
        "/Image/cardi2.webp",
        "/Image/cardi2.jpg",
        "/Image/cardi4.jpg",
        "/Image/cardi6.jpg",
        

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
          const totalWidth = cards.length * 5 * 14*1.7; // 16rem per card * 16px per rem
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
            className="w-[16rem] h-[10rem] sm:w-[10rem] sm:h-[6rem] md:w-[14rem] md:h-[8rem] flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img
              src={card}
              alt={`Car ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";

// export default function MovingCards() {
//   const cards = [
//     "/Image/cardi1.jpg",
//     "/Image/cardi2.webp",
//     "/Image/cardi2.jpg",
//     "/Image/cardi4.jpg",
//     "/Image/cardi6.jpg",
//   ];

//   const containerRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const [cardWidth, setCardWidth] = useState(0);

//   useEffect(() => {
//     if (containerRef.current) {
//       const card = containerRef.current.children[0];
//       if (card) setCardWidth(card.offsetWidth);
//     }
//   }, []);

//   useEffect(() => {
//     let animationFrame;

//     const updatePosition = () => {
//       if (!isPaused) {
//         containerRef.current.style.transition = "none";
//         containerRef.current.style.transform = `translateX(-${cardWidth}px)`;

//         setTimeout(() => {
//           containerRef.current.appendChild(
//             containerRef.current.children[0]
//           );
//           containerRef.current.style.transition = "none";
//           containerRef.current.style.transform = `translateX(0)`;
//         }, 300); // Adjust to smooth out transition
//       }

//       animationFrame = requestAnimationFrame(updatePosition);
//     };

//     animationFrame = requestAnimationFrame(updatePosition);

//     return () => cancelAnimationFrame(animationFrame);
//   }, [isPaused, cardWidth]);

//   return (
//     <div
//       className="overflow-hidden relative"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       <div
//         ref={containerRef}
//         className="flex gap-4"
//         style={{
//           width: `${cardWidth * cards.length * 2}px`,
//         }}
//       >
//         {[...cards, ...cards].map((card, index) => (
//           <div
//             key={index}
//             className="w-[16rem] h-[10rem] sm:w-[10rem] sm:h-[6rem] md:w-[14rem] md:h-[8rem] flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
//           >
//             <Image
//               src={card}
//               alt={`Car ${index + 1}`}
//               width={288}
//               height={192}
//               className="w-full h-full object-cover"
//               priority
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
