"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaFilter, FaSearch, FaExpand, FaTimes, FaPlay, FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// ----------------------------------------------------------------------
// MOCK DATA
// ----------------------------------------------------------------------
const GALLERY_ITEMS = [
    { id: 1, category: "workshop", src: "/Image/shopImg.jpg", title: "Main Workshop Floor", desc: "State-of-the-art equipment ready for any job." },
    { id: 2, category: "services", src: "/Image/cat_engine.jpg", title: "Engine Diagnostics", desc: "Advanced computer diagnostics in action." },
    { id: 3, category: "team", src: "/Image/team.jpg", title: "Expert Mechanics", desc: "Our certified team diagnosing an engine issue." },
    { id: 4, category: "customers", src: "/Image/happy-beautiful-asian-shopaholic-woman-260nw-1278669220.webp", title: "Happy Customer", desc: "Another satisfied client driving away." },
    { id: 5, category: "spares", src: "/Image/cat_brakes.jpg", title: "Genuine Spare Parts", desc: "Fully stocked with genuine parts." },
    { id: 6, category: "transformations", src: "/Image/cardi1.jpg", title: "Custom Paint Job", desc: "Matte black finish on a luxury sedan." },
    { id: 7, category: "transformations", src: "/Image/cardi4.jpg", title: "Interior Detailing", desc: "Deep cleaning and leather restoration." },
    { id: 8, category: "services", src: "/Image/cat_oil.jpg", title: "Oil Change Bay", desc: "Quick and efficient oil service." },
    { id: 9, category: "team", src: "/Image/dev.jpg", title: "Service Head", desc: "Ensuring quality in every repair." },
    { id: 10, category: "workshop", src: "/Image/gallery_1.jpg", title: "Heavy Duty Lifts", desc: "Capable of lifting SUVs and trucks." },
    { id: 11, category: "customers", src: "/Image/customer_delivery_1.jpg", title: "Key Handover", desc: "The best moment of the day." }, 
    { id: 12, category: "spares", src: "/Image/cat_lights.jpg", title: "Lighting Upgrades", desc: "Premium LED installations." },
];

const CATEGORIES = [
    { id: "all", label: "All Items" },
    { id: "workshop", label: "Workshop" },
    { id: "services", label: "Services" },
    { id: "spares", label: "Spare Parts" },
    { id: "transformations", label: "Before/After" },
    { id: "team", label: "Team" },
    { id: "customers", label: "Happy Clients" },
];

// ----------------------------------------------------------------------
// 1. HERO SECTION
// ----------------------------------------------------------------------
const GalleryHero = () => {
    return (
        <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
             {/* Background Image with Parallax-like fixed attachment */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/Image/shopImg.jpg" 
                    alt="Gallery Hero" 
                    fill 
                    className="object-cover brightness-[0.3]"
                    priority
                />
            </div>
            
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-4 block"
                >
                    Our Portfolio
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
                >
                    Our Gallery
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                >
                    A glimpse of our world-class workshop, precision engineering, and the smiles of our satisfied customers.
                </motion.p>
            </div>
        </section>
    );
};

// ----------------------------------------------------------------------
// 3. MAIN GALLERY GRID (Masonry)
// ----------------------------------------------------------------------
const MasonryGrid = ({ items, onSelect }) => {
    return (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout'>
                {items.map((item) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        key={item.id}
                        className="group relative cursor-pointer break-inside-avoid"
                        onClick={() => onSelect(item)}
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-md bg-gray-100 aspect-[4/3]">
                            <Image
                                src={item.src}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                <span className="text-red-400 text-xs font-bold uppercase tracking-wider mb-1">{item.category}</span>
                                <h3 className="text-white text-xl font-bold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                                <p className="text-gray-300 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-2">{item.desc}</p>
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    <FaExpand size={14} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

// ----------------------------------------------------------------------
// 5. BEFORE & AFTER SECTION
// ----------------------------------------------------------------------
const BeforeAfterSection = () => {
    // Placeholder logic for slider - simplified for this implementation
    return (
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="text-red-500 font-bold tracking-widest uppercase text-sm">Transformations</span>
                <h2 className="text-4xl font-black mt-2">Before & After</h2>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">See the magic our detailing and repair experts perform on every vehicle.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Comparison 1: Engine or Exterior */}
                <div className="bg-gray-800 rounded-3xl p-4 md:p-6 shadow-2xl border border-gray-700">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                        Engine Bay Restoration
                    </h3>
                    <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group">
                        {/* Using mask or just split view for simplicity in this version */}
                        <div className="absolute inset-0 flex">
                            <div className="w-1/2 relative border-r-2 border-white/20">
                                <Image src="/Image/cat_oil.jpg" alt="Dirty Engine" fill className="object-cover grayscale contrast-125" /> {/* Placeholder for Dirty */}
                                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase border border-red-500/50 text-red-500">Before</div>
                            </div>
                            <div className="w-1/2 relative">
                                <Image src="/Image/cat_engine.jpg" alt="Clean Engine" fill className="object-cover" />
                                <div className="absolute bottom-4 right-4 bg-green-600/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase text-white">After</div>
                            </div>
                        </div>
                        {/* Slider Handle Simulation */}
                        <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-900">
                                <FaSearch size={12} />
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Comparison 2: Paint/Dent */}
                 <div className="bg-gray-800 rounded-3xl p-4 md:p-6 shadow-2xl border border-gray-700">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        Paint Correction
                    </h3>
                     <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group">
                        <div className="absolute inset-0 flex">
                            <div className="w-1/2 relative border-r-2 border-white/20">
                                <Image src="/Image/cat_brakes.jpg" alt="Scratched" fill className="object-cover grayscale md:grayscale-0 sepia" /> {/* Placeholder */}
                                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase border border-red-500/50 text-red-500">Before</div>
                            </div>
                            <div className="w-1/2 relative">
                                <Image src="/Image/cat_lights.jpg" alt="Polished" fill className="object-cover" />
                                <div className="absolute bottom-4 right-4 bg-green-600/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase text-white">After</div>
                            </div>
                        </div>
                         {/* Slider Handle Simulation */}
                         <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-900">
                                <FaSearch size={12} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    );
};

// ----------------------------------------------------------------------
// 6. VIDEO SECTION
// ----------------------------------------------------------------------
const VideoSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                    <Image src="/Image/shopImg.jpg" alt="Video Thumbnail" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-24 h-24 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center pl-2 shadow-[0_0_50px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform duration-300">
                             <FaPlay className="text-white text-3xl" />
                        </div>
                    </div>
                    <div className="absolute bottom-8 left-8 text-left text-white">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs uppercase font-bold mb-2 inline-block">Workshop Tour</span>
                         <h3 className="text-3xl font-bold">Experience Our World Class Facility</h3>
                    </div>
                 </div>
            </div>
        </section>
    );
};

// ----------------------------------------------------------------------
// 7. CUSTOMER MOMENTS
// ----------------------------------------------------------------------
const CustomerMoments = () => {
    return (
        <section className="py-24 bg-gray-50">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <FaQuoteLeft className="text-4xl text-red-200 mx-auto mb-4" />
                    <h2 className="text-4xl font-black text-gray-900">Customer Moments</h2>
                    <p className="text-gray-500 mt-4">We do not just repair cars; we create happy drivers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Moment 1 */}
                    <motion.div whileHover={{ y: -10 }} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                            <Image src="/Image/happy-beautiful-asian-shopaholic-woman-260nw-1278669220.webp" alt="Happy Customer" fill className="object-cover" />
                        </div>
                        <p className="text-gray-800 font-bold text-lg">"Amazing service!"</p>
                        <p className="text-red-600 text-sm font-medium">@PriyaSharma</p>
                    </motion.div>
                    
                    {/* Moment 2 */}
                     <motion.div whileHover={{ y: -10 }} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 lg:translate-y-8">
                        <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                            <Image src="/Image/tushar.jpg" alt="Delivery" fill className="object-cover" />
                        </div>
                        <p className="text-gray-800 font-bold text-lg">"My car feels brand new."</p>
                        <p className="text-red-600 text-sm font-medium">@RahulVerma</p>
                    </motion.div>

                    {/* Moment 3 */}
                    <motion.div whileHover={{ y: -10 }} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                            <Image src="/Image/team.jpg" alt="Team" fill className="object-cover" />
                        </div>
                        <p className="text-gray-800 font-bold text-lg">"Trustworthy team."</p>
                        <p className="text-red-600 text-sm font-medium">@AmitPatel</p>
                    </motion.div>

                    {/* Moment 4 */}
                    <motion.div whileHover={{ y: -10 }} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 lg:translate-y-8">
                        <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                            <Image src="/Image/golu.jpg" alt="Staff" fill className="object-cover" />
                        </div>
                        <p className="text-gray-800 font-bold text-lg">"Best in the city."</p>
                        <p className="text-red-600 text-sm font-medium">@SureshKumar</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// ----------------------------------------------------------------------
// 8. CTA SECTION
// ----------------------------------------------------------------------
const CTASection = () => {
    return (
      <section className="py-24 bg-red-600 text-white relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Experience Excellence?</h2>
          <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
            Visit our workshop today and see our gallery in real life. We are waiting to serve you.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="tel:9719167530" className="w-full md:w-auto px-8 py-4 bg-white text-red-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all shadow-lg">
              <FaPhoneAlt /> Call Now
            </a>
            <a href="https://wa.me/919719167530" className="w-full md:w-auto px-8 py-4 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-lg">
              <FaWhatsapp /> WhatsApp
            </a>
            <a href="/contact#map" className="w-full md:w-auto px-8 py-4 bg-black/30 backdrop-blur-md text-white border border-white/30 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-black/50 transition-all">
              <FaMapMarkerAlt /> Get Directions
            </a>
          </div>
        </div>
      </section>
    );
};

// ----------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------------------------------------------
export default function GalleryPage() {
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState("all");
    const [selectedImage, setSelectedImage] = useState(null);

    // Sync filter with URL params
    useEffect(() => {
        const paramFilter = searchParams.get('filter');
        if (paramFilter && CATEGORIES.some(c => c.id === paramFilter)) {
            setFilter(paramFilter);
        } else {
            setFilter("all");
        }
    }, [searchParams]);

    const filteredItems = filter === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.category === filter);

    return (
        <main className="bg-white min-h-screen">
            <GalleryHero />
            
            {/* Filter Bar */}
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-y border-gray-100 py-4 mb-8">
                 <div className="max-w-7xl mx-auto px-4 overflow-x-auto flex items-center justify-center md:justify-center gap-2 no-scrollbar">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setFilter(cat.id);
                                // Optional: simple state update 
                            }}
                            className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === cat.id
                                    ? "bg-red-600 text-white shadow-md transform scale-105"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <MasonryGrid items={filteredItems} onSelect={setSelectedImage} />
            </div>

            <BeforeAfterSection />
            <VideoSection />
            <CustomerMoments />
            <CTASection />

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-auto max-h-[80vh] flex justify-center items-center">
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                />
                            </div>
                            <div className="mt-6 text-center max-w-2xl">
                                <h2 className="text-3xl font-bold text-white mb-2">{selectedImage.title}</h2>
                                <p className="text-gray-300 text-lg">{selectedImage.desc}</p>
                            </div>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 md:top-0 md:-right-12 text-white/50 hover:text-white transition-colors p-2"
                            >
                                <FaTimes size={32} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
