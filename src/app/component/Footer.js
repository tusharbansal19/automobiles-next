"use client";

import { FaCar, FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-black to-blue-900 text-blue-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* About Section */}
          
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaCar size={28} className="text-blue-400" />
              <h2 className="text-xl font-semibold">Tushar Automobiles</h2>
            </div>
            <p className="text-sm">
              Your one-stop destination for premium car parts and services. We provide the best solutions for your car needs with top-notch quality and service.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Cars', 'Services', 'Contact'].map((item, index) => (
                <li key={index} className="hover:text-blue-400 transition duration-300 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-400" /> Bulandshahr Stand, Siyana, BSR, UP, INDIA
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-blue-400" /> +91 9719167530
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-400" /> tusharbansal3366@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-800 my-6" />

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          <FaFacebook className="text-blue-400 hover:text-blue-300 transition duration-300 cursor-pointer" size={24} />
          <FaInstagram className="text-blue-400 hover:text-blue-300 transition duration-300 cursor-pointer" size={24} />
          <FaTwitter className="text-blue-400 hover:text-blue-300 transition duration-300 cursor-pointer" size={24} />
        </div>

        {/* Copyright */}
        <p className="text-center text-sm mt-6">
          © {new Date().getFullYear()} Tushar Automobiles. All Rights Reserved.
        </p>
      </div>
    </footer>
    
  );
}
