"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, X, Search } from "lucide-react";
import PartsSection from "../component/productSection";
import { useRouter } from 'next/navigation';

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const parts = [
    { name: "Bumper", image: "/Image/bumper.jpg", description: "High-quality car bumper for protection and style.", tags: ["Protection", "Style", "Durable"] },
    { name: "Headlight", image: "/Image/headlight.jpg", description: "Bright and efficient headlights for night driving.", tags: ["Night Vision", "Efficiency", "Safety"] },
    { name: "Mobile Oil", image: "/Image/mobile_oil.jpg", description: "Premium quality mobile oils for engine longevity.", tags: ["Premium", "Performance", "Engine Care"] },
    { name: "Engine Oil", image: "/Image/engine_oil.jpg", description: "Top-grade engine oil for maximum protection.", tags: ["Performance", "Protection", "Engine Care"] },
  ];
  const filteredParts = parts.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Galaxy Background Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-[#001f3f] to-[#002b5c] p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.7),_rgba(0,31,63,0.4))] opacity-60 pointer-events-none" />

        {/* Heading and Brief Description */}
        <div className="text-center text-gray-300 mb-12 z-10 relative">
          <h1 className="text-4xl font-extrabold text-white mb-3 mt-20">
            Explore Our Premium Auto Parts
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Discover a wide range of high-quality automobile parts designed to enhance performance and longevity. 
            Find exactly what you need with ease.
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full mx-auto mt-10 relative z-10">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search parts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-12 p-3 bg-gradient-to-r from-[#002b5c] to-[#001f3f] border border-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Dropdown Recommendations */}
            {searchTerm && filteredParts.length > 0 && (
              <ul className="absolute z-10 left-0 top-[40px] right-0 mt-2 bg-[#0a0a0a] border border-gray-700 rounded-lg shadow-lg overflow-hidden max-w-[500px]">
                {filteredParts.map((part) => (
                  <li
                    key={part.name}
                    onClick={() => setSearchTerm(part.name)}
                    className="cursor-pointer px-4 py-2 text-gray-300 hover:bg-[#002b5c] hover:text-white transition"
                  >
                    {part.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Card Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredParts.map((part, index) => (
              <div
                key={part.name}
                onClick={() => {
                  router.push(`/services/${encodeURIComponent(part.name)}`);
                }}
                className={`cursor-pointer group relative bg-gradient-to-r from-[#002b5c] to-[#001f3f] rounded-2xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:rotate-[360deg] duration-[800ms] border-l-4 border-r-4 border-blue-500`}
              >
                {/* Image */}
                <Image
                  src={part.image}
                  alt={part.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                  priority
                />

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {part.name}
                  </h3>
                  <p className="text-gray-400">{part.description}</p>

                  {/* More Info Button */}
                  <button
                    className="mt-2 text-blue-400 hover:text-blue-500 flex items-center"
                  >
                    More Info <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Parts Section */}
          <div className="w-full mt-20">
            <PartsSection />
          </div>
        </div>
      </div>
    </div>
  );
}
