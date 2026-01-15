"use client";
import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-100/90 backdrop-blur-sm">
            <div className="relative flex items-center justify-center w-64 h-64">

                {/* Rotating Red Block/Glow Circle */}
                <motion.div
                    className="absolute w-48 h-48 border-t-4 border-l-4 border-red-600 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute w-40 h-40 border-b-4 border-r-4 border-red-400/50 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Central Logo */}
                <div className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg p-4">
                    <img
                        src="/Image/logo.png"
                        alt="Logo"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Pulsing Glow Effect */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-red-100 blur-3xl opacity-20"
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
        </div>
    );
}
