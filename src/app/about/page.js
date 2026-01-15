"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  FaUserFriends, FaHistory, FaCheckCircle, FaWrench, FaHandshake,
  FaStar, FaClock, FaMedal, FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaOm
} from "react-icons/fa";

// ----------------------------------------------------------------------
// 0. DIVINE SECTION (Ganpati Bappa)
// ----------------------------------------------------------------------
const DivineSection = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 overflow-hidden py-12">

      {/* GLOBAL BACKGROUND PARTICLES */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-amber-400 rounded-full blur-[1px]"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
            y: -150,
            x: Math.random() * 200 - 100
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
          style={{
            width: Math.random() * 8 + 2,
            height: Math.random() * 8 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* CENTERPIECE + TEXT CONTAINER */}
      <div className="relative z-10 flex flex-col items-center text-center w-full">

        {/* --- THE HOLY CENTERPIECE (Rings + Halo + Image) --- */}
        {/* Container Size matches the largest ring to avoid layout shift, but content is absolutely centered */}
        <div className="relative w-[800px] h-[800px] flex items-center justify-center mb-8 max-w-full">

          {/* Ring 1 (Largest) - Reversed Rotation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-[600px] h-[600px] md:w-[750px] md:h-[750px] border-[1px] border-orange-300/40 rounded-full border-dashed"
          />

          {/* Ring 2 (Medium) - Forward Rotation */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] border-[2px] border-red-300/30 rounded-full border-dotted"
          />

          {/* Ring 3 (Inner) - Slow Rotation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] md:w-[480px] md:h-[480px] border-[1px] border-yellow-500/50 rounded-full"
          />

          {/* Glowing Halo Behind Image */}
          <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-to-r from-amber-200 to-orange-300 rounded-full blur-[80px] opacity-60 animate-pulse" />

          {/* The Image Itself - Centered */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.5 }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-[8px] border-yellow-500 shadow-[0_0_60px_rgba(255,165,0,0.8)] overflow-hidden bg-white z-20"
          >
            <Image
              src="/Image/ganpati.jpg"
              alt="Ganpati Bappa"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* --- TEXT CONTENT --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-30 -mt-20" // Negative margin to pull text closer to the rings bottom
        >
          <div className="text-5xl text-orange-600 mb-2 animate-bounce drop-shadow-md flex justify-center">
            <FaOm />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-700 via-red-600 to-amber-600 mb-4 font-hindi leading-tight drop-shadow-sm">
            || श्री गणेशाय नमः ||
          </h1>
          <p className="text-xl md:text-2xl text-orange-900 font-bold max-w-2xl mx-auto leading-relaxed font-hindi drop-shadow-sm px-4">
            "वक्रतुंड महाकाय सूर्यकोटि समप्रभ। <br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 opacity-90">
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent to-orange-500" />
            <span className="text-red-700 font-bold uppercase tracking-widest text-sm">Shubh Aarambh</span>
            <div className="h-0.5 w-24 bg-gradient-to-l from-transparent to-orange-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// 1. HERO SECTION
// ----------------------------------------------------------------------
const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center bg-white overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <span className="text-red-600 font-bold tracking-widest uppercase mb-4 block text-sm">Since 1990</span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              About Our <br /><span className="text-red-600">Automobile Shop</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 border-l-4 border-red-500 pl-6">
              "Serving our city with honest automobile service and genuine spare parts for over 20 years."
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/Image/shopImg.jpg"
              alt="Workshop"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10 skew-x-12 translate-x-20" />
    </section>
  );
};

// ----------------------------------------------------------------------
// 2. SHOP STORY / JOURNEY
// ----------------------------------------------------------------------
const StorySection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Old Photo / Journey Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl border-8 border-white bg-gray-100"
          >
            {/* Using a placeholder if specific old photo not available, or reusing shop image with filter */}
            <Image
              src="/Image/shopImg.jpg"
              alt="Our Journey"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg">
              <p className="text-3xl font-black text-gray-900">30+</p>
              <p className="text-sm text-gray-500 font-bold uppercase">Years of Service</p>
            </div>
          </motion.div>

          {/* Right: Story Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <div className="space-y-8 border-l-2 border-gray-200 pl-8 ml-2">
              <div className="relative">
                <span className="absolute -left-[41px] top-0 w-5 h-5 bg-red-600 rounded-full border-4 border-white shadow-sm"></span>
                <h3 className="text-xl font-bold text-gray-800 mb-2">The Beginning (1990)</h3>
                <p className="text-gray-600 leading-relaxed">
                  Started as a small repair garage with a single bay, serving the local community with dedication and hard work.
                </p>
              </div>
              <div className="relative">
                <span className="absolute -left-[41px] top-0 w-5 h-5 bg-gray-800 rounded-full border-4 border-white shadow-sm"></span>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Expansion & Growth</h3>
                <p className="text-gray-600 leading-relaxed">
                  Expanded our services to include spare parts retail and advanced diagnostics, becoming a trusted name in the city.
                </p>
              </div>
              <div className="relative">
                <span className="absolute -left-[41px] top-0 w-5 h-5 bg-red-600 rounded-full border-4 border-white shadow-sm"></span>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Today</h3>
                <p className="text-gray-600 leading-relaxed">
                  A fully equipped modern workshop with a team of certified experts, serving thousands of satisfied customers annually.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// 3. OWNER INTRODUCTION
// ----------------------------------------------------------------------
const OwnerSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Owner Image */}
            <div className="w-full md:w-1/3 relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-lg border-4 border-gray-100">
                <Image
                  src="/Image/umesh.jpg"
                  alt="Umesh Kumar Bansal"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 bg-red-600 text-white p-3 rounded-lg shadow-lg">
                <FaMedal size={24} />
              </div>
            </div>

            {/* Owner Details */}
            <div className="w-full md:w-2/3">
              <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">The Founder</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Umesh Kumar Bansal</h2>
              <p className="text-lg text-gray-500 font-medium mb-6">Owner & Chief Expert</p>

              <p className="text-gray-600 italic text-lg mb-8 border-l-4 border-red-400 pl-4 bg-gray-50 py-4 pr-4 rounded-r-lg">
                “Customer satisfaction is our first priority. We don't just fix cars; we build relationships built on trust.”
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400 uppercase font-bold">Experience</p>
                  <p className="font-bold text-gray-900">30+ Years</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400 uppercase font-bold">Expertise</p>
                  <p className="font-bold text-gray-900">Engine & Diagnostics</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// 4. FAMILY / TEAM SECTION
// ----------------------------------------------------------------------
const TeamSection = () => {
  const team = [
    { name: "Tushar Bansal", role: "Manager", relation: "Son", img: "/Image/tushar.jpg" },
    { name: "Dev Bansal", role: "Service Head", relation: "Son", img: "/Image/dev.jpg" },
    { name: "Golu Bansal", role: "Staff Member", relation: "Staff", img: "/Image/golu.jpg" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">The dedicated family and staff behind our success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="aspect-[4/5] relative bg-gray-100">
                <Image src={member.img} alt={member.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-sm">Dedicated to providing the best service experience.</p>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-red-600 font-medium text-sm">{member.role}</p>
                <p className="text-gray-400 text-xs mt-1 uppercase tracking-wide">{member.relation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// 5. MISSION & VALUES
// ----------------------------------------------------------------------
const MissionSection = () => {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <h2 className="text-4xl font-black mb-6">Our Mission & Values</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Our mission is simple: To provide honest, high-quality, and affordable automotive services to our community. We believe in transparency and efficiency.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We strive to build long-term relationships with our customers, ensuring that every time they visit, they leave with a smile and a safely running vehicle.
            </p>
          </div>

          {/* Right: Icons Grid */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <FaHandshake />, title: "Honesty", desc: "Transparent pricing & service" },
              { icon: <FaStar />, title: "Quality", desc: "Premium parts & workmanship" },
              { icon: <FaCheckCircle />, title: "Reliability", desc: "Consistent top-tier service" },
              { icon: <FaUserFriends />, title: "Community", desc: "Serving locals for decades" }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                <div className="text-3xl text-red-500 mb-3">{item.icon}</div>
                <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// 6. WHY PEOPLE TRUST US
// ----------------------------------------------------------------------
const TrustSection = () => {
  const points = [
    "20+ Years Experience", "Skilled Mechanics", "Genuine Spare Parts",
    "Local Business", "Affordable Service", "Modern Diagnostics"
  ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-12">Why People Trust Us</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {points.map((text, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                <FaCheckCircle />
              </div>
              <p className="font-bold text-gray-800 text-sm">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// 7. WORKSHOP GALLERY
// ----------------------------------------------------------------------
const GallerySection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Workshop Gallery</h2>
          <p className="text-gray-500">A glimpse into our daily operations.</p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
          <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group">
            <Image src="/Image/shopImg.jpg" alt="Shop Exterior" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <Image src="/Image/gallery_1.jpg" alt="Mechanics Working" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="relative rounded-2xl overflow-hidden group">
            <Image src="/Image/tushar.jpg" alt="Tushar" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden group">
            <Image src="/Image/shopImg.jpg" alt="Inside Workshop" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-bold border-2 border-white px-6 py-2 rounded-full">View All Photos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// 8. CUSTOMER TRUST STATS
// ----------------------------------------------------------------------
const StatsSection = () => {
  return (
    <section className="bg-red-600 py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-8 text-center divide-x divide-white/20">
        <div>
          <p className="text-4xl md:text-5xl font-black mb-2">20+</p>
          <p className="text-sm md:text-lg opacity-90 uppercase tracking-widest font-semibold">Years Experience</p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-black mb-2">5k+</p>
          <p className="text-sm md:text-lg opacity-90 uppercase tracking-widest font-semibold">Happy Customers</p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-black mb-2">100%</p>
          <p className="text-sm md:text-lg opacity-90 uppercase tracking-widest font-semibold">Genuine Parts</p>
        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------------------------
// 9. CALL TO ACTION
// ----------------------------------------------------------------------
const CTASection = () => {
  return (
    <section className="py-24 bg-gray-900 text-center text-white px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-black mb-8">Visit Our Shop Today</h2>
        <p className="text-gray-400 text-lg mb-12">
          Experience the difference of expert care and genuine quality. We are waiting to serve you.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a href="tel:9719167530" className="w-full md:w-auto px-8 py-4 bg-red-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-red-700 transition-all">
            <FaPhoneAlt /> Call Now
          </a>
          <a href="https://wa.me/919719167530" className="w-full md:w-auto px-8 py-4 bg-green-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-green-700 transition-all">
            <FaWhatsapp /> WhatsApp
          </a>
          <a href="/contact#map" className="w-full md:w-auto px-8 py-4 bg-white text-gray-900 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all">
            <FaMapMarkerAlt /> Get Directions
          </a>
        </div>
      </div>
    </section>
  );
};


export default function AboutPage() {
  return (
    <main className="bg-white">
      <DivineSection />
      <HeroSection />
      <StorySection />
      <OwnerSection />
      <TeamSection />
      <MissionSection />
      <TrustSection />
      <GallerySection />
      <StatsSection />
      <CTASection />
    </main>
  );
}
