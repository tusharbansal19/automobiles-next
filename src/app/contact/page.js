"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Trigger slide-in effect on load
    document.querySelectorAll(".slide-in").forEach((el) => {
      el.classList.add("opacity-100", "translate-x-0");
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = 'Enter a valid email.';
    if (!formData.message) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error('Please correct the errors below.', {
        position: 'top-right',
        style: {
          background: 'linear-gradient(90deg, #0f2027 0%, #2c5364 100%)',
          color: '#aee7ff',
          border: '1px solid #3b82f6',
          boxShadow: '0 0 20px #3b82f6, 0 0 40px #0ea5e9',
        },
        icon: '⚠️',
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://grabeats-server.onrender.com/user/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      if (response.ok) {
        toast.success("Message sent successfully!", {
          position: "top-right",
          style: {
            background: "linear-gradient(90deg, #0f2027 0%, #2c5364 100%)",
            color: "#aee7ff",
            border: "1px solid #3b82f6",
            boxShadow: "0 0 20px #3b82f6, 0 0 40px #0ea5e9",
          },
          icon: "🚀",
        });
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        toast.error("Failed to send message. Try again later.", {
          position: "top-right",
          style: {
            background: "linear-gradient(90deg, #0f2027 0%, #2c5364 100%)",
            color: "#aee7ff",
            border: "1px solid #3b82f6",
            boxShadow: "0 0 20px #3b82f6, 0 0 40px #0ea5e9",
          },
          icon: "❌",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send message. Try again later.", {
        position: "top-right",
        style: {
          background: "linear-gradient(90deg, #0f2027 0%, #2c5364 100%)",
          color: "#aee7ff",
          border: "1px solid #3b82f6",
          boxShadow: "0 0 20px #3b82f6, 0 0 40px #0ea5e9",
        },
        icon: "❌",
      });
    }
  };

  return (
    <>
      <ToastContainer />
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
        <div className="mt-12 bg-blue-950 bg-opacity-20 p-8 rounded-xl shadow-lg border border-blue-600 transition-transform transform hover:-translate-y-1 hover:shadow-xl animate-fadeIn relative">
          <h3 className="text-2xl font-semibold text-blue-300 mb-6">
            Send us a message
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side - Image */}
            <div className="hidden md:flex items-center justify-center">
              <Image
                src="https://th.bing.com/th/id/OIP.ABZDYb1aT89tuZw5boXZcQHaG0?rs=1&pid=ImgDetMain"
                alt="Contact Illustration"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg border border-blue-500 hover:scale-105 transition duration-300"
                priority={true}
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
                  className={`w-full px-4 py-2 bg-blue-950 text-white border ${errors.name ? 'border-red-500' : 'border-blue-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 transition duration-300`}
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1 animate-fadeInLeft">{errors.name}</p>}
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
                  className={`w-full px-4 py-2 bg-blue-950 text-white border ${errors.email ? 'border-red-500' : 'border-blue-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 transition duration-300`}
                  placeholder="Your Email"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1 animate-fadeInLeft">{errors.email}</p>}
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
                  className={`w-full px-4 py-2 bg-blue-950 text-white border ${errors.message ? 'border-red-500' : 'border-blue-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 transition duration-300`}
                  placeholder="Your Message"
                ></textarea>
                {errors.message && <p className="text-red-400 text-sm mt-1 animate-fadeInLeft">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-transform transform hover:scale-110 duration-300 hover:shadow-blue-400 hover:shadow-lg flex items-center justify-center gap-2 relative"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-blue-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="#60a5fa" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      <span className="text-blue-100 font-semibold animate-pulse">Sending...</span>
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}