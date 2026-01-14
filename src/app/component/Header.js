"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaCar, FaBars, FaTimes, FaHome, FaTools, FaInfoCircle, FaEnvelope, FaChartBar, FaBoxes, FaCog } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineCar } from 'react-icons/ai';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const menuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're in admin section
  const isAdminSection = pathname?.startsWith('/admin');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prefetch important routes
  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/cars');
    router.prefetch('/services');
    router.prefetch('/about');
    router.prefetch('/contact');
  }, [router]);

  // Show loader on route change
  useEffect(() => {
    const handleStart = (url) => {
      if (url !== pathname) setLoading(true);
    };
    const handleComplete = () => setLoading(false);
  }, [pathname, router]);

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowHeader(false); // scroll down
      } else {
        setShowHeader(true); // scroll up
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // User placeholder
  const user = {
    name: 'Tushar',
    email: 'tushar@email.com',
    image: null
  };

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin', icon: <FaChartBar size={20} /> },
    { name: 'Inventory', path: '/admin/inventory', icon: <FaBoxes size={20} /> },
    { name: 'Monitoring', path: '/admin/monitoring', icon: <FaCog size={20} /> },
  ];

  const regularNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Cars', path: '/cars' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const navItems = isAdminSection ? adminNavItems : regularNavItems;

  return (
    <>
      {/* Top Loader Bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 h-1.5 z-[9999] bg-blue-600 animate-pulse transition-all duration-300" />
      )}

      <header
        className={`fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md text-gray-900 shadow-sm border-b border-gray-100 z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo Section */}
            <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <FaCar size={24} className="text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                Tushar<span className="text-red-600">Auto</span>
                {isAdminSection && <span className="text-xs ml-2 bg-gray-800 px-2 py-0.5 rounded text-white uppercase tracking-wider">Admin</span>}
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative cursor-pointer"
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center gap-2 text-sm font-bold transition-colors duration-300 ${isActive ? 'text-red-600' : 'text-gray-600 hover:text-black'}`}
                    >
                      {isAdminSection && item.icon}
                      {item.name}
                    </Link>
                    {/* Hover Line */}
                    <span
                      className={`absolute left-0 -bottom-1 h-0.5 bg-red-600 transition-all duration-300 ${hovered === index || isActive ? 'w-full' : 'w-0'}`}
                    />
                  </div>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 focus:outline-none hover:opacity-80 transition-opacity"
                >
                  {user.image ? (
                    <img src={user.image} alt="Profile" className="w-9 h-9 rounded-full border-2 border-gray-200" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-800 border border-gray-200 flex items-center justify-center font-bold text-sm shadow-sm hover:shadow-md transition-all">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl overflow-hidden py-2 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-black/5">
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button onClick={() => { setProfileOpen(false); router.push('/profile'); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">Profile</button>
                    <button onClick={() => { setProfileOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors">Logout</button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-600 hover:text-black p-2"
              >
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-[280px] h-full bg-white text-gray-900 z-50 shadow-2xl transform transition-transform duration-300 ease-out border-r border-gray-100 ${menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center space-x-2 mb-8 border-b border-gray-100 pb-6">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <FaCar size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Tushar<span className="text-red-600">Auto</span></span>
          </div>

          <div className="flex flex-col space-y-2 flex-grow">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={index}
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}
                >
                  {item.icon || <FaTools size={16} className={isActive ? 'text-red-600' : 'text-gray-400'} />}
                  <span className={isActive ? 'font-medium' : ''}>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-gray-100 pt-6 mt-6 bg-gray-50 -mx-6 px-6 pb-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold border border-gray-300">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav (Optional) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 flex justify-around items-center py-2 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {(!isAdminSection ? [
          { name: 'Home', path: '/', icon: <AiOutlineHome size={22} />, activeIcon: <FaHome size={22} /> },
          { name: 'Services', path: '/services', icon: <FaTools size={20} />, activeIcon: <FaTools size={20} /> },
          { name: 'Cars', path: '/cars', icon: <AiOutlineCar size={22} />, activeIcon: <FaCar size={22} /> },
          { name: 'Contact', path: '/contact', icon: <FaEnvelope size={20} />, activeIcon: <FaEnvelope size={20} /> },
        ] : adminNavItems
        ).map((item, idx) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={idx}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full py-1 ${isActive ? 'text-red-600' : 'text-gray-400'}`}
            >
              <span className="mb-1 transform transition-transform duration-200 active:scale-95">{isActive ? (item.activeIcon || item.icon) : item.icon}</span>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </>
  );
} 
