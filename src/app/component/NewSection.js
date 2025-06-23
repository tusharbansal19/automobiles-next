"use client";

import { motion } from "framer-motion";

export default function ServiceSection() {
  const fadeInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="mt-16 px-4 md:px-12 space-y-16">
      {/* Section 1 */}
      <div className="flex gap-x-4 w-full">
        {/* Left Side Image (L -> R) */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative w-full md:w-[50%]  hidden  sm:flex h-64 overflow-hidden rounded-lg"
        >
          <img
            src="https://websta.me/wp-content/uploads/2023/09/Aftermarket-Parts-Shop.webp"
            alt="Service"
            className="w-full h-full object-cover rounded-lg border  border-blue-500 transition-transform duration-500 hover:scale-105 hover:border-blue-400"
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-blue-400 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none"></div>
        </motion.div>

        {/* Right Side Content */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center md:w-[50%] gap-x-5 bg-blue-950 bg-opacity-20 p-8 rounded-xl shadow-lg border border-blue-600"
        >
          <div className="text-white">
            <h2 className="text-3xl font-bold text-blue-300 mb-4">Why Choose Us?</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              We provide top-notch automotive services with a focus on customer satisfaction and quality. Our dedicated team ensures that every vehicle receives the care and attention it deserves.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Premium Quality", "Affordable Rates", "Expert Mechanics"].map((tag, i) => (
                <span
                  key={i}
                  className={`text-sm px-3 py-1 rounded-full font-semibold bg-opacity-20 transition-colors duration-300 ${
                    i === 0 ? "bg-blue-400 hover:bg-blue-500" :
                    i === 1 ? "bg-green-400 hover:bg-green-500" :
                    "bg-red-400 hover:bg-red-500"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section 2 */}
      <div className="flex gap-x-4 w-full">
        {/* Left Side Content */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:w-[50%] items-center gap-x-5 bg-blue-950 bg-opacity-20 p-8 rounded-xl shadow-lg border border-blue-600"
        >
          <div className="text-white">
            <h2 className="text-3xl font-bold text-blue-300 mb-4">Expert Services</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              Our team of professionals ensures that every aspect of your vehicle is inspected and serviced to perfection.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Fast Service", "Genuine Parts", "Certified Technicians"].map((tag, i) => (
                <span
                  key={i}
                  className={`text-sm px-3 py-1 rounded-full font-semibold bg-opacity-20 transition-colors duration-300 ${
                    i === 0 ? "bg-blue-400 hover:bg-blue-500" :
                    i === 1 ? "bg-green-400 hover:bg-green-500" :
                    "bg-red-400 hover:bg-red-500"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side Image (R -> L) */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative w-full md:w-[50%] hidden  sm:flex h-64 overflow-hidden rounded-lg"
        >
          <img
            src="https://img.freepik.com/premium-photo/close-up-car-engine-with-colorful-glow_901275-8348.jpg"
            alt="Service"
            className="w-full h-full object-cover rounded-lg border border-blue-500 transition-transform duration-500 hover:scale-105 hover:border-blue-400"
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-blue-400 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none"></div>
        </motion.div>
      </div>

      {/* Section 3 */}
      <div className="flex gap-x-4 w-full">
        {/* Left Side Image (L -> R) */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative w-full md:w-[50%] hidden  sm:flex h-64 overflow-hidden rounded-lg"
        >
          <img
            src="https://www.shutterstock.com/image-photo/lighting-car-middle-ambient-background-600nw-2301248061.jpg"
            alt="Service"
            className="w-full h-full object-cover rounded-lg border border-blue-500 transition-transform duration-500 hover:scale-105 hover:border-blue-400"
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-blue-400 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none"></div>
        </motion.div>

        {/* Right Side Content */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-x-5 md:w-[50%] bg-blue-950 bg-opacity-20 p-8 rounded-xl shadow-lg border border-blue-600"
        >
          <div className="text-white">
            <h2 className="text-3xl font-bold text-blue-300 mb-4">Trusted Solutions</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              We offer trusted solutions for all your automotive needs, ensuring reliability and performance.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Latest Technology", "Customer Trust", "High Standards"].map((tag, i) => (
                <span
                  key={i}
                  className={`text-sm px-3 py-1 rounded-full font-semibold bg-opacity-20 transition-colors duration-300 ${
                    i === 0 ? "bg-blue-400 hover:bg-blue-500" :
                    i === 1 ? "bg-green-400 hover:bg-green-500" :
                    "bg-red-400 hover:bg-red-500"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
