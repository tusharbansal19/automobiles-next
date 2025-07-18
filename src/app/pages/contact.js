"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line @next/next/no-img-element

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      console.log(formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-r mt-20 from-black to-blue-950 min-h-screen text-white py-8 px-2 sm:px-4 md:px-8">
      {/* Contact Details Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left Section */}
        <div>
          <h2 className="text-4xl font-bold text-blue-300 mb-6 animate-fadeIn hover:scale-105 transition-transform duration-300">
            Contact Us
          </h2>
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-semibold text-blue-400 hover:text-blue-500 transition duration-300">
                Shop Name:
              </span>{" "}
              Tushar Automobiles
            </p>
            <p className="text-lg">
              <span className="font-semibold text-blue-400 hover:text-blue-500 transition duration-300">
                Owner:
              </span>{" "}
              Umesh Kumar Bansal
            </p>
            <p className="text-lg">
              <span className="font-semibold text-blue-400 hover:text-blue-500 transition duration-300">
                Contact No:
              </span>{" "}
              <a
                href="tel:+919719167530"
                className="hover:text-blue-300 transition duration-300 ease-in-out"
              >
                +91 9719167530
              </a>{" "}
              /{" "}
              <a
                href="tel:+919084970968"
                className="hover:text-blue-300 transition duration-300 ease-in-out"
              >
                +91 9084970968
              </a>
            </p>
            <p className="text-lg">
              <span className="font-semibold text-blue-400 hover:text-blue-500 transition duration-300">
                Address:
              </span>{" "}
              Bulandshahr Stand, Siyana, Bulandshahar
            </p>
          </div>
        </div>

        {/* Right Section - Interactive Image */}
        <div className="w-full">
          <iframe
            title="Tushar Automobile & Spare Parts"
            className="w-full h-56 sm:h-72 rounded-lg shadow-lg border border-blue-500 hover:shadow-xl transition-shadow duration-300 ease-in-out"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d279.0306814528439!2d78.0547344!3d28.6240976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b6529b8b665c9%3A0x62e65ac685562995!2sTushar%20Automobile%20%26%20Spare%20Parts!5e0!3m2!1sen!2sin!4v1710150351161!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="mt-10 bg-blue-950 bg-opacity-20 p-4 sm:p-8 rounded-xl shadow-lg border border-blue-600 transition-transform transform hover:-translate-y-1">
        <h3 className="text-2xl font-semibold text-blue-300 mb-6">
          Send us a message
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Image */}
          <div className="hidden md:flex items-center justify-center">
            <img
              src="https://th.bing.com/th/id/OIP.ABZDYb1aT89tuZw5boXZcQHaG0?rs=1&pid=ImgDetMain"
              alt="Contact Illustration"
              className="w-full max-w-xs h-auto rounded-lg shadow-lg border border-blue-500 hover:scale-105 transition duration-300"
            />
          </div>

          {/* Right Side - Form */}
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-blue-400 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-blue-950 text-white border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:-translate-y-1 text-base sm:text-lg"
                placeholder="Your Name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-blue-400 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-blue-950 text-white border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:-translate-y-1 text-base sm:text-lg"
                placeholder="Your Email"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-blue-400 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 bg-blue-950 text-white border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:-translate-y-1 text-base sm:text-lg"
                placeholder="Your Message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-transform transform hover:scale-105 duration-300 text-base sm:text-lg"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
