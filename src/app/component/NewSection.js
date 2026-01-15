"use client";

import { motion } from "framer-motion";

export default function ServiceSection() {
  const fadeInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeInRight = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Left Side Image (L -> R) */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:w-1/2 h-80 rounded-xl overflow-hidden shadow-xl relative group"
        >
          <img
            src="https://websta.me/wp-content/uploads/2023/09/Aftermarket-Parts-Shop.webp"
            alt="Service"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>

        {/* Right Side Content */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6 relative pl-4 border-l-4 border-blue-500">
            Why Choose Us?
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            We provide top-notch automotive services with a focus on customer satisfaction and quality. Our dedicated team ensures that every vehicle receives the care and attention it deserves.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Premium Quality", "Affordable Rates", "Expert Mechanics"].map((tag, i) => (
              <span
                key={i}
                className={`text-sm px-4 py-2 rounded-full font-medium transition-colors duration-300 ${i === 0 ? "bg-blue-50 text-blue-700 hover:bg-blue-100" :
                  i === 1 ? "bg-green-50 text-green-700 hover:bg-green-100" :
                    "bg-red-50 text-red-700 hover:bg-red-100"
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
        {/* Right Side Image */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:w-1/2 h-80 rounded-xl overflow-hidden shadow-xl relative group"
        >
          <img
            src="https://suzukidutacendana.com/wp-content/uploads/2023/08/part.png"
            alt="Service"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>

        {/* Left Side Content */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6 relative pl-4 border-l-4 border-red-500">
            Expert Services
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Our team of professionals ensures that every aspect of your vehicle is inspected and serviced to perfection. From diagnostics to repair, we do it all.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Fast Service", "Genuine Parts", "Certified Technicians"].map((tag, i) => (
              <span
                key={i}
                className={`text-sm px-4 py-2 rounded-full font-medium transition-colors duration-300 ${i === 0 ? "bg-blue-50 text-blue-700 hover:bg-blue-100" :
                  i === 1 ? "bg-green-50 text-green-700 hover:bg-green-100" :
                    "bg-red-50 text-red-700 hover:bg-red-100"
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Left Side Image */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:w-1/2 h-80 rounded-xl overflow-hidden shadow-xl relative group"
        >
          <img
            src="/Image/logo.png"
            alt="Service"
            className="w-full h-full object-contain p-8 bg-slate-50 transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>

        {/* Right Side Content */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6 relative pl-4 border-l-4 border-slate-700">
            Trusted Solutions
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            We offer trusted solutions for all your automotive needs, ensuring reliability and performance for the long run.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Latest Technology", "Customer Trust", "High Standards"].map((tag, i) => (
              <span
                key={i}
                className={`text-sm px-4 py-2 rounded-full font-medium transition-colors duration-300 ${i === 0 ? "bg-blue-50 text-blue-700 hover:bg-blue-100" :
                  i === 1 ? "bg-green-50 text-green-700 hover:bg-green-100" :
                    "bg-red-50 text-red-700 hover:bg-red-100"
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
