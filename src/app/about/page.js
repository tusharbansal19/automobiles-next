"use client";
import { useState } from "react";
import Head from "next/head";
import {
  ChevronDown,
  User,
  Briefcase,
  Phone,
  Info,
  Calendar,
  Star,
} from "lucide-react";
import Image from "next/image";

const MemberCard = ({ name, role, relationship, description, image, Component = "div" }) => {
  const [open, setOpen] = useState(false);

  return (
    <Component className="relative bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Member Image (Left Side) */}
        <div className="w-full md:w-1/3 flex items-center justify-center p-6 bg-gray-50">
          {image && (
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white shadow-md overflow-hidden">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
        {/* Member Info (Right Side) */}
        <div className="p-6 flex-1 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-1">
            <User className="w-6 h-6 text-blue-600" /> {name}
          </h3>
          <p className="text-blue-600 text-sm font-medium mb-3 flex items-center gap-2 uppercase tracking-wide">
            <Briefcase className="w-4 h-4" /> {role} <span className="text-gray-400">•</span> {relationship}
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

          {/* Dropdown Drawer */}
          <div className="mt-auto">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors focus:outline-none group"
            >
              More Details
              <ChevronDown
                className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${open ? "rotate-180" : "group-hover:translate-y-0.5"}`}
              />
            </button>
            {/* Drawer Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
            >
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600" /> +91 9719167530
                </p>
                <p className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500" /> Available for consultation
                </p>
                <p className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" /> Rating: 5.0 / 5
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
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Tushar Automobiles",
    "description": "Learn about Tushar Automobiles - a family-run business with 30+ years of experience in automotive parts and services.",
    "url": "https://tusharautomobiles.me/about",
    "mainEntity": {
      "@type": "AutoPartsStore",
      "name": "Tushar Automobiles",
      "foundingDate": "1990",
      "founder": {
        "@type": "Person",
        "name": "Umesh Kumar Bansal"
      }
    }
  };

  const members = [
    {
      name: "Umesh Kumar Bansal",
      role: "Owner",
      relationship: "Father",
      description: "Founder of Tushar Automobiles, with 30+ years of experience in the automotive industry.",
      image: "/Image/umesh.jpg",
    },
    {
      name: "Tushar Bansal",
      role: "Manager",
      relationship: "Son",
      description: "Leads business operations and customer relations with a focus on excellence.",
      image: "/Image/tushar.jpg",
    },
    {
      name: "Dev Bansal",
      role: "Service Head",
      relationship: "Son",
      description: "Manages the technical team, ensuring top-quality service and customer satisfaction.",
      image: "/Image/dev.jpg",
    },
    {
      name: "Golu Bansal",
      role: "Staff Member",
      relationship: "Staff",
      description: "Supports the service team with expertise in automotive maintenance and repairs.",
      image: "/Image/golu.jpg",
    },
  ];

  return (
    <>
      <Head>
        <title>About Us - Tushar Automobiles</title>
        <meta name="description" content="About Tushar Automobiles" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageStructuredData) }}
        />
      </Head>

      <div className="bg-white min-h-screen text-gray-800 pt-24 md:pt-32 pb-16">

        {/* Business Intro Section */}
        <div className="max-w-4xl mx-auto text-center px-4 mb-16">
          <h5 className="text-red-600 font-bold tracking-widest uppercase mb-4 text-sm">Since 1990</h5>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Driving Excellence <br /> <span className="text-blue-700">Forward</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            Welcome to <span className="font-bold text-gray-900">Tushar Automobiles</span>. We are a family-run business built on trust, quality, and decades of engineering expertise. Our mission is to keep your vehicle running safely and smoothly.
          </p>
          <div className="h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
        </div>

        {/* Top Section with Shop Image */}
        <div className="relative w-full max-w-6xl mx-auto h-64 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl mb-20 px-4 md:px-0">
          <Image
            src="/Image/shopImg.jpg"
            alt="Our Shop"
            fill
            className="object-cover"
            priority={true}
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">The experts behind our quality service and customer satisfaction.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {members.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
