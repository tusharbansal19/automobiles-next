"use client";

import { FaCar, FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-600 pt-16 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* About Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/Image/logo.png" alt="Tushar Automobiles" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Your trusted partner for premium automobile parts and expert car services. We ensure your vehicle performs at its best with our quality solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md hover:bg-blue-600 transition-all duration-300 group ring-1 ring-slate-200">
                <FaFacebook className="text-slate-400 group-hover:text-white" size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md hover:bg-pink-600 transition-all duration-300 group ring-1 ring-slate-200">
                <FaInstagram className="text-slate-400 group-hover:text-white" size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md hover:bg-blue-400 transition-all duration-300 group ring-1 ring-slate-200">
                <FaTwitter className="text-slate-400 group-hover:text-white" size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-slate-800 border-b-2 border-blue-600 inline-block pb-1">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Cars', 'Services', 'About Us', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a href={`/${item.toLowerCase().replace(' ', '')}`} className="text-slate-500 hover:text-blue-600 hover:pl-2 transition-all duration-300 text-sm flex items-center group">
                    <span className="mr-2 text-slate-300 group-hover:text-blue-600">›</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-slate-800 border-b-2 border-blue-600 inline-block pb-1">Our Services</h3>
            <ul className="space-y-3">
              {['Engine Repair', 'Tire Replacement', 'Oil Change', 'Battery Check', 'Brake Inspection'].map((item, index) => (
                <li key={index}>
                  <a href="/services" className="text-slate-500 hover:text-blue-600 hover:pl-2 transition-all duration-300 text-sm flex items-center group">
                    <span className="mr-2 text-slate-300 group-hover:text-blue-600">›</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-slate-800 border-b-2 border-blue-600 inline-block pb-1">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                <span className="text-slate-500 text-sm">Bulandshahr Stand, Siyana, <br />BSR, UP, INDIA</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-blue-600 flex-shrink-0" />
                <span className="text-slate-500 text-sm">+91 9719167530</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-blue-600 flex-shrink-0" />
                <span className="text-slate-500 text-sm">tusharbansal3366@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Tushar Automobiles. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-sm text-slate-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
