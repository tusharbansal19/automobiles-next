"use client";

import { motion } from "framer-motion";
import { FaCar, FaShoppingCart, FaTag, FaTools } from "react-icons/fa";
import Footer from "./Footer";
import ServiceSection from "./NewSection";
import MovingCards from "./MovinfCrad";

export default function HomePage() {
  
  return (
    <>
      {/* Background Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full overflow-x-hidden h-screen bg-gradient-to-r from-black to-blue-950"
      >
        {/* Background Car Image */}
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          src="/Image/carHome.jpg"
          alt="Car"
          className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 hover:scale-105"
        />

        {/* Main Content */}{}
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center h-full text-center text-white px-4 relative"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-wide mb-4 drop-shadow-lg"
          >
            {"Tushar Automobiles and Spare Parts".split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-2">
                {word.split("").map((letter, j) => (
                  <span
                    key={j}
                    className="inline-block transition-colors duration-300 hover:text-blue-400 hover:scale-110"
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-2xl text-blue-200"
          >
            Your one-stop destination for premium car parts and services.
          </motion.p>

          <div className="absolute bottom-0">
            <MovingCards />
          </div>
        </motion.div>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12 mt-12"
      >
        {[
          {
            id: 1,
            title: "Car Services",
            icon: <FaCar size={24} className="text-blue-400" />,
            desc: "Comprehensive car servicing to keep your vehicle in top condition.",
            img:"https://th.bing.com/th/id/OIP.0G9GzV-e_39xarLUIW7N0gHaE8?w=218&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7"
          },
          {
            id: 2,
            title: "Auto Parts",
            icon: <FaTools size={24} className="text-blue-400" />,
            desc: "High-quality auto parts and accessories for all car models.",
            img:'https://img.freepik.com/premium-photo/new-car-parts-dark-background_127657-7232.jpg'
          },
          {
            id: 3,
            title: "Affordable Price",
            icon: <FaShoppingCart size={24} className="text-blue-400" />,
            desc: "Exclusive discounts and deals on car services and parts.",
            img:"https://thumbs.dreamstime.com/b/affordable-prices-text-green-black-round-stamp-sign-written-267882265.jpg"
          },
          {
            id: 4,
            title: "Exclusive Deals",
            icon: <FaTag size={24} className="text-blue-400" />,
            desc: "Get the best deals on premium car parts and accessories. Don't miss out!",
            img:""
          },
        ].map((card, index) => (
          <motion.div
            key={card.id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`bg-white bg-opacity-10 border border-blue-500 rounded-xl p-6 shadow-lg transition-transform duration-500 hover:scale-105 hover:shadow-blue-500/50 hover:-translate-y-2 
              ${card.id === 4 ? "hidden md:block lg:hidden" : ""}`}
          >
            <div className="flex items-center mb-4">
              {card.icon}
              <h2 className="text-xl font-semibold text-blue-300 ml-2">
                {card.title}
              </h2>
            </div>
            {card.img && (
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-40 max-w-[200px] object-cover rounded-lg mb-4 transition-transform duration-500 hover:scale-110"
              />
            )}
            <p className="text-blue-100">{card.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Service Section */}
      <ServiceSection />

      {/* Why Choose Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 px-4 md:px-12 mb-20"
      >
        <div className="bg-blue-950 bg-opacity-20 p-8 rounded-xl shadow-lg border border-blue-600">
          <h2 className="text-3xl font-bold text-blue-300 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-blue-100 leading-relaxed mb-6">
            At Tushar Automobiles, we offer the best quality spare parts and
            automotive services to keep your car running smoothly. Our
            experienced team ensures top-notch customer satisfaction with every
            visit.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Premium Quality",
              "Affordable Rates",
              "Expert Mechanics",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -50 : 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-blue-400 bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-blue-300 text-xl font-bold">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-1">
                    {item}
                  </h3>
                  <p className="text-blue-100">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent viverra nunc at sem facilisis.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer */}

    </>
  );
}
