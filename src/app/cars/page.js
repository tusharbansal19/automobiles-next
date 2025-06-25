"use client";
import { useState, useEffect } from "react";
import { FaCar, FaGasPump, FaRupeeSign, FaCogs, FaStar, FaBars, FaTimes, FaFilter, FaHeart, FaShare, FaEye, FaTachometerAlt, FaCalendarAlt } from "react-icons/fa";

const DUMMY_CARS = [
  {
    id: 1,
    name: "2017 Mercedes-Benz E-Class",
    price: 23,
    priceLabel: "₹23 Lakh",
    year: 2017,
    kms: "1,00,000 kms",
    fuel: "Diesel",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop",
    rating: 4.5,
    views: 245,
    location: "Mumbai, Maharashtra"
  },
  {
    id: 2,
    name: "2023 Land Rover Range Rover Velar",
    price: 83,
    priceLabel: "₹83 Lakh",
    year: 2023,
    kms: "32,500 kms",
    fuel: "Petrol",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop",
    rating: 4.8,
    views: 189,
    location: "Delhi, India"
  },
  {
    id: 3,
    name: "2019 Toyota Fortuner",
    price: 38,
    priceLabel: "₹38 Lakh",
    year: 2019,
    kms: "45,000 kms",
    fuel: "Diesel",
    transmission: "Manual",
    image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=500&h=300&fit=crop",
    rating: 4.3,
    views: 312,
    location: "Bangalore, Karnataka"
  },
  {
    id: 4,
    name: "2018 Honda City",
    price: 10,
    priceLabel: "₹10 Lakh",
    year: 2018,
    kms: "60,000 kms",
    fuel: "Petrol",
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop",
    rating: 4.2,
    views: 156,
    location: "Chennai, Tamil Nadu"
  },
  {
    id: 5,
    name: "2020 Maruti Suzuki Swift",
    price: 7,
    priceLabel: "₹7 Lakh",
    year: 2020,
    kms: "25,000 kms",
    fuel: "Petrol",
    transmission: "Manual",
    image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=500&h=300&fit=crop",
    rating: 4.1,
    views: 203,
    location: "Pune, Maharashtra"
  },
];

const PRICE_FILTERS = [
  { label: "Under ₹10 Lakh", min: 0, max: 10 },
  { label: "₹10 - ₹30 Lakh", min: 10, max: 30 },
  { label: "₹30 - ₹50 Lakh", min: 30, max: 50 },
  { label: "Above ₹50 Lakh", min: 50, max: 100 },
];
const FUEL_FILTERS = ["Petrol", "Diesel"];
const TRANS_FILTERS = ["Automatic", "Manual"];

export default function CarPage() {
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedTrans, setSelectedTrans] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent background scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen, isMobile]);

  // Close sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  // Filtering logic
  const filteredCars = DUMMY_CARS.filter((car) => {
    let priceMatch =
      selectedPrices.length === 0 ||
      selectedPrices.some((range) => car.price >= range.min && car.price < range.max);
    let fuelMatch = selectedFuels.length === 0 || selectedFuels.includes(car.fuel);
    let transMatch = selectedTrans.length === 0 || selectedTrans.includes(car.transmission);
    return priceMatch && fuelMatch && transMatch;
  });

  // Handlers
  const handlePriceChange = (range) => {
    setSelectedPrices((prev) =>
      prev.some((r) => r.label === range.label)
        ? prev.filter((r) => r.label !== range.label)
        : [...prev, range]
    );
  };
  const handleFuelChange = (fuel) => {
    setSelectedFuels((prev) =>
      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel]
    );
  };
  const handleTransChange = (trans) => {
    setSelectedTrans((prev) =>
      prev.includes(trans) ? prev.filter((t) => t !== trans) : [...prev, trans]
    );
  };

  const toggleFavorite = (carId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(carId)) {
        newFavorites.delete(carId);
      } else {
        newFavorites.add(carId);
      }
      return newFavorites;
    });
  };

  const clearAllFilters = () => {
    setSelectedPrices([]);
    setSelectedFuels([]);
    setSelectedTrans([]);
  };

  const hasActiveFilters = selectedPrices.length > 0 || selectedFuels.length > 0 || selectedTrans.length > 0;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaFilter className="text-blue-400" /> 
          Filters
        </h2>
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
          >
            <FaTimes size={20} />
          </button>
        )}
      </div>

      {/* Clear All Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Clear All Filters
        </button>
      )}

      {/* Price Filter */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
          <FaRupeeSign className="text-green-400" /> Price Range
        </h3>
        <div className="space-y-2">
          {PRICE_FILTERS.map((range) => (
            <label key={range.label} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedPrices.some((r) => r.label === range.label)}
                onChange={() => handlePriceChange(range)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all ${
                selectedPrices.some((r) => r.label === range.label)
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-400 group-hover:border-blue-400'
              }`}>
                {selectedPrices.some((r) => r.label === range.label) && (
                  <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                  </svg>
                )}
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Filter */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
          <FaGasPump className="text-orange-400" /> Fuel Type
        </h3>
        <div className="space-y-2">
          {FUEL_FILTERS.map((fuel) => (
            <label key={fuel} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedFuels.includes(fuel)}
                onChange={() => handleFuelChange(fuel)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all ${
                selectedFuels.includes(fuel)
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-400 group-hover:border-blue-400'
              }`}>
                {selectedFuels.includes(fuel) && (
                  <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                  </svg>
                )}
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors">{fuel}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission Filter */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
          <FaCogs className="text-blue-400" /> Transmission
        </h3>
        <div className="space-y-2">
          {TRANS_FILTERS.map((trans) => (
            <label key={trans} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedTrans.includes(trans)}
                onChange={() => handleTransChange(trans)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all ${
                selectedTrans.includes(trans)
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-400 group-hover:border-blue-400'
              }`}>
                {selectedTrans.includes(trans) && (
                  <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                  </svg>
                )}
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors">{trans}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex">
        {/* Sidebar: always visible on desktop, toggled on mobile */}
        <aside
          className={`
            hidden lg:block w-80 bg-slate-900/95 border-r border-blue-500/30 p-6 min-h-screen sticky top-0 backdrop-blur-xl
            ${!isMobile ? '' : 'hidden'}
          `}
        >
          <FilterContent />
        </aside>
        {/* Mobile Sidebar */}
        <aside
          className={`
            lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-slate-900/95 backdrop-blur-xl border-r border-blue-500/30 p-6 z-50 transition-transform duration-300 shadow-2xl
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <FilterContent />
        </aside>
        {/* Mobile Overlay */}
        {sidebarOpen && isMobile && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          {/* Header with Filter Button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Premium Cars</h1>
              <p className="text-gray-300">Find your perfect ride from our curated collection</p>
            </div>
            
            {/* Mobile Filter Button (fixed bottom left) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden fixed left-4 bottom-6 z-50 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25"
              aria-label="Open filters sidebar"
            >
              <FaFilter className="text-sm" />
              <span className="font-semibold">Filters</span>
              {hasActiveFilters && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                  {selectedPrices.length + selectedFuels.length + selectedTrans.length}
                </span>
              )}
            </button>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-300">
              Showing <span className="text-white font-semibold">{filteredCars.length}</span> cars
            </p>
          </div>

          {/* Car Cards Grid */}
          <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCars.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <FaCar className="mx-auto text-6xl text-gray-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-400 mb-2">No cars found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
              </div>
            ) : (
              filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {car.year}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => toggleFavorite(car.id)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                          favorites.has(car.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/10 text-white hover:bg-red-500'
                        }`}
                      >
                        <FaHeart size={14} />
                      </button>
                      <button className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-blue-500 transition-all duration-300">
                        <FaShare size={14} />
                      </button>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Title and Rating */}
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                        {car.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span className="text-yellow-400 text-sm font-semibold">{car.rating}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <p className="text-gray-400 text-sm">{car.location}</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaTachometerAlt className="text-blue-400" />
                        <span className="text-sm">{car.kms}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaGasPump className="text-orange-400" />
                        <span className="text-sm">{car.fuel}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaCogs className="text-blue-400" />
                        <span className="text-sm">{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaEye className="text-green-400" />
                        <span className="text-sm">{car.views} views</span>
                      </div>
                    </div>
                  </div>

                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-blue-500/20 to-pink-500/20 animate-pulse" />
                  </div>
                </div>
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
}