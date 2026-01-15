"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaCar, FaBars, FaTimes, FaSearch, FaUser, FaHeart, FaMapMarkerAlt, FaChevronDown, FaMobileAlt, FaTools, FaChartBar, FaBoxes, FaCog, FaHome, FaEnvelope, FaPhone, FaSignOutAlt } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineCar } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';

// Navigation Data
const NAV_MENU = {
  "SPARE PARTS": [
    { label: "Engine Components", href: "/services?category=engine" },
    { label: "Brake Systems", href: "/services?category=brakes" },
    { label: "Suspension & Steering", href: "/services?category=suspension" },
    { label: "Electrical & Lights", href: "/services?category=electrical" },
    { label: "Body Parts", href: "/services?category=body" },
    { label: "Oils & Fluids", href: "/services?category=oils", highlight: true },
    { label: "Batteries", href: "/services?category=batteries" },
    { label: "Tyres & Rims", href: "/services?category=tyres" },
  ],
  "OUR SERVICES": [
    { label: "Periodic Maintenance", href: "/services#maintenance" },
    { label: "Denting & Painting", href: "/services#denting" },
    { label: "AC Service & Repair", href: "/services#ac" },
    { label: "Wheel Alignment", href: "/services#wheels" },
    { label: "Car Spa & Detailing", href: "/services#cleaning" },
    { label: "Insurance Claims", href: "/services#insurance" },
    { label: "Roadside Assistance", href: "/contact#emergency", highlight: true },
  ],
  "CARS": [
    { label: "All Cars", href: "/cars" },
    { label: "New Arrivals", href: "/cars?sort=newest" },
    { label: "Best Sellers", href: "/cars?sort=best_selling" },
  ],
  "GALLERY": [
    { label: "Shop Floor", href: "/gallery?filter=workshop" },
    { label: "Before & After", href: "/gallery?filter=transformations" },
    { label: "Team & Events", href: "/gallery?filter=team" },
    { label: "Customer Stories", href: "/gallery?filter=customers" },
  ],
  "PERFORMANCE": [
    { label: "Performance Tuning", href: "/performance" },
    { label: "Upgrades", href: "/performance#upgrades" },
  ],
  "ABOUT US": [
    { label: "Our Story", href: "/about" },
    { label: "Why Choose Us", href: "/about#why-us" },
  ],
  "CONTACT US": [
    { label: "Get In Touch", href: "/contact" },
    { label: "Locate Us", href: "/contact#map" },
    { label: "Support", href: "/contact#support" },
  ]
};


export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  
  // Redux Auth
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  // Admin check
  const isAdminSection = pathname?.startsWith('/admin');

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMenuOpen(false);
  }, [pathname]);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full bg-white z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
      >
        {/* ROW 1: Logo, Search, Actions */}
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => router.push('/')}>
              <img src="/Image/logo.png" alt="TusharAuto Logo" className="h-14 w-auto object-contain" />
            </div>

            {/* Search Bar (Hidden on Mobile) */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">

              <input
                type="text"
                placeholder="Search  or Ask a Question..."
                className="w-full pl-20 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
              <button className="absolute inset-y-0 right-0 px-4 text-gray-400 hover:text-red-600">
                <FaSearch />
              </button>
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
              <div className="relative group h-full flex items-center">
                <div className="flex items-center gap-1 cursor-pointer hover:text-red-600 py-2">
                  <span>Call Us</span>
                  <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-200" />
                </div>

                {/* Phone Dropdown */}
                <div className="absolute top-full right-0 w-48 bg-white border border-gray-100 shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-2 group-hover:translate-y-0">
                  <div className="flex flex-col">
                    <a href="tel:9719167530" className="px-4 py-3 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors font-bold flex items-center gap-2">
                      <FaMobileAlt className="text-gray-400" /> +91 97191 67530
                    </a>
                    <a href="tel:9758751630" className="px-4 py-3 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors font-bold flex items-center gap-2">
                      <FaPhone className="text-gray-400" /> +91 97587 51630
                    </a>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                <FaHeart size={18} />
              </button>
              
              {isAuthenticated && user ? (
                 <div className="relative group/auth h-full flex items-center">
                    <button className="flex items-center gap-2 hover:text-red-600 transition-colors font-bold">
                        <FaUser size={18} />
                        <span>Hi, {user.name.split(' ')[0]}</span>
                    </button>
                    {/* User Dropdown */}
                    <div className="absolute top-full right-0 w-40 bg-white border border-gray-100 shadow-xl rounded-lg py-2 opacity-0 invisible group-hover/auth:opacity-100 group-hover/auth:visible transition-all duration-200 z-50 transform translate-y-2 group-hover/auth:translate-y-0">
                         <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50 flex items-center gap-2"
                         >
                            <FaSignOutAlt /> Logout
                         </button>
                    </div>
                 </div>
              ) : (
                  <Link href="/login" className="flex items-center gap-2 hover:text-red-600 transition-colors">
                    <FaUser size={18} />
                    <span>Login / Register</span>
                  </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-gray-700 p-2" onClick={() => setMenuOpen(true)}>
              <FaBars size={24} />
            </button>
          </div>
        </div>

        {/* ROW 2: Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:block border-b border-gray-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">

            {/* Nav Menus */}
            <nav className="flex items-center h-full">
              {Object.keys(NAV_MENU).map((menu) => (
                <div
                  key={menu}
                  className="group h-full"
                  onMouseEnter={() => setActiveDropdown(menu)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`h-full px-4 flex items-center gap-1 text-xs font-bold tracking-wide transition-colors ${activeDropdown === menu ? 'text-red-600' : 'text-gray-800 group-hover:text-red-600'}`}
                  >
                    {menu}
                    <FaChevronDown size={10} className={`transform transition-transform duration-200 ${activeDropdown === menu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Hover Line */}
                  <div className={`absolute bottom-0 h-0.5 bg-red-600 transition-all duration-300 ${activeDropdown === menu ? 'w-full opacity-100' : 'w-0 opacity-0'} left-0`} style={{ width: activeDropdown === menu ? '100px' : '0' }} /> {/* Note: Width is tricky with absolute, relying on group hover for border-bottom on button might be better, but we stick to the plan */}
                </div>
              ))}
              {isAdminSection && (
                <Link href="/admin" className="h-full px-4 flex items-center gap-1 text-xs font-bold text-red-600 tracking-wide">
                  ADMIN
                </Link>
              )}
            </nav>

            {/* Location Selector */}
            <button className="flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-black">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>Select City</span>
              <FaChevronDown size={10} />
            </button>
          </div>

          {/* MEGA MENU DROPDOWN */}
          {/* MEGA MENU DROPDOWN */}
          {activeDropdown && NAV_MENU[activeDropdown] && (
            <div
              className="absolute top-full left-0 w-full bg-white border-b border-t border-gray-100 shadow-xl z-40 animate-in fade-in slide-in-from-top-1 duration-200"
              onMouseEnter={() => setActiveDropdown(activeDropdown)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="max-w-7xl mx-auto px-8 py-6">
                <div className="flex">
                  {/* List Column */}
                  <div className="w-1/4 border-r border-gray-100 pr-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{activeDropdown}</h3>
                    <ul className="space-y-3">
                      {NAV_MENU[activeDropdown].map((item, idx) => (
                        <li key={idx}>
                          <Link
                            href={item.href}
                            className={`flex items-center justify-between group text-sm font-medium transition-colors ${item.highlight ? 'text-gray-900' : 'text-gray-600 hover:text-red-600'}`}
                          >
                            <span>{item.label}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 text-xs">→</span>
                            {item.highlight && <span className="ml-2 text-[10px] bg-yellow-100 text-yellow-700 px-1 rounded">HOT</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Featured Column */}
                  <div className="w-3/4 pl-8">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      {activeDropdown === "SPARE PARTS" ? "Best Selling Parts" : activeDropdown === "OUR SERVICES" ? "Popular Packages" : "Highlights"}
                    </h3>
                    <div className="grid grid-cols-3 gap-6">
                      {/* Dynamic Content based on Dropdown */}
                      {(activeDropdown === "SPARE PARTS" ? [
                        { title: "Synthetic Engine Oil", price: "$45", img: "https://pngimg.com/uploads/motor_oil/motor_oil_PNG36.png" },
                        { title: "Ceramic Brake Pads", price: "$80", img: "https://pngimg.com/uploads/disc_brake/disc_brake_PNG33.png", tag: "Best Seller" },
                        { title: "High Performance Tires", price: "$120", img: "https://pngimg.com/uploads/tires/tires_PNG31.png" }
                      ] : activeDropdown === "OUR SERVICES" ? [
                        { title: "Full System Audit", price: "Free", img: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=300" },
                        { title: "AC Disinfection", price: "$30", img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=300", tag: "Summer Special" },
                        { title: "Paint Protection", price: "$200", img: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=300" }
                      ] : [
                        { title: "Advanced Workshop", img: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80&w=300" },
                        { title: "Happy Customers", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=300" },
                        { title: "Expert Team", img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=300" }
                      ]).map((item, i) => (
                        <div key={i} className="group cursor-pointer">
                          <div className="bg-gray-100 rounded-xl h-32 mb-3 overflow-hidden relative border border-gray-100">
                            <img src={item.img} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform mix-blend-multiply" />
                            {item.tag && <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">{item.tag}</span>}
                          </div>
                          <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors text-sm">{item.title}</h4>
                          {item.price && <p className="text-xs text-gray-500">From {item.price}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MOBILE DRAWER (Preserved Logic) */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

          {/* Drawer */}
          <div className="relative w-[300px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <img src="/Image/logo.png" alt="TusharAuto Logo" className="h-10 w-auto object-contain" />
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-red-600">
                <FaTimes size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Search Mobile */}
              <div className="relative">
                <input type="text" placeholder="Search..." className="w-full bg-gray-100 border-none rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-red-500" />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Menus */}
              <div className="space-y-1">
                {Object.keys(NAV_MENU).map((menu) => (
                  <div key={menu} className="border-b border-gray-50 last:border-0">
                    <button
                      className="w-full flex items-center justify-between py-3 text-sm font-bold text-gray-800 hover:text-red-600"
                      onClick={() => toggleDropdown(menu)}
                    >
                      {menu}
                      <FaChevronDown className={`transform transition-transform ${activeDropdown === menu ? 'rotate-180' : ''} text-gray-400`} size={12} />
                    </button>

                    {activeDropdown === menu && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-2 space-y-2">
                        {NAV_MENU[menu].map((item, idx) => (
                          <Link key={idx} href={item.href} onClick={() => setMenuOpen(false)} className="block text-sm text-gray-600 hover:text-red-600 py-1 pl-2 border-l-2 border-transparent hover:border-red-600">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link href="/services" onClick={() => setMenuOpen(false)} className="w-full flex items-center justify-between py-3 text-sm font-bold text-gray-800 hover:text-red-600 border-b border-gray-50">
                  SERVICES
                </Link>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              {isAuthenticated && user ? (
                 <div className="mb-3 space-y-2">
                    <div className="text-center font-bold text-gray-900 pb-2">Hi, {user.name}</div>
                    <button 
                        onClick={handleLogout}
                        className="w-full py-3 bg-red-100 text-red-600 font-bold rounded-lg shadow-sm flex items-center justify-center gap-2"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                 </div>
              ) : (
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="block w-full py-3 bg-red-600 text-white font-bold rounded-lg mb-3 shadow-md text-center">
                    Login / Register
                  </Link>
              )}
              
              <div className="flex justify-center gap-6 text-gray-500">
                <FaHeart size={20} />
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt /> <span className="text-xs font-semibold">Select City</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
