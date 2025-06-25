"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
// c
  return (
    <div className="min-h-screen fixed min-w-screen z-50 bg-black flex flex-col items-center justify-center text-white">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold text-blue-500"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-4 text-xl text-gray-400"
      >
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/")}
        className="mt-8 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-900 transition-all duration-300 shadow-lg"
      >
        Go Back Home
      </motion.button>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute bottom-10 text-gray-500"
      >
        © {new Date().getFullYear()}      Tushar Automobiles and Spare Parts.  All rights reserved.
      </motion.div>
    </div>
  );
}
