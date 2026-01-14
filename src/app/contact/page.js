"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.error('Please fix the errors.', { position: 'top-right' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://grabeats-server.onrender.com/user/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      if (response.ok) {
        toast.success("Message sent successfully!", { position: "top-right" });
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        toast.error("Failed to send message.", { position: "top-right" });
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Try again.", { position: "top-right" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-50 min-h-screen pt-24 pb-12 px-4 sm:px-8 text-gray-800">

        {/* Header Section */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">We are here to help. Reach out to us for any service inquiries or parts availability.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left Section: Info & Map */}
          <div className="space-y-12 slide-in opacity-0 -translate-x-10 transition-all duration-700 ease-out">

            {/* Contact Details */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-4">Contact Information</h2>
              <div className="space-y-6 text-gray-700">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Owner</span>
                  <span className="text-xl font-medium">Umesh Kumar Bansal</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Phone</span>
                  <div className="flex gap-4 mt-1">
                    <a href="tel:+919719167530" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">+91 9719167530</a>
                    <span className="text-gray-300">|</span>
                    <a href="tel:+919084970968" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">+91 9084970968</a>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Address</span>
                  <p className="text-lg leading-snug mt-1">
                    Bulandshahr Stand, Siyana, <br /> Bulandshahar, UP
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-200">
              <iframe
                title="Google Map"
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d279.0306814528439!2d78.0547344!3d28.6240976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b6529b8b665c9%3A0x62e65ac685562995!2sTushar%20Automobile%20%26%20Spare%20Parts!5e0!3m2!1sen!2sin!4v1710150351161!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 h-fit">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
            <p className="text-gray-500 mb-8 mb-8">Fill out the form below and we will get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}