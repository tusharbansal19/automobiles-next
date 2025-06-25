"use client";

import { lazy, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const parts = [
  { 
    name: "Bumper", 
    // image: "eadlight", 
    image: "/Image/bumper.jpg", 
    description: "High-quality car bumper for protection and style.",
    tags: ["Protection", "Style", "Durable"]
  },
  { 
    name: "Headlight", 
    image: "/Image/headlight.jpg", 
    description: "Bright and efficient headlights for night driving.",
    tags: ["Night Vision", "Efficiency", "Safety"]
  },
  { 
    name: "Mobile Oil", 
    image: "/Image/mobile_oil.jpg", 
    description: "Premium quality mobile oils for engine longevity.",
    tags: ["Premium", "Performance", "Engine Care"]
  },
  { 
    name: "Engine Oil", 
    image: "/Image/engine_oil.jpg", 
    description: "Top-grade engine oil for maximum performance.",
    tags: ["Performance", "Protection", "Engine Care"]
  },
];

export default function PartsSection() {
  const [likedParts, setLikedParts] = useState({});
  const router = useRouter();

  const toggleLike = (name) => {
    setLikedParts((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="bg-gradient-to-br from-black via-[#001f3f] to-[#002b5c] py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-white text-center mb-12"
        >
          Explore Our Featured Parts
        </motion.h2>

        {/* Parts Cards */}
        <div className="grid grid-cols-1  sm:grid-cols-2 gap-8 md:gap-12">
          {parts.map((part, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }} // Bottom-to-top animation
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1, // Cascading delay
                duration: 0.5,
                ease: "easeOut",
              }}
              viewport={{ once: true }} // ✅ Triggers only once
              className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-[#002b5c] to-[#001f3f] rounded-2xl overflow-hidden shadow-lg border-l-4 border-r-4 border-blue-500 hover:scale-105 transition-transform duration-500 hover:shadow-[0px_0px_30px_#1e90ff] max-h-[300px]"
              onClick={() => {
                router.push(`/services/${encodeURIComponent(part.name)}`);
              }}
            >
              {/* Left Side - Image */}
              <div className="w-full md:w-1/3">
                <Image
                loading="lazy"
                  src={part.image}
                  alt={part.name}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                  // priority
                />
              </div>

              {/* Right Side - Content */}
              <div className="w-full md:w-2/3 p-4 md:p-6">
                {/* Title and Like Button */}
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-white">
                    {part.name}
                  </h3>
                  {/* Like Button */}
                  <button onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(part.name);
                  }}>
                    <Heart
                      className={`w-6 h-6 transition ${
                        likedParts[part.name]
                          ? "text-red-500 fill-red-500 scale-110"
                          : "text-gray-500 hover:text-red-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-400 mt-2 leading-relaxed">
                  {part.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {part.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        i % 3 === 0
                          ? "bg-red-600 text-white"
                          : i % 3 === 1
                          ? "bg-green-600 text-white"
                          : "bg-blue-600 text-white"
                      } hover:scale-105 transition-transform duration-300`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
