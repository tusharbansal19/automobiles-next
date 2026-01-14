"use client";

import { motion } from "framer-motion";
import { FaCar, FaTools, FaShieldAlt, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaQuoteLeft, FaCheckCircle, FaChevronRight, FaChevronLeft, FaThumbsUp, FaShare, FaReply, FaSearch, FaUser, FaCrown } from "react-icons/fa";
import Link from 'next/link';
import ServiceSection from "./NewSection";
import MovingCards from "./MovinfCrad";
import { useState } from "react";

// Dummy Data for Reviews
const REVIEWS_DATA = [
  {
    id: 1,
    product: "Full Engine Tune-up",
    rating: 4.5,
    reviewCount: 12,
    title: "Very smooth engine performance",
    text: "My car feels completely different after the tune-up. The engine is smooth and the mileage has improved significantly. Highly recommend their diagnostic team.",
    user: "Kamlesh",
    time: "2 days ago",
    likes: 5
  },
  {
    id: 2,
    product: "Brake Pad Replacement",
    rating: 4.8,
    reviewCount: 190,
    title: "Excellent safety upgrade",
    text: "I have been using these ceramic pads for a week now. The stopping power is incredible and there is no noise. Great safety feature integration.",
    user: "Satish Kumar G",
    time: "2 days ago",
    likes: 12
  },
  {
    id: 3,
    product: "Synthetic Oil Change",
    rating: 3.9,
    reviewCount: 626,
    title: "Good value but wait time was long",
    text: "The oil quality is great, engine runs cooler. However, I had to wait a bit longer than expected for the service to complete.",
    user: "Mustkim",
    time: "2 days ago",
    likes: 0
  }
];

// Dummy Data for Q&A
const QA_DATA = [
  {
    question: "How many years of warranty on new battery?",
    answer: "For our premium heavy-duty batteries, we offer a standard 3-year replacement warranty. You can also extend this to 5 years with our protection plan.",
    user: "Dillip",
    role: "Expert",
    time: "1 day ago",
    helpful: 4
  },
  {
    question: "Honda Civic 2022 servicing cost?",
    answer: "Regarding your query on the Honda Civic 2022, a standard service including oil change and filter replacement typically starts at $150. For a comprehensive breakdown, please visit our pricing page.",
    user: "Dillip",
    role: "Expert",
    time: "1 day ago",
    helpful: 2
  },
  {
    question: "Why is the green coolant not available?",
    answer: "The Green coolant is currently out of stock due to high demand. We recommend the Universal Blue coolant as a compatible alternative for most models.",
    user: "Dillip",
    role: "Expert",
    time: "1 day ago",
    helpful: 1
  }
];

// Top Contributors
const CONTRIBUTORS = [
  { name: "Balaji", reviews: 1, likes: 30 },
  { name: "Sehaj", reviews: 1, likes: 27 },
  { name: "Anil", reviews: 1, likes: 7 },
];

export default function HomePage() {
  const [activeReview, setActiveReview] = useState(0);

  return (
    <div className="bg-white text-gray-900 font-sans">

      {/* 1. HERO SECTION WRAPPER */}
      <div className="relative w-full pt-[150px]">
        {/* Main Background: Slant White Top / Gray Bottom */}
        <div className="absolute inset-0 z-0 h-full w-full bg-gray-50">
          <div className="absolute top-0 left-0 w-full h-[80%] bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }} />
        </div>

        <section className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">

            {/* Main Big Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-gray-100 rounded-xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-center shadow-sm group"

            >
              {/* Dual Slant Background Effect */}
              <div className="absolute inset-y-0 left-0 w-[120%] bg-white transform -skew-x-12 -translate-x-24 z-0" />
              <div className="absolute inset-y-0 right-0 w-[40%] bg-gray-200/50 transform -skew-x-12 translate-x-12 z-0" />


              <div className="relative z-10 max-w-xl">
                <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-600 font-bold text-sm tracking-wider mb-6">PREMIUM AUTO CARE</span>
                <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                  Elevate Your <br />
                  <span className="text-red-600">Driving Experience</span>
                </h1>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Expert maintenance, genuine parts, and certified mechanics. We treat your car like our own.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/services" className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 hover:shadow-red-600/30 transition-all flex items-center gap-2">
                    Book Service <FaChevronRight size={12} />
                  </Link>
                  <Link href="/contact" className="px-8 py-3 bg-white text-gray-900 border border-gray-200 font-bold rounded-lg hover:bg-gray-50 transition-all">
                    Contact Us
                  </Link>
                </div>
              </div>
              <img src="/Image/carHome.jpg" alt="Hero Car" className="absolute bottom-[-10%] right-[-10%] w-[60%] object-contain opacity-20 md:opacity-100 mix-blend-multiply z-0 pointer-events-none" />
            </motion.div>

            {/* Right Column: 2 Small Cards */}
            <div className="lg:col-span-1 flex flex-col gap-6 h-full">
              {/* Top Small Card */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 bg-gray-900 text-white rounded-xl p-8 flex flex-col justify-center relative overflow-hidden shadow-sm"
              >
                <h3 className="text-2xl font-bold mb-2">Emergency?</h3>
                <p className="text-gray-400 mb-6 text-sm">24/7 Roadside Assistance available.</p>
                <Link href="/contact" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <FaPhoneAlt color="white" />
                </Link>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-red-600/20 rounded-full blur-2xl" />
              </motion.div>

              {/* Bottom Small Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex-1 bg-red-50 rounded-xl p-8 flex flex-col justify-center items-start text-left relative overflow-hidden shadow-sm border border-red-100"
              >
                <div className="bg-white p-3 rounded-xl mb-4 shadow-sm text-red-600">
                  <FaStar size={24} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">4.9/5</h3>
                <p className="text-gray-500 text-sm font-medium">Customer Satisfaction Rating</p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. INFO BAR */}
      <div className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-wrap justify-between gap-8 md:gap-4 items-center text-center md:text-left">
          {[
            { icon: <FaTools />, label: "Expert Mechanics", sub: "Certified Team" },
            { icon: <FaShieldAlt />, label: "Warranty Included", sub: "On All Parts" },
            { icon: <FaCar />, label: "Genuine Parts", sub: "100% Authentic" },
            { icon: <FaCheckCircle />, label: "Same Day Service", sub: "Fast & Reliable" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center md:justify-start gap-4 flex-1 min-w-[200px]">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-red-600 text-xl shadow-sm">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{item.label}</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 2.5. BRANDS SECTION */}
        <section className="py-16 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Brands We Service</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Maruti Suzuki", url: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Maruti_Suzuki_logo.svg" },
                { name: "Hyundai", url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg" },
                { name: "Honda", url: "https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg" },
                { name: "Tata", url: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg" },
                { name: "Mahindra", url: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Mahindra_Auto_logo.svg" },
                { name: "Toyota", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg" },
                { name: "Volkswagen", url: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg" },
                { name: "Kia", url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Kia_logo.svg" },
                { name: "Renault", url: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Renault_2021_Textless.svg" },
                { name: "Ford", url: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg" },
                { name: "Mercedes-Benz", url: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Benz_logo.svg" },
                { name: "Skoda", url: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Skoda_Auto_logo_%282011%29.svg" }
              ].map((brand, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center border border-gray-100 h-32">
                  <img
                    src={brand.url}
                    alt={brand.name}
                    className="h-12 w-auto max-w-full object-contain mb-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
                  />
                  <span className="hidden text-xs font-bold text-gray-400 uppercase tracking-widest">{brand.name[0]}</span>
                  <span className="text-xs font-semibold text-gray-900 mt-2">{brand.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/services" className="text-sm font-bold text-blue-600 hover:text-blue-800 underline">View All Brands</Link>
            </div>
          </div>
        </section>
      </div>

      {/* 3. ABOUT */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-100 rounded-full z-0" />
            <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800" alt="About Workshop" className="rounded-3xl shadow-2xl relative z-10 w-full object-cover h-[500px]" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gray-100 rounded-3xl -z-10 hidden md:block" />
            <div className="absolute bottom-8 right-8 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs">
              <p className="text-4xl font-black text-red-600 mb-1">30+</p>
              <p className="text-gray-600 font-medium leading-tight">Years of delivering excellence in automotive care.</p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-red-600 font-bold tracking-widest text-sm uppercase mb-2 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">We Are The <br /> Auto Experts</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded with a passion for engineering and customer service, TusharAuto has grown into a premier destination for vehicle maintenance. We combine traditional craftsmanship with modern technology to ensure your vehicle performs at its best.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              From routine oil changes to complex engine diagnostics, our certified team is dedicated to transparency and quality.
            </p>
            <Link href="/about" className="inline-flex items-center text-red-600 font-bold hover:text-red-700 group">
              Read More About Us <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Comprehensive solutions for every aspect of your vehicle's health.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Engine Diagnostics", icon: <FaTools />, desc: "Advanced computer diagnostics to identify issues quickly." },
            { title: "Brake & Suspension", icon: <FaCar />, desc: "Safety first. Expert repair for your braking systems." },
            { title: "Oil & Fluids", icon: <FaStar />, desc: "Premium synthetic oils to keep your engine running smooth." },
            { title: "Tire Services", icon: <FaCheckCircle />, desc: "Installation, balancing, and alignment for a smooth ride." },
            { title: "Battery Replacement", icon: <FaTools />, desc: "High-performance batteries installed while you wait." },
            { title: "Custom Upgrades", icon: <FaShieldAlt />, desc: "Performance parts and aesthetic modifications." },
          ].map((service, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-4">{service.desc}</p>
              <Link href="/services" className="text-sm font-bold text-gray-400 group-hover:text-red-600 flex items-center">
                Learn more <FaChevronRight className="ml-1 text-xs" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRODUCTS (MovingCards) */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-between items-end">
          <div>
            <span className="text-red-600 font-bold uppercase tracking-wider text-sm">Shop Parts</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">Certified Spare Parts</h2>
          </div>
          <Link href="/services" className="hidden md:block text-gray-500 hover:text-red-600 font-bold transition-colors">
            View All Products
          </Link>
        </div>
        <MovingCards />
      </section>

      {/* 6. WHY US (ServiceSection) */}
      <div className="py-12 bg-gray-50">
        <ServiceSection />
      </div>

      {/* 7. REVIEWS: Detailed Card Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-10">Latest User Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {/* Navigation Buttons Pattern from Image (Visible on sides if implemented as carousel, here static grid) */}
            <button className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-16 bg-gray-100 text-gray-400 hover:bg-gray-200 flex items-center justify-center rounded-r-lg z-10 hidden lg:flex">
              <FaChevronLeft size={20} />
            </button>
            <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-16 bg-gray-100 text-gray-400 hover:bg-gray-200 flex items-center justify-center rounded-l-lg z-10 hidden lg:flex">
              <FaChevronRight size={20} />
            </button>

            {REVIEWS_DATA.map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[320px]">
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 truncate pr-2">{review.product}</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded flex items-center gap-1">
                      {review.rating} <FaStar size={10} />
                    </span>
                    <span className="text-sm text-blue-600 hover:underline cursor-pointer">{review.reviewCount} reviews</span>
                  </div>

                  {/* Content */}
                  <h4 className="text-sm font-bold text-gray-800 mb-2">About {review.product}</h4>
                  <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">
                    {review.text}
                  </p>
                  <button className="text-sm text-blue-600 mt-1 hover:underline">Read More</button>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-gray-500 text-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 hover:text-gray-700">
                        <FaThumbsUp className="text-gray-400" /> {review.likes}
                      </button>
                      <span className="text-xs text-gray-400">|</span>
                      <div className="flex flex-col">
                        <a href="#" className="text-gray-800 font-medium hover:underline text-xs">{review.user}</a>
                        <span className="text-[10px] text-gray-400">{review.time}</span>
                      </div>
                    </div>
                  </div>

                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <FaShare className="text-gray-400" /> Share
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/reviews" className="text-blue-600 font-semibold hover:underline">Read All Reviews</Link>
          </div>
        </div>
      </section>

      {/* 8. QUESTIONING SECTION: Community & Q&A */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Community & Contributors */}
            <div className="space-y-6">
              {/* Join Community Card */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Join the TusharAuto Community</h3>
                  <p className="text-xs text-gray-500 mb-4">India's largest automotive community</p>
                  <button className="px-6 py-2 bg-white text-gray-900 text-sm font-bold border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors">
                    Explore Now
                  </button>
                </div>
                {/* Abstract BG shapes */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-red-100 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
              </div>

              {/* Top Contributors Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-gray-900 font-bold mb-4 flex items-center justify-between">
                  Last Month Top Contributors
                </h3>
                <div className="space-y-4">
                  {CONTRIBUTORS.map((contributor, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          <FaUser />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900 flex items-center gap-1">
                            {contributor.name}
                            {idx === 0 && <FaCrown className="text-yellow-400 text-xs" />}
                          </p>
                          <p className="text-[10px] text-gray-400">{contributor.reviews} Reviews | {contributor.likes} Likes</p>
                        </div>
                      </div>
                      <FaCheckCircle className="text-blue-500 text-xs" title="Verified" />
                    </div>
                  ))}
                </div>
                <button className="w-full text-center text-blue-600 text-sm font-semibold mt-4 hover:underline">View More</button>
              </div>
            </div>

            {/* Right Column: Q&A List */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Questions and Answers</h2>

              {/* Search Bar */}
              <div className="relative mb-8">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Type your question"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all shadow-sm"
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-100">
                  <div className="w-1/3 h-full bg-yellow-400" />
                </div>
              </div>

              {/* Q&A Items */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-100">
                {QA_DATA.map((qa, index) => (
                  <div key={index} className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-start gap-2">
                      <span className="text-gray-400">Q.</span> {qa.question}
                    </h3>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500">
                        <FaUser />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-gray-700">{qa.user}</span>
                          {qa.role === "Expert" && <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1"><FaCheckCircle size={8} /> Expert</span>}
                          <span className="text-xs text-gray-400">| {qa.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                          {qa.answer}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                          <button className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                            <FaThumbsUp /> Helpful ({qa.helpful})
                          </button>
                          <button className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                            <FaReply /> Reply
                          </button>
                          <button className="ml-auto flex items-center gap-1 hover:text-red-600 transition-colors">
                            <FaCheckCircle className="text-gray-300 hover:text-red-600" /> Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link href="/community" className="text-sm text-gray-500 hover:text-gray-800 hover:underline">View all questions</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. MAP */}
      <section className="py-0 grid grid-cols-1 lg:grid-cols-2 h-[500px]">
        <div className="bg-gray-900 p-12 lg:p-24 flex flex-col justify-center text-white">
          <h2 className="text-4xl font-black mb-6">Quick Visit</h2>
          <p className="text-gray-400 mb-8 max-w-md">Our workshop is conveniently located in the heart of the city. Drop by for a cup of coffee and a quick inspection.</p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-red-500 text-xl mt-1" />
              <div>
                <h5 className="font-bold text-lg">Main Workshop</h5>
                <p className="text-gray-400">Tushar Automobile & Spare Parts, Siyana, Uttar Pradesh 203412</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-red-500 text-xl mt-1" />
              <div>
                <h5 className="font-bold text-lg">Contact Direct</h5>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full bg-gray-200 relative">
          {/* Placeholder Map Image */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1545.6983827531778!2d78.0547183!3d28.6240976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b6529b8b665c9%3A0x62e65ac685562995!2sTushar%20Automobile%20%26%20Spare%20Parts!5e0!3m2!1sen!2sin!4v1703670000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="grayscale opacity-80 hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </section>

      {/* 10. CTA */}
      <section className="bg-red-600 py-16 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to upgrade your ride?</h2>
        <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">Book an appointment today and get 15% off your first comprehensive service.</p>
        <Link href="/contact" className="px-10 py-4 bg-white text-red-600 font-bold rounded-xl shadow-xl hover:bg-gray-100 transition-transform hover:-translate-y-1 inline-block">
          Schedule Appointment
        </Link>
      </section>

    </div>
  );
}
