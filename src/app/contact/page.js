"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    // Trigger slide-in effect on load
    document.querySelectorAll(".slide-in").forEach((el) => {
      el.classList.add("opacity-100", "translate-x-0");
    });
  }, []);

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
    <div className="bg-gradient-to-r mt-20 from-black to-blue-950 min-h-screen text-white py-12 px-4 sm:px-8">
      {/* Contact Details Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section */}
        <div className="opacity-0 translate-x-[-20px] transition-all duration-700 ease-in-out slide-in">
          <h2 className="text-4xl font-bold text-blue-300 mb-6 animate-bounce">
            Contact Us
          </h2>
          <div className="space-y-4">
  {/* Shop Name */}
  <p className="text-lg">
    <span className="font-semibold text-blue-400 hover:text-blue-500 transition duration-300 inline-block transform origin-top hover:rotate-[360deg]">
      Shop Name:
    </span>{" "}
    <span className="hover:font-bold hover:text-xl transition duration-300">
      Tushar Automobiles
    </span>
  </p>

  {/* Owner */}
  <p className="text-lg">
    <span className="font-semibold text-blue-400 hover:text-blue-500 transition duration-300 inline-block transform origin-top hover:rotate-[360deg]">
      Owner:
    </span>{" "}
    <span className="hover:font-bold hover:text-xl transition duration-300">
      Umesh Kumar Bansal
    </span>
  </p>

  {/* Contact No */}
  <p className="text-lg">
    <span className="font-semibold text-blue-400 hover:text-blue-500 transition duration-300 inline-block transform origin-top hover:rotate-[360deg]">
      Contact No:
    </span>{" "}
    <a
      href="tel:+919719167530"
      className="hover:font-bold hover:text-xl hover:text-blue-300 transition duration-300 ease-in-out"
    >
      +91 9719167530
    </a>{" "}
    /{" "}
    <a
      href="tel:+919084970968"
      className="hover:font-bold hover:text-xl hover:text-blue-300 transition duration-300 ease-in-out"
    >
      +91 9084970968
    </a>
  </p>

  {/* Address */}
  <p className="text-lg">
    <span className="font-semibold text-blue-400 hover:text-blue-500 transition duration-300 inline-block transform origin-top hover:rotate-[360deg]">
      Address:
    </span>{" "}
    <span className="hover:font-bold hover:text-xl transition duration-300">
      Bulandshahr Stand, Siyana, Bulandshahar
    </span>
  </p>
</div>

        </div>

        {/* Right Section - Interactive Map */}
        <iframe
          title="Tushar Automobile & Spare Parts"
          className="w-full h-72 rounded-lg shadow-lg border border-blue-500 hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d279.0306814528439!2d78.0547344!3d28.6240976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b6529b8b665c9%3A0x62e65ac685562995!2sTushar%20Automobile%20%26%20Spare%20Parts!5e0!3m2!1sen!2sin!4v1710150351161!5m2!1sen!2sin"
          // allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact Form Section */}
      <div className="mt-12 bg-blue-950 bg-opacity-20 p-8 rounded-xl shadow-lg border border-blue-600 transition-transform transform hover:-translate-y-1 hover:shadow-xl animate-fadeIn">
        <h3 className="text-2xl font-semibold text-blue-300 mb-6">
          Send us a message
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Image */}
          <div className="hidden md:flex items-center justify-center">
            <img
              src="https://th.bing.com/th/id/OIP.ABZDYb1aT89tuZw5boXZcQHaG0?rs=1&pid=ImgDetMain"
              alt="Contact Illustration"
              className="w-full h-auto rounded-lg shadow-lg border border-blue-500 hover:scale-105 transition duration-300"
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
                className="w-full px-4 py-2 bg-blue-950 text-white border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 transition duration-300"
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
                className="w-full px-4 py-2 bg-blue-950 text-white border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 transition duration-300"
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
                className="w-full px-4 py-2 bg-blue-950 text-white border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 transition duration-300"
                placeholder="Your Message"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-transform transform hover:scale-110 duration-300 hover:shadow-blue-400 hover:shadow-lg"
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