"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaSearch, FaExpand, FaTimes } from 'react-icons/fa';

// Mock Gallery Data
const GALLERY_ITEMS = [
    { id: 1, category: "shop", src: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=800", title: "Main Workshop Floor", desc: "State-of-the-art equipment ready for any job." },
    { id: 2, category: "transformations", src: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&q=80&w=800", title: "Vintage Restoration", desc: "1969 Mustang brought back to life." },
    { id: 3, category: "team", src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800", title: "Expert Mechanics", desc: "Our certified team diagnosing an engine issue." },
    { id: 4, category: "reviews", src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800", title: "Happy Customer", desc: "Another satisfied client driving away." },
    { id: 5, category: "shop", src: "https://images.unsplash.com/photo-1597762139750-e5d32eb7a137?auto=format&fit=crop&q=80&w=800", title: "Spare Parts Inventory", desc: "Fully stocked with genuine parts." },
    { id: 6, category: "transformations", src: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800", title: "Custom Paint Job", desc: "Matte black finish on a luxury sedan." },
    { id: 7, category: "transformations", src: "https://images.unsplash.com/photo-1493238792015-1a7bd2fa2e9e?auto=format&fit=crop&q=80&w=800", title: "Interior Detailing", desc: "Deep cleaning and leather restoration." },
    { id: 8, category: "shop", src: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80&w=800", title: "Diagnostics Bay", desc: "Advanced computer diagnostics in action." },
    { id: 9, category: "team", src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800", title: "Team Briefing", desc: "Morning meeting to ensure quality service." },
];

const CATEGORIES = [
    { id: "all", label: "All Items" },
    { id: "shop", label: "Shop Floor" },
    { id: "transformations", label: "Transformations" },
    { id: "team", label: "Our Team" },
    { id: "reviews", label: "Customer Stories" },
];

export default function GalleryPage() {
    const [filter, setFilter] = useState("all");
    const [selectedImage, setSelectedImage] = useState(null);

    const filteredItems = filter === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.category === filter);

    return (
        <div className="min-h-screen bg-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Our Gallery</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Take a look inside TusharAuto. From our state-of-the-art facility to incredible vehicle transformations, see why we are the experts.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === cat.id
                                    ? "bg-red-600 text-white shadow-lg scale-105"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={item.id}
                                className="group relative cursor-pointer"
                                onClick={() => setSelectedImage(item)}
                            >
                                <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-sm bg-gray-100 relative">
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <FaExpand className="text-gray-900 text-sm" />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative max-w-5xl w-full max-h-[90vh] bg-transparent rounded-lg overflow-hidden flex flex-col items-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    className="w-auto h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                />
                                <div className="mt-4 text-center">
                                    <h2 className="text-2xl font-bold text-white">{selectedImage.title}</h2>
                                    <p className="text-gray-300">{selectedImage.desc}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-0 right-0 m-4 text-white hover:text-red-500 transition-colors bg-black/50 p-2 rounded-full"
                                >
                                    <FaTimes size={24} />
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
