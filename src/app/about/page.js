"use client";
import { useState } from "react";
import {
  ChevronDown,
  User,
  Briefcase,
  Phone,
  Info,
  Calendar,
  Star,
} from "lucide-react";
// import Footer from "./Footer";

const MemberCard = ({ name, role, relationship, description, image, Component = "div" }) => {
  const [open, setOpen] = useState(false);

  return (
    <Component className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 bg-opacity-80 border border-blue-600 rounded-2xl shadow-xl overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-blue-400/50">
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Member Image (Left Side) */}
        <div className="w-full md:w-1/3 flex items-center justify-center p-6 md:p-0">
          {image && (
            <div className="flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-blue-950 rounded-full border-4 border-blue-400 shadow-lg overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-contain bg-blue-950"
                style={{ aspectRatio: '1/1', objectFit: 'contain', background: '#0f172a' }}
              />
            </div>
          )}
        </div>
        {/* Member Info (Right Side) */}
        <div className="p-6 flex-1 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-200 flex items-center gap-2 mb-1">
            <User className="w-6 h-6 text-blue-400" /> {name}
          </h3>
          <p className="text-blue-400 text-sm mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-500" /> {role} — {relationship}
          </p>
          <p className="text-blue-100 mb-2">{description}</p>
          {/* Dropdown Drawer */}
          <div className="mt-2">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between w-full text-blue-300 hover:text-blue-200 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg px-2 py-1"
            >
              More Info
              <ChevronDown
                className={`w-5 h-5 ml-2 transform transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {/* Drawer Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ${open ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
            >
              <div className="p-4 bg-blue-950 bg-opacity-95 rounded-lg text-blue-200 space-y-2 border border-blue-700 shadow-md">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" /> Contact: +91 123-456-7890
                </p>
                <p className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400" /> Available for consultation
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" /> Joined: Jan 2020
                </p>
                <p className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" /> Rating: 4.8 / 5
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Component>
  );
};

export default function AboutUs() {
  const members = [
    {
      name: "Umesh Kumar Bansal",
      role: "Owner",
      relationship: "Father",
      description:
        "Founder of Tushar Automobiles, with 30+ years of experience in the automotive industry.",
      image: "/Image/umesh.jpg",
    },
    {
      name: "Tushar Bansal",
      role: "Manager",
      relationship: "Son",
      description:
        "Leads business operations and customer relations with a focus on excellence.",
      image: "/Image/tushar.jpg",
    },
    {
      name: "Dev Bansal",
      role: "Service Head",
      relationship: "Son",
      description:
        "Manages the technical team, ensuring top-quality service and customer satisfaction.",
      image: "/Image/dev.jpg",
    },
    {
      name: "Golu Bansal",
      role: "Staff Member",
      relationship: "Staff",
      description:
        "Supports the service team with expertise in automotive maintenance and repairs.",
      image: "/Image/golu.jpg",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen text-white flex flex-col items-center pt-8 px-2 pb-8">
      {/* Business Intro Section */}
      <div className="max-w-3xl w-full mx-auto text-center mb-10 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-200 mb-4 mt-10 drop-shadow-lg"> Tushar Automobiles</h1>
        <p className="text-lg md:text-2xl text-blue-100 mb-2">
          Welcome to <span className="text-blue-400 font-bold">Tushar Automobiles & Spare Parts</span>! We are a family-run business with a passion for quality, trust, and customer satisfaction. With decades of experience, we provide top-notch automotive parts and services to our valued customers.
        </p>
        <p className="text-md md:text-lg text-blue-300">
          Our mission is to keep your vehicles running smoothly and safely, while delivering a friendly, reliable experience every time you visit us.
        </p>
      </div>
      {/* Top Section with Shop Image */}
      <div className="relative w-full max-w-4xl h-56 md:h-96 overflow-hidden rounded-2xl shadow-2xl mb-12">
        <img
          src="/Image/shopImg.jpg"
          alt="Our Shop"
          className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-blue-400 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none"></div>
      </div>
      {/* Team Section */}
      <div className="w-full max-w-5xl mx-auto px-2 md:px-0">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-300 mb-8 text-center drop-shadow">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {members.map((member, index) => (
            <MemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
}
