"use client";
import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";

export default function PartDetail() {
  const { part } = useParams();
  const router = useRouter();
  const parts = [
    { name: "Bumper", image: "/Image/bumper.jpg", description: "High-quality car bumper for protection and style.", tags: ["Protection", "Style", "Durable"] },
    { name: "Headlight", image: "/Image/headlight.jpg", description: "Bright and efficient headlights for night driving.", tags: ["Night Vision", "Efficiency", "Safety"] },
    { name: "Mobile Oil", image: "/Image/mobile_oil.jpg", description: "Premium quality mobile oils for engine longevity.", tags: ["Premium", "Performance", "Engine Care"] },
    { name: "Engine Oil", image: "/Image/engine_oil.jpg", description: "Top-grade engine oil for maximum protection.", tags: ["Performance", "Protection", "Engine Care"] },
  ];
  const selected = parts.find(p => p.name === part) || parts[0];

  if (!selected) return <div className="text-white p-8">Part not found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-blue-950 to-blue-900 py-12 px-4">
      <div className="max-w-xl w-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 rounded-2xl shadow-2xl border border-blue-500 p-8 flex flex-col items-center">
        <div className="w-full md:w-1/3">
          <Image
            src={selected.image}
            alt={selected.name}
            width={300}
            height={200}
            className="w-full h-full object-cover rounded-lg"
            priority={true}
          />
        </div>
        <h1 className="text-4xl font-bold text-blue-200 mb-2 text-center">{selected.name}</h1>
        <p className="text-blue-100 text-lg mb-4 text-center">{selected.description}</p>
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {selected.tags && selected.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:scale-105 transition-transform duration-300">
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => router.back()}
          className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-900 transition"
        >
          Back to Services
        </button>
      </div>
    </div>
  );
} 