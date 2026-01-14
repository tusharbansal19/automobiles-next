"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaCar, FaBars, FaTimes, FaSearch, FaUser, FaHeart, FaMapMarkerAlt, FaChevronDown, FaMobileAlt, FaTools, FaChartBar, FaBoxes, FaCog, FaHome, FaEnvelope } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineCar } from 'react-icons/ai';

// Navigation Data
const NAV_MENU = {
  "NEW CARS": [
    { label: "Explore New Cars", href: "/cars/new" },
    { label: "Electric Cars", href: "/cars/electric" },
    { label: "Popular Cars", href: "/cars/popular" },
    { label: "Upcoming Cars", href: "/cars/upcoming" },
    { label: "New Launches", href: "/cars/launches" },
    { label: "Car Insurance", href: "/insurance", highlight: true },
    { label: "Popular Brands", href: "/brands" },
    { label: "Compare Cars", href: "/compare" },
    { label: "Find Car Dealers", href: "/dealers" },
  ],
  "USED CARS": [
    { label: "Buy Used Cars", href: "/cars/used" },
    { label: "Sell My Car", href: "/sell" },
    { label: "Car Valuation", href: "/valuation" },
    { label: "Used Car Dealers", href: "/used-dealers" },
  ],
  "NEWS & REVIEWS": [
    { label: "Car News", href: "/news" },
    { label: "Car Reviews", href: "/reviews" },
    { label: "Video Reviews", href: "/videos" },
  ],
  "VIDEOS": [
    { label: "New Tech", href: "/videos/tech" },
    { label: "Test Drives", href: "/videos/test-drives" },
  ]
};

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

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
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <select className="bg-transparent text-sm text-gray-500 font-medium focus:outline-none border-r border-gray-200 pr-2 cursor-pointer">
                  <option>All</option>
                  <option>New</option>
                  <option>Used</option>
                </select>
              </div>
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
              <div className="flex items-center gap-1 cursor-pointer hover:text-red-600">
                <span>English</span>
                <FaChevronDown size={10} />
              </div>
              <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                <FaHeart size={18} />
              </button>
              <button className="flex items-center gap-2 hover:text-red-600 transition-colors">
                <FaUser size={18} />
                <span>Login / Register</span>
              </button>
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
              <Link href="/services" className="h-full px-4 flex items-center gap-1 text-xs font-bold text-gray-800 hover:text-red-600 tracking-wide">
                SERVICES
              </Link>
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
                            {item.highlight && <span className="ml-2 text-[10px] bg-yellow-100 text-yellow-700 px-1 rounded">AD</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Featured Column (Mock Content based on menu) */}
                  <div className="w-3/4 pl-8">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Trending in {activeDropdown}</h3>
                    <div className="grid grid-cols-3 gap-6">
                      {/* Dummy trending items */}
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="group cursor-pointer">
                          <div className="bg-gray-100 rounded-lg h-32 mb-3 overflow-hidden relative">
                            <img src={`https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            {i === 1 && <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>}
                          </div>
                          <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">2026 Sports Model {i}</h4>
                          <p className="text-xs text-gray-500">Starts at $45,000</p>
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
              <button className="w-full py-3 bg-red-600 text-white font-bold rounded-lg mb-3 shadow-md">Login / Register</button>
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
