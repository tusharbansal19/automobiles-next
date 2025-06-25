"use client";
import { useState, useEffect, useRef } from "react";
import { FaFilter, FaTimes, FaTag, FaStar, FaSearch, FaWrench, FaCogs, FaHeart, FaShare, FaShoppingCart, FaDollarSign, FaTruck, FaCheckCircle, FaEye, FaThumbsUp, FaCertificate, FaMapMarkerAlt } from "react-icons/fa";

export default function Services() {
  const PARTS = [
    { 
      id: 1,
      name: "Premium Front Bumper", 
      image: "https://5.imimg.com/data5/NE/CN/UP/SELLER-43015722/motorcycle-leg-guard-500x500.jpg",// "/api/placeholder/400/300", 
      description: "High-quality reinforced front bumper with integrated fog lights and aerodynamic design for enhanced protection and style.", 
      tags: ["Protection", "Style", "Durable"], 
      rating: 4.7, 
      reviews: 342,
      type: "Body", 
      price: 299.99,
      originalPrice: 399.99,
      inStock: true,
      fastShipping: true,
      warranty: "3 Years",
      brand: "AutoPro",
      compatibility: "2018-2024 Models"
    },
    { 
      id: 2,
      name: "LED Headlight Assembly", 
      image: "https://5.imimg.com/data5/NE/CN/UP/SELLER-43015722/motorcycle-leg-guard-500x500.jpg",// "/api/placeholder/400/300", 
      description: "Ultra-bright LED headlights with adaptive beam technology and daytime running lights for superior night visibility.", 
      tags: ["Night Vision", "Efficiency", "Safety"], 
      rating: 4.5, 
      reviews: 128,
      type: "Lighting", 
      price: 189.99,
      originalPrice: 249.99,
      inStock: true,
      fastShipping: false,
      warranty: "2 Years",
      brand: "BrightBeam",
      compatibility: "Universal Fit"
    },
    { 
      id: 3,
      name: "Synthetic Motor Oil 5W-30", 
      image: "https://5.imimg.com/data5/NE/CN/UP/SELLER-43015722/motorcycle-leg-guard-500x500.jpg",// "/api/placeholder/400/300", 
      description: "Premium full synthetic motor oil with advanced additives for maximum engine protection and extended drain intervals.", 
      tags: ["Premium", "Performance", "Engine Care"], 
      rating: 4.8, 
      reviews: 892,
      type: "Oil", 
      price: 24.99,
      originalPrice: 34.99,
      inStock: true,
      fastShipping: true,
      warranty: "Performance Guarantee",
      brand: "MobilTech",
      compatibility: "Most Vehicles"
    },
    { 
      id: 4,
      name: "High Performance Engine Oil", 
      image: "https://5.imimg.com/data5/NE/CN/UP/SELLER-43015722/motorcycle-leg-guard-500x500.jpg",// "/api/placeholder/400/300", 
      description: "Racing-grade engine oil designed for high-performance vehicles with superior thermal stability and wear protection.", 
      tags: ["Performance", "Protection", "Engine Care"], 
      rating: 4.6, 
      reviews: 567,
      type: "Oil", 
      price: 39.99,
      originalPrice: 54.99,
      inStock: false,
      fastShipping: false,
      warranty: "1 Year",
      brand: "RaceOil",
      compatibility: "Sports Cars"
    },
    { 
      id: 5,
      name: "Carbon Fiber Side Mirrors", 
      image: "https://5.imimg.com/data5/NE/CN/UP/SELLER-43015722/motorcycle-leg-guard-500x500.jpg",// "/api/placeholder/400/300", 
      description: "Lightweight carbon fiber side mirrors with integrated turn signals and heated glass for all-weather performance.", 
      tags: ["Style", "Performance", "Modern"], 
      rating: 4.4, 
      reviews: 89,
      type: "Body", 
      price: 149.99,
      originalPrice: 199.99,
      inStock: true,
      fastShipping: true,
      warranty: "2 Years",
      brand: "CarbonPro",
      compatibility: "Luxury Models"
    },
    { 
      id: 6,
      name: "Xenon HID Kit", 
      image: "https://5.imimg.com/data5/NE/CN/UP/SELLER-43015722/motorcycle-leg-guard-500x500.jpg",// "/api/placeholder/400/300", 
      description: "Professional-grade HID conversion kit with ballasts and premium bulbs for 3x brighter illumination than halogen.", 
      tags: ["Bright", "Efficiency", "Professional"], 
      rating: 4.3, 
      reviews: 234,
      type: "Lighting", 
      price: 79.99,
      originalPrice: 109.99,
      inStock: true,
      fastShipping: false,
      warranty: "18 Months",
      brand: "XenonMax",
      compatibility: "Most Vehicles"
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
      <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2 border-b border-gray-700 pb-2">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );

  const CheckboxItem = ({ checked, onChange, label, count }) => (
    <label className="flex items-center justify-between cursor-pointer group py-1 hover:bg-gray-800/50 px-2 rounded transition-colors">
      <div className="flex items-center">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center transition-all ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-400 group-hover:border-blue-400'}`}>
          {checked && (<svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>)}
        </div>
        <span className="text-gray-300 group-hover:text-white transition-colors text-sm">{label}</span>
      </div>
      {count && <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">{count}</span>}
    </label>
  );

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FaFilter className="text-blue-400" /> 
          Filters
        </h2>
        {isMobile && (
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg">
            <FaTimes size={18} />
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <button onClick={clearAllFilters} className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2.5 px-4 rounded-lg transition-all duration-300 font-medium text-sm">
          Clear All ({selectedTypes.length + selectedTags.length + selectedBrands.length + (selectedPriceRange ? 1 : 0) + (inStockOnly ? 1 : 0) + (fastShippingOnly ? 1 : 0)})
        </button>
      )}

      <FilterSection title="Availability" icon={<FaCheckCircle className="text-green-400" />}>
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

      <FilterSection title="Part Type" icon={<FaWrench className="text-green-400" />}>
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

      <FilterSection title="Brands" icon={<FaCertificate className="text-purple-400" />}>
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

      <FilterSection title="Price Range" icon={<FaDollarSign className="text-yellow-400" />}>
        <div className="space-y-2">
          {PRICE_RANGES.map(range => (
            <label key={range.label} className="flex items-center cursor-pointer group py-1 hover:bg-gray-800/50 px-2 rounded transition-colors">
              <input 
                type="radio" 
                name="priceRange"
                checked={selectedPriceRange?.label === range.label} 
                onChange={() => setSelectedPriceRange(selectedPriceRange?.label === range.label ? null : range)} 
                className="sr-only" 
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${selectedPriceRange?.label === range.label ? 'bg-blue-600 border-blue-600' : 'border-gray-400 group-hover:border-blue-400'}`}>
                {selectedPriceRange?.label === range.label && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Tags" icon={<FaTag className="text-pink-400" />}>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {TAGS.map(tag => (
            <label key={tag} className="cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedTags.includes(tag)} 
                onChange={() => handleTagChange(tag)} 
                className="sr-only" 
              />
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedTags.includes(tag) 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 bg-slate-900/95 border-r border-blue-500/30 p-6 min-h-screen sticky top-0 backdrop-blur-xl">
          <FilterContent />
        </aside>

        {/* Mobile Sidebar */}
        <aside className={`lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-slate-900/98 backdrop-blur-xl border-r border-blue-500/30 p-6 z-50 transition-transform duration-300 shadow-2xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <FilterContent />
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && isMobile && (
          <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl mt-20 lg:text-4xl font-bold text-white mb-2"> Auto Parts</h1>
              <p className="text-gray-300">Find the best parts for your vehicle</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8" ref={searchRef}>
            <div className="relative max-w-2xl">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <input
                  type="text"
                  placeholder="Search auto parts, brands, or categories..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full pl-12 pr-24 py-4 bg-gradient-to-r from-slate-800 to-slate-700 border border-blue-500/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400 text-lg"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium"
                >
                  Search
                </button>
              </div>
              
              {/* Search Suggestions */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-blue-500/30 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center gap-3"
                    >
                      <FaSearch className="text-gray-500 text-sm" />
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
            className="lg:hidden fixed left-4 bottom-6 z-50 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
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
            <p className="text-gray-300">
              Showing <span className="text-white font-semibold">{filteredParts.length}</span> of {PARTS.length} parts
            </p>
          </div>

          {/* Parts Grid */}
          <div className="w-full max-h-[70vh] overflow-y-auto scrollbar-hide">
            <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20 lg:mb-0">
              {filteredParts.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <FaWrench className="mx-auto text-6xl text-gray-600 mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-400 mb-2">No parts found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more results</p>
                </div>
              ) : (
                filteredParts.map((part) => (
                  <div
                    key={part.id}
                    className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <img
                        src={
                        part.image}
                          // "https://5.imimg.com/data5/NE/CN/UP/SELLER-43015722/motorcycle-leg-guard-500x500.jpg"
                        alt={part.name}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Status Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                          <FaStar className="text-yellow-400 text-xs" />
                          {part.rating} ({part.reviews})
                        </div>
                        {!part.inStock && (
                          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Out of Stock
                          </div>
                        )}
                        {part.fastShipping && part.inStock && (
                          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <FaTruck className="text-xs" />
                            Fast Ship
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => toggleFavorite(part.id)}
                          className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${favorites.has(part.id) ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-red-500'}`}
                        >
                          <FaHeart size={14} />
                        </button>
                        <button className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-blue-500 transition-all duration-300">
                          <FaShare size={14} />
                        </button>
                        <button className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-gray-600 transition-all duration-300">
                          <FaEye size={14} />
                        </button>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-black/80 backdrop-blur-md text-white px-3 py-2 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-400">${part.price}</span>
                            {part.originalPrice > part.price && (
                              <span className="text-sm text-gray-400 line-through">${part.originalPrice}</span>
                            )}
                          </div>
                          {part.originalPrice > part.price && (
                            <div className="text-xs text-green-400">
                              Save ${(part.originalPrice - part.price).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                          {part.name}
                        </h3>
                      </div>

                      <p className="text-gray-400 text-sm line-clamp-2">{part.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-300">
                          <FaCogs className="text-blue-400" />
                          <span className="text-sm">{part.type}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-sm">{part.brand}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-300">
                          <FaCertificate className="text-purple-400" />
                          <span className="text-sm">{part.warranty}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-300">
                          <FaMapMarkerAlt className="text-red-400" />
                          <span className="text-sm">{part.compatibility}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {part.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full font-medium border border-blue-500/30">
                            {tag}
                          </span>
                        ))}
                        {part.tags.length > 2 && (
                          <span className="bg-gray-600/20 text-gray-400 text-xs px-2 py-1 rounded-full font-medium">
                            +{part.tags.length - 2}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button 
                          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                            part.inStock 
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105' 
                              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          }`}
                          disabled={!part.inStock}
                        >
                          <FaShoppingCart size={14} />
                          {part.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button className="p-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 hover:scale-105">
                          <FaThumbsUp size={14} />
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