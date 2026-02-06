"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaSearch, FaFilter, FaThLarge, FaList, FaTimes, FaCheck,
    FaWhatsapp, FaPhoneAlt, FaChevronDown, FaStar, FaChevronRight, FaChevronLeft, FaHeart, FaRegHeart
} from 'react-icons/fa';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

// ----------------------------------------------------------------------
// MOCK DATA: AUTO PARTS CATALOG
// ----------------------------------------------------------------------
const PARTS_DATA = [
    {
        id: 1,
        name: "Synthetic Engine Oil 5W-40",
        category: "Oils & Fluids",
        brand: "Castrol",
        carModel: "Universal",
        price: 3500,
        rating: 4.8,
        stock: true,
        image: "/Image/cat_oil.jpg",
        description: "Premium fully synthetic engine oil designed for superior performance and protection. Suitable for petrol and diesel engines.",
        specs: { "Viscosity": "5W-40", "Volume": "4L", "Type": "Fully Synthetic" }
    },
    {
        id: 2,
        name: "Ceramic Brake Pads (Front)",
        category: "Brake Systems",
        brand: "Brembo",
        carModel: "Swift / Baleno",
        price: 2800,
        rating: 4.9,
        stock: true,
        image: "/Image/cat_brakes.jpg",
        description: "High-performance ceramic brake pads that offer excellent stopping power with reduced dust and noise.",
        specs: { "Position": "Front", "Material": "Ceramic", "Warranty": "6 Months" }
    },
    {
        id: 3,
        name: "LED Headlight Kit (H4)",
        category: "Electrical & Lights",
        brand: "Osram",
        carModel: "Universal",
        price: 4200,
        rating: 4.7,
        stock: true,
        image: "/Image/cat_lights.jpg",
        description: "Ultra-bright white LED conversion kit. 6000K cool white light for better visibility and modern look.",
        specs: { "Socket": "H4", "Power": "50W", "Color Temp": "6000K" }
    },
    {
        id: 4,
        name: "Air Filter Assembly",
        category: "Engine Components",
        brand: "Bosch",
        carModel: "Creta / Seltos",
        price: 850,
        rating: 4.5,
        stock: true,
        image: "/Image/cat_engine.jpg",
        description: "High-flow air filter that improves engine breathability and fuel efficiency, trapping harmful particles effectively.",
        specs: { "Type": "Panel Filter", "Material": "Cellulose", "Lifespan": "10,000 km" }
    },
    {
        id: 5,
        name: "Clutch Plate Kit",
        category: "Transmission",
        brand: "Valeo",
        carModel: "Honda City",
        price: 6500,
        rating: 4.6,
        stock: false,
        image: "/Image/cat_engine.jpg", // Placeholder
        description: "Complete clutch replacement kit including clutch disc, pressure plate, and release bearing.",
        specs: { "Diameter": "200mm", "Spline Count": "24", "Include": "3 pcs Set" }
    },
    {
        id: 6,
        name: "Shock Absorber (Rear)",
        category: "Suspension",
        brand: "Monroe",
        carModel: "Innova Crysta",
        price: 3200,
        rating: 4.8,
        stock: true,
        image: "/Image/cat_brakes.jpg", // Placeholder
        description: "Gas-charged rear shock absorbers for superior ride comfort and stability on rough roads.",
        specs: { "Type": "Gas Charged", "Position": "Rear Left/Right", "Warranty": "1 Year" }
    },
    {
        id: 7,
        name: "Coolant (Red) - 3L",
        category: "Oils & Fluids",
        brand: "Shell",
        carModel: "Universal",
        price: 950,
        rating: 4.7,
        stock: true,
        image: "/Image/cat_oil.jpg",
        description: "Long-life radiator coolant premixed for instant use. Protects against overheating and corrosion.",
        specs: { "Color": "Red", "Freezing Point": "-15°C", "Type": "Premixed" }
    },
    {
        id: 8,
        name: "Wiper Blades (Frameless)",
        category: "Body Parts",
        brand: "Bosch",
        carModel: "Universal",
        price: 1200,
        rating: 4.4,
        stock: true,
        image: "/Image/cat_lights.jpg", // Placeholder
        description: "Aerodynamic frameless wiper blades for streak-free wiping even at high speeds.",
        specs: { "Size": "24\" / 16\"", "Material": "Silicone Rubber", "Mount": "Hook Type" }
    },
    {
        id: 9,
        name: "Spark Plugs (Iridium)",
        category: "Engine Components",
        brand: "NGK",
        carModel: "Universal",
        price: 1800,
        rating: 4.9,
        stock: true,
        image: "/Image/cat_engine.jpg",
        description: "High-performance iridium spark plugs for better ignition and fuel economy.",
        specs: { "Type": "Iridium", "Gap": "1.1mm", "Life": "50,000 km" }
    },
    {
        id: 10,
        name: "Battery 45Ah",
        category: "Electrical & Lights",
        brand: "Amaron",
        carModel: "Alto / WagonR",
        price: 4500,
        rating: 4.6,
        stock: true,
        image: "/Image/cat_lights.jpg",
        description: "Maintenance-free battery with high cranking power and long life.",
        specs: { "Capacity": "45Ah", "Warranty": "48 Months", "Type": "Zero Maintenance" }
    }
];

const FILTERS = {
    categories: ["All", "Engine Components", "Brake Systems", "Suspension", "Electrical & Lights", "Body Parts", "Oils & Fluids", "Transmission"],
    brands: ["All", "Castrol", "Bosch", "Brembo", "Valeo", "Osram", "Monroe", "Shell", "NGK", "Amaron"],
    models: ["All", "Universal", "Swift / Baleno", "Creta / Seltos", "Honda City", "Innova Crysta", "Alto / WagonR"],
};

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 50 }}
                className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-2xl flex flex-col md:flex-row relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-black hover:text-white text-gray-900 rounded-full flex items-center justify-center transition-all duration-300"
                >
                    <FaTimes />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 bg-gray-50/50 p-8 flex items-center justify-center min-h-[300px]">
                    <div className="relative w-full h-[300px] md:h-full group">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain hover:scale-110 transition-transform duration-500 drop-shadow-xl"
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 p-10 flex flex-col">
                    <div className="mb-auto">
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold uppercase rounded-full tracking-wider border border-gray-200">
                                {product.category}
                            </span>
                            {product.stock ? (
                                <span className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                    <FaCheck size={10} /> In Stock
                                </span>
                            ) : (
                                <span className="text-red-500 text-xs font-bold bg-red-50 px-2 py-1 rounded-full border border-red-100">Out of Stock</span>
                            )}
                        </div>

                        <h2 className="text-4xl font-black text-gray-900 mb-2 leading-tight">{product.name}</h2>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                            <div className="flex items-center text-yellow-500 gap-1">
                                <FaStar />
                                <span className="font-bold text-gray-900">{product.rating}</span>
                                <span className="text-gray-400 font-normal">(125 Reviews)</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                            <div>
                                <span className="block text-xs uppercase tracking-wide text-gray-400 mb-1">Brand</span>
                                <strong className="text-lg text-gray-900 block">{product.brand}</strong>
                            </div>
                            <div className="h-10 w-px bg-gray-200"></div>
                            <div>
                                <span className="block text-xs uppercase tracking-wide text-gray-400 mb-1">Compatibility</span>
                                <strong className="text-lg text-gray-900 block">{product.carModel}</strong>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8 text-base">{product.description}</p>
                    </div>

                    <div className="pt-4">
                        <div className="flex items-end justify-between mb-6">
                            <div>
                                <span className="text-sm text-gray-400 font-medium mb-1 block">Total Price</span>
                                <div className="text-4xl font-black text-gray-900">₹{product.price.toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <a href={`https://wa.me/919719167530?text=I am interested in ${product.name}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-1">
                                <FaWhatsapp size={20} /> Order via WhatsApp
                            </a>
                            <a href="tel:9719167530" className="w-16 bg-gray-900 hover:bg-black text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-1">
                                <FaPhoneAlt size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ----------------------------------------------------------------------
// MAIN PAGE
// ----------------------------------------------------------------------

export default function ServicesPage() {
    const searchParams = useSearchParams();

    // State
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [maxPrice, setMaxPrice] = useState(10000);
    const [showFiltersMobile, setShowFiltersMobile] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Sync URL params with State
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            const categoryMap = {
                'engine': 'Engine Components',
                'brakes': 'Brake Systems',
                'suspension': 'Suspension',
                'electrical': 'Electrical & Lights',
                'body': 'Body Parts',
                'oils': 'Oils & Fluids',
                'transmission': 'Transmission',
                'batteries': 'All',
                'tyres': 'All'
            };
            const mappedCat = categoryMap[categoryParam];
            if (mappedCat && FILTERS.categories.includes(mappedCat)) {
                setSelectedCategory(mappedCat);
            }
        }
    }, [searchParams]);

    // Handle Search Suggestions
    const handleSearchInput = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setCurrentPage(1); // Reset page on search

        if (query.length > 0) {
            const suggestions = PARTS_DATA.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5); // Limit matches
            setSearchSuggestions(suggestions);
        } else {
            setSearchSuggestions([]);
        }
    };

    const selectSuggestion = (name) => {
        setSearchQuery(name);
        setSearchSuggestions([]);
    };

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return PARTS_DATA.filter(item => {
            const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
            const matchBrand = selectedBrand === 'All' || item.brand === selectedBrand;
            const matchPrice = item.price <= maxPrice;
            return matchSearch && matchCategory && matchBrand && matchPrice;
        });
    }, [searchQuery, selectedCategory, selectedBrand, maxPrice]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedBrand, maxPrice]);

    return (
        <div className="min-h-screen bg-gray-50 pt-[100px] pb-20">

            {/* Mobile Filter Floater */}
            <button
                onClick={() => setShowFiltersMobile(true)}
                className="lg:hidden fixed bottom-6 left-6 z-40 bg-red-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
            >
                <FaFilter size={20} />
            </button>

            {/* Header Banner */}
            <div className="bg-gray-900 text-white py-16 mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-600 opacity-10 transform -skew-x-12 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
                    >
                        Auto Parts <span className="text-red-600">Pro</span> Catalog
                    </motion.h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium">
                        Premium parts. Unbeatable prices. Guaranteed quality for every drive.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* -------------------- SIDEBAR FILTERS -------------------- */}
                    <div className={`
             lg:w-1/4 lg:block
             ${showFiltersMobile ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'}
             lg:static lg:bg-transparent lg:p-0 lg:overflow-visible transition-all
          `}>
                        <div className="flex justify-between items-center lg:hidden mb-6">
                            <h2 className="text-2xl font-bold">Filters</h2>
                            <button onClick={() => setShowFiltersMobile(false)} className="p-2 bg-gray-100 rounded-full">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Categories */}
                        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 mb-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                                <FaThLarge className="text-red-600" /> Categories
                            </h3>
                            <div className="space-y-1">
                                {FILTERS.categories.map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${selectedCategory === cat ? 'bg-red-600 border-red-600 shadow-sm' : 'border-gray-300 bg-white group-hover:border-red-400'}`}>
                                            {selectedCategory === cat && <FaCheck size={10} className="text-white" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="category"
                                            className="hidden"
                                            checked={selectedCategory === cat}
                                            onChange={() => setSelectedCategory(cat)}
                                        />
                                        <span className={`text-sm ${selectedCategory === cat ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-red-900'}`}>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Brands */}
                        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 mb-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                                <FaThLarge className="text-red-600" /> Brands
                            </h3>
                            <div className="space-y-1">
                                {FILTERS.brands.map(brand => (
                                    <label key={brand} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${selectedBrand === brand ? 'bg-red-600 border-red-600 shadow-sm' : 'border-gray-300 bg-white group-hover:border-red-400'}`}>
                                            {selectedBrand === brand && <FaCheck size={10} className="text-white" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="brand"
                                            className="hidden"
                                            checked={selectedBrand === brand}
                                            onChange={() => setSelectedBrand(brand)}
                                        />
                                        <span className={`text-sm ${selectedBrand === brand ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-red-900'}`}>{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                                <FaFilter className="text-red-600" /> Max Price
                            </h3>
                            <div className="px-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    step="500"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                                />
                                <div className="flex justify-between mt-2 text-sm font-bold text-gray-600">
                                    <span>₹0</span>
                                    <span className="text-red-600">₹{maxPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* -------------------- MAIN CONTENT -------------------- */}
                    <div className="lg:w-3/4">

                        {/* Toolbar */}
                        <div className="bg-white p-4 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-[90px] z-30 backdrop-blur-xl bg-white/95 supports-[backdrop-filter]:bg-white/80">

                            {/* Search with Autosuggest */}
                            <div className="relative w-full md:max-w-xl group">
                                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search part name or category..."
                                    value={searchQuery}
                                    onChange={handleSearchInput}
                                    onBlur={() => setTimeout(() => setSearchSuggestions([]), 200)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent border-2 rounded-xl focus:bg-white focus:border-red-600/20 focus:ring-4 focus:ring-red-600/10 text-gray-900 outline-none transition-all placeholder:text-gray-400 font-medium shadow-inner"
                                />
                                {/* Suggestions Dropdown */}
                                <AnimatePresence>
                                    {searchSuggestions.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-100 z-50 overflow-hidden ring-1 ring-black/5"
                                        >
                                            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">Suggestions</div>
                                            {searchSuggestions.map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => selectSuggestion(item.name)}
                                                    className="w-full text-left px-5 py-4 hover:bg-red-50/50 flex items-center gap-4 border-b border-gray-50 last:border-none transition-colors group/item"
                                                >
                                                    <div className="w-full h-full bg-white rounded-lg flex-shrink-0 relative overflow-hidden shadow-sm border border-gray-100 group-hover/item:border-red-200">
                                                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                                                    </div>
                                                   
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-900 group-hover/item:text-red-700 transition-colors">{item.name}</div>
                                                        <div className="text-xs text-gray-500 font-medium">{item.category}</div>
                                                    </div>
                                                    <FaChevronRight className="ml-auto text-gray-300 group-hover/item:text-red-400 text-xs" />
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* View Toggle & Count */}
                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                <span className="text-sm font-bold text-gray-400 whitespace-nowrap">
                                    Showing <span className="text-gray-900">{filteredProducts.length}</span> Products
                                </span>

                                <div className="flex bg-gray-100 p-1.5 rounded-xl gap-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-red-600 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <FaThLarge size={14} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-red-600 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <FaList size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        {paginatedProducts.length > 0 ? (
                            <>
                                <div className={
                                    viewMode === 'grid'
                                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                                        : "flex flex-col gap-6"
                                }>
                                    {paginatedProducts.map(item => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            key={item.id}
                                            className={`
                                                overflow-hidden transition-all duration-300 group
                                                ${viewMode === 'list'
                                                    ? 'flex flex-row items-center h-48 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-lg'
                                                    : 'flex flex-col bg-white rounded-lg border-1 border-transparent hover:border-red-600 shadow-sm'
                                                }
                                            `}
                                        >
                                            {/* Card Image Area */}
                                            <div className={`
                                                relative overflow-hidden
                                                ${viewMode === 'list' ? 'w-56 h-full shrink-0 bg-gray-100' : 'h-72 w-full bg-gray-50'}
                                            `}>
                                                <Image src={item.image} alt={item.name} fill className="object-contain p-0 transition-transform duration-500" />

                                                {/* Wishlist Button */}
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id) }}
                                                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
                                                >
                                                    {favorites.includes(item.id)
                                                        ? <FaHeart className="text-red-600 text-sm" />
                                                        : <FaRegHeart className="text-gray-400 text-sm hover:text-red-600" />
                                                    }
                                                </button>

                                                {/* Details Overlay (Grid Only) - Simple Button Popup */}
                                                {viewMode === 'grid' && (
                                                    <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setSelectedProduct(item); }}
                                                            className="pointer-events-auto bg-red-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-black transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2"
                                                        >
                                                            View Details <FaChevronRight size={10} />
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Featured Tag */}
                                                {item.rating > 4.7 && (
                                                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-sm z-10">
                                                        Best Seller
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Content */}
                                            <div className={`${viewMode === 'list' ? 'p-0 flex-1' : 'p-4 bg-white border-t border-gray-50'}`}>
                                                <div className="mb-1 flex justify-between items-start">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{item.brand}</span>
                                                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                                                        <FaStar /> {item.rating}
                                                    </div>
                                                </div>

                                                <h3 className="text-base font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-red-600 transition-colors">{item.name}</h3>
                                                <p className="text-xs text-gray-500 mb-3">{item.category}</p>

                                                <div className="mt-auto flex items-center justify-between">
                                                    
                                                    {viewMode === 'list' && (
                                                        <div className="flex gap-2">
                                                            <a href={`https://wa.me/919719167530?text=I am interested in ${item.name}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-gray-200 text-green-600 hover:bg-green-50 transition-colors">
                                                                <FaWhatsapp size={18} />
                                                            </a>
                                                            <button
                                                                onClick={() => setSelectedProduct(item)}
                                                                className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-red-600 transition-colors"
                                                            >
                                                                Details
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* PAGINATION CONTROLS */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center mt-16 gap-3">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition-all"
                                        >
                                            <FaChevronLeft />
                                        </button>

                                        {[...Array(totalPages)].map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentPage(idx + 1)}
                                                className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold transition-all text-sm ${currentPage === idx + 1
                                                    ? 'bg-gray-900 text-white shadow-xl scale-110'
                                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {idx + 1}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition-all"
                                        >
                                            <FaChevronRight />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                    <FaSearch size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500 max-w-sm mx-auto mb-8">We couldn't find matches for "{searchQuery}". Try different keywords or check spelling.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedBrand('All'); setMaxPrice(10000); }}
                                    className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {selectedProduct && (
                    <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}
