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
import Footer from "./Footer";
import Image from "next/image";

const MemberCard = ({ name, role, relationship, description, image, Component = "div" }) => {
  const [open, setOpen] = useState(false);

  return (
    <Component className="relative bg-blue-950 bg-opacity-20 border border-blue-600 rounded-xl shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-blue-400/50">
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Member Image (Left Side) */}
        <div className="w-full md:w-1/3">
          {image && (
            <div className="flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-blue-950 rounded-full border-4 border-blue-400 shadow-lg overflow-hidden">
              <Image
                src={image}
                alt={name}
                width={192}
                height={192}
                className="w-full h-full object-contain bg-blue-950"
                style={{ aspectRatio: '1/1', objectFit: 'contain', background: '#0f172a' }}
                priority={true}
              />
            </div>
          )}
        </div>

        {/* Member Info (Right Side) */}
        <div className="p-6 flex-1">
          <h3 className="text-2xl font-semibold text-blue-300 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" /> {name}
          </h3>
          <p className="text-blue-400 text-sm mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-500" /> {role} — {relationship}
          </p>
          <p className="text-blue-100">{description}</p>

          {/* Dropdown Drawer */}
          <div className="mt-4">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between w-full text-blue-400 hover:text-blue-300 transition-colors"
            >
              More Info
              <ChevronDown
                className={`w-5 h-5 transform transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Drawer Content */}
            <div
              className={`overflow-hidden transition-max-h duration-500 ${
                open ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 bg-blue-950 bg-opacity-90 rounded-lg text-blue-200 space-y-2">
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
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen text-white  md:flex gap-x-4">
      {/* Top Section with Shop Image */}
      <div className="relative w-full h-80 overflow-hidden rounded-lg">
        <Image
          src="/Image/shopImg.jpg"
          alt="Our Shop"
          width={1200}
          height={400}
          className="w-full h-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
          priority={true}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-blue-400 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none"></div>
      </div>
      <div className="mt-12   px-8 md:px-1">
        <h2 className="text-4xl font-bold text-blue-300 mb-8 text-center">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          {members.map((member, index) => (
            <MemberCard key={index} {...member} />
          ))}
        </div>
      </div>

      {/* Team Section */}
 
    </div>
        // <Footer />
  );
}
