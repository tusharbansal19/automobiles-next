"use client";
import { useState, useEffect, useRef } from "react";
import { FaFilter, FaTimes, FaTag, FaStar, FaSearch, FaWrench, FaCogs, FaHeart, FaShare, FaShoppingCart, FaDollarSign, FaTruck, FaCheckCircle, FaEye, FaThumbsUp, FaCertificate, FaMapMarkerAlt } from "react-icons/fa";

export default function Services() {
  const PARTS = [
    {
      id: 1,
      name: "Sport Front Bumper",
      image: "https://pngimg.com/uploads/car_bumper/car_bumper_PNG22.png",
      description: "Aerodynamic front bumper designed for sport models, offering superior protection and aggressive styling.",
      tags: ["Body", "Sport", "Durable"],
      rating: 4.8,
      reviews: 124,
      type: "Body",
      price: 349.99,
      originalPrice: 429.99,
      inStock: true,
      fastShipping: true,
      warranty: "3 Years",
      brand: "AeroDynamics",
      compatibility: "Sport Series"
    },
    {
      id: 2,
      name: "Matrix LED Headlights",
      image: "https://pngimg.com/uploads/headlight/headlight_PNG22.png",
      description: "Advanced LED matrix headlights providing crystal clear night vision and adaptive beam control.",
      tags: ["Lighting", "Vision", "Safety"],
      rating: 4.9,
      reviews: 89,
      type: "Lighting",
      price: 499.99,
      originalPrice: 599.99,
      inStock: true,
      fastShipping: true,
      warranty: "2 Years",
      brand: "Lumina",
      compatibility: "Universal"
    },
    {
      id: 3,
      name: "Ultra Synthetic Oil 5W-40",
      image: "https://pngimg.com/uploads/motor_oil/motor_oil_PNG36.png",
      description: "Complete synthetic formula for maximum engine performance and longevity in extreme conditions.",
      tags: ["Engine", "Maintenance", "Premium"],
      rating: 4.7,
      reviews: 450,
      type: "Oil",
      price: 35.99,
      originalPrice: 45.99,
      inStock: true,
      fastShipping: true,
      warranty: "Guaranteed",
      brand: "FluidMaster",
      compatibility: "All Engines"
    },
    {
      id: 4,
      name: "Heavy Duty Battery",
      image: "https://pngimg.com/uploads/car_battery/car_battery_PNG14.png",
      description: "Maintenance-free heavy duty battery with reliable cold cranking amps for all weather starts.",
      tags: ["Electrical", "Power", "Reliable"],
      rating: 4.6,
      reviews: 210,
      type: "Electrical",
      price: 129.99,
      originalPrice: 159.99,
      inStock: true,
      fastShipping: false,
      warranty: "4 Years",
      brand: "VoltMax",
      compatibility: "Universal"
    },
    {
      id: 5,
      name: "Performance Brake Discs",
      image: "https://pngimg.com/uploads/disc_brake/disc_brake_PNG33.png",
      description: "Ventilated brake discs designed for optimal heat dissipation and consistent stopping power.",
      tags: ["Brakes", "Performance", "Safety"],
      rating: 4.8,
      reviews: 156,
      type: "Brakes",
      price: 89.99,
      originalPrice: 119.99,
      inStock: true,
      fastShipping: true,
      warranty: "1 Year",
      brand: "StopTech",
      compatibility: "Sedans & SUVs"
    },
    {
      id: 6,
      name: "All-Terrain Tire",
      image: "https://pngimg.com/uploads/tires/tires_PNG31.png",
      description: "Rugged all-terrain tire offering exceptional grip on both wet and dry surfaces.",
      tags: ["Wheels", "Tire", "Offroad"],
      rating: 4.7,
      reviews: 320,
      type: "Wheels",
      price: 149.99,
      originalPrice: 189.99,
      inStock: true,
      fastShipping: false,
      warranty: "50,000 Miles",
      brand: "GripMaster",
      compatibility: "Trucks & SUVs"
    },
    {
      id: 7,
      name: "Iridium Spark Plugs",
      image: "https://pngimg.com/uploads/spark_plug/spark_plug_PNG12.png",
      description: "High-performance iridium spark plugs for improved ignition efficiency and fuel economy.",
      tags: ["Engine", "Ignition", "Efficiency"],
      rating: 4.9,
      reviews: 512,
      type: "Engine",
      price: 12.99,
      originalPrice: 18.99,
      inStock: true,
      fastShipping: true,
      warranty: "1 Year",
      brand: "IgnitePro",
      compatibility: "Petrol Engines"
    },
    {
      id: 8,
      name: "Turbocharger Kit",
      image: "https://pngimg.com/uploads/turbo/turbo_PNG27.png",
      description: "Complete turbocharger kit to boost your engine's horsepower and torque output.",
      tags: ["Performance", "Turbo", "Speed"],
      rating: 4.5,
      reviews: 78,
      type: "Engine",
      price: 899.99,
      originalPrice: 1199.99,
      inStock: false,
      fastShipping: false,
      warranty: "1 Year",
      brand: "BoostKing",
      compatibility: "Sport Compacts"
    }
  ];

  const PART_TYPES = ["Body", "Lighting", "Oil", "Engine", "Transmission", "Brakes"];
  const TAGS = ["Protection", "Style", "Durable", "Night Vision", "Efficiency", "Safety", "Premium", "Performance", "Engine Care", "Modern", "Bright", "Professional"];
  const BRANDS = ["AutoPro", "BrightBeam", "MobilTech", "RaceOil", "CarbonPro", "XenonMax"];
  const PRICE_RANGES = [
    { label: "Under $50", min: 0, max: 49.99 },
    { label: "$50 - $100", min: 50, max: 99.99 },
    { label: "$100 - $200", min: 100, max: 199.99 },
    { label: "$200+", min: 200, max: Infinity }
  ];

  const SEARCH_SUGGESTIONS = [
    "LED headlights", "Engine oil", "Brake pads", "Air filter",
    "Spark plugs", "Battery", "Tires", "Bumper", "Mirror"
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [inStockOnly, setInStockOnly] = useState(false);
  const [fastShippingOnly, setFastShippingOnly] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen, isMobile]);

  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedTags([]);
    setSelectedBrands([]);
    setSelectedPriceRange(null);
    setInStockOnly(false);
    setFastShippingOnly(false);
    setSearchTerm("");
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFav = new Set(prev);
      if (newFav.has(id)) newFav.delete(id); else newFav.add(id);
      return newFav;
    });
  };

  const handleSearch = () => {
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter(suggestion =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase()) && suggestion !== searchTerm
  );

  const hasActiveFilters = selectedTypes.length > 0 || selectedTags.length > 0 || selectedBrands.length > 0 || selectedPriceRange || inStockOnly || fastShippingOnly || searchTerm.length > 0;

  const filteredParts = PARTS.filter(part => {
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(part.type);
    const tagMatch = selectedTags.length === 0 || part.tags.some(tag => selectedTags.includes(tag));
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(part.brand);
    const priceMatch = !selectedPriceRange || (part.price >= selectedPriceRange.min && part.price <= selectedPriceRange.max);
    const stockMatch = !inStockOnly || part.inStock;
    const shippingMatch = !fastShippingOnly || part.fastShipping;
    const searchMatch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.brand.toLowerCase().includes(searchTerm.toLowerCase());

    return typeMatch && tagMatch && brandMatch && priceMatch && stockMatch && shippingMatch && searchMatch;
  });

  const FilterSection = ({ title, icon, children }) => (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-2">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );

  const CheckboxItem = ({ checked, onChange, label, count }) => (
    <label className="flex items-center justify-between cursor-pointer group py-1 hover:bg-gray-100 px-2 rounded transition-colors">
      <div className="flex items-center">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center transition-all ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
          {checked && (<svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>)}
        </div>
        <span className="text-gray-600 group-hover:text-black transition-colors text-sm">{label}</span>
      </div>
      {count && <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{count}</span>}
    </label>
  );

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FaFilter className="text-blue-600" />
          Filters
        </h2>
        {isMobile && (
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg">
            <FaTimes size={18} />
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <button onClick={clearAllFilters} className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-lg transition-all duration-300 font-medium text-sm shadow-md">
          Clear All ({selectedTypes.length + selectedTags.length + selectedBrands.length + (selectedPriceRange ? 1 : 0) + (inStockOnly ? 1 : 0) + (fastShippingOnly ? 1 : 0)})
        </button>
      )}

      <FilterSection title="Availability" icon={<FaCheckCircle className="text-green-600" />}>
        <div className="space-y-2">
          <CheckboxItem
            checked={inStockOnly}
            onChange={() => setInStockOnly(!inStockOnly)}
            label="In Stock Only"
            count={PARTS.filter(p => p.inStock).length}
          />
          <CheckboxItem
            checked={fastShippingOnly}
            onChange={() => setFastShippingOnly(!fastShippingOnly)}
            label="Fast Shipping"
            count={PARTS.filter(p => p.fastShipping).length}
          />
        </div>
      </FilterSection>

      <FilterSection title="Part Type" icon={<FaWrench className="text-green-600" />}>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {PART_TYPES.map(type => (
            <CheckboxItem
              key={type}
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeChange(type)}
              label={type}
              count={PARTS.filter(p => p.type === type).length}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Brands" icon={<FaCertificate className="text-purple-600" />}>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {BRANDS.map(brand => (
            <CheckboxItem
              key={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
              label={brand}
              count={PARTS.filter(p => p.brand === brand).length}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range" icon={<FaDollarSign className="text-yellow-600" />}>
        <div className="space-y-2">
          {PRICE_RANGES.map(range => (
            <label key={range.label} className="flex items-center cursor-pointer group py-1 hover:bg-gray-100 px-2 rounded transition-colors">
              <input
                type="radio"
                name="priceRange"
                checked={selectedPriceRange?.label === range.label}
                onChange={() => setSelectedPriceRange(selectedPriceRange?.label === range.label ? null : range)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${selectedPriceRange?.label === range.label ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                {selectedPriceRange?.label === range.label && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <span className="text-gray-600 group-hover:text-black transition-colors text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Tags" icon={<FaTag className="text-pink-600" />}>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {TAGS.map(tag => (
            <label key={tag} className="cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="sr-only"
              />
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedTags.includes(tag)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}>
                {tag}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="flex max-w-[1600px] mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 bg-white border-r border-slate-100 p-6 min-h-screen sticky top-20">
          <FilterContent />
        </aside>

        {/* Mobile Sidebar */}
        <aside className={`lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white backdrop-blur-xl border-r border-slate-100 p-6 z-50 transition-transform duration-300 shadow-2xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <FilterContent />
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && isMobile && (
          <div className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2"> Auto Parts</h1>
              <p className="text-slate-500">Find the best parts for your vehicle</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8" ref={searchRef}>
            <div className="relative max-w-2xl">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 z-10" />
                <input
                  type="text"
                  placeholder="Search auto parts, brands, or categories..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full pl-12 pr-24 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-slate-400 text-lg"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium"
                >
                  Search
                </button>
              </div>

              {/* Search Suggestions */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center gap-3"
                    >
                      <FaSearch className="text-slate-400 text-sm" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden fixed left-4 bottom-16 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
            <FaFilter className="text-sm" />
            <span className="font-semibold">Filters</span>
            {hasActiveFilters && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                {selectedTypes.length + selectedTags.length + selectedBrands.length + (selectedPriceRange ? 1 : 0) + (inStockOnly ? 1 : 0) + (fastShippingOnly ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Results Count */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-slate-600">
              Showing <span className="text-slate-900 font-bold">{filteredParts.length}</span> of {PARTS.length} parts
            </p>
          </div>

          {/* Parts Grid */}
          <div className="w-full">
            <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20 lg:mb-0">
              {filteredParts.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <FaWrench className="mx-auto text-6xl text-slate-300 mb-4" />
                  <h3 className="text-2xl font-semibold text-slate-500 mb-2">No parts found</h3>
                  <p className="text-slate-400">Try adjusting your filters to see more results</p>
                </div>
              ) : (
                filteredParts.map((part) => (
                  <div
                    key={part.id}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={part.image}
                        alt={part.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Status Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {part.rating > 4 && (
                          <div className="bg-orange-500 text-white px-3 py-1 rounded-md text-xs font-bold shadow-md flex items-center gap-1">
                            <FaStar className="text-white text-xs" /> {part.rating}
                          </div>
                        )}
                        {!part.inStock && (
                          <div className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold">
                            Out of Stock
                          </div>
                        )}
                        {part.fastShipping && part.inStock && (
                          <div className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                            <FaTruck className="text-xs" /> Fast Ship
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button
                          onClick={() => toggleFavorite(part.id)}
                          className={`p-2 rounded-full shadow-md transition-all duration-200 ${favorites.has(part.id) ? 'bg-red-500 text-white' : 'bg-white text-slate-400 hover:text-red-500'}`}
                        >
                          <FaHeart size={14} />
                        </button>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-lg shadow-sm border border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">${part.price}</span>
                            {part.originalPrice > part.price && (
                              <span className="text-sm text-slate-400 line-through">${part.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold text-slate-900 line-clamp-1" title={part.name}>
                          {part.name}
                        </h3>
                      </div>

                      <p className="text-slate-500 text-sm line-clamp-2">{part.description}</p>

                      <div className="space-y-3 pt-2 border-t border-gray-50">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 flex items-center gap-2"><FaCogs className="text-blue-500" /> Type</span>
                          <span className="font-semibold text-slate-700">{part.type}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 flex items-center gap-2"><FaCertificate className="text-purple-500" /> Brand</span>
                          <span className="font-semibold text-slate-700">{part.brand}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 flex items-center gap-2"><FaMapMarkerAlt className="text-red-500" /> Fits</span>
                          <span className="font-semibold text-slate-700">{part.compatibility}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <button
                          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${part.inStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          disabled={!part.inStock}
                        >
                          <FaShoppingCart size={14} />
                          {part.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}