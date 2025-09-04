"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaCar, FaSearch, FaUser, FaBars, FaTimes, FaHome, FaTools, FaInfoCircle, FaRegEnvelope, FaEnvelope, FaUserTie, FaRegUser, FaCog, FaChartBar, FaBoxes } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineCar } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

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
  const isAdminSection = pathname.startsWith('/admin');

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
    router.prefetch('/admin');
    router.prefetch('/admin/inventory');
    router.prefetch('/admin/monitoring');
  }, [router]);

  // Show loader on route change
  useEffect(() => {
    const handleStart = (url) => {
      if (url !== pathname) setLoading(true);
    };
    const handleComplete = () => setLoading(false);
    router.events?.on?.('routeChangeStart', handleStart);
    router.events?.on?.('routeChangeComplete', handleComplete);
    router.events?.on?.('routeChangeError', handleComplete);
    return () => {
      router.events?.off?.('routeChangeStart', handleStart);
      router.events?.off?.('routeChangeComplete', handleComplete);
      router.events?.off?.('routeChangeError', handleComplete);
    };
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
    image: null // or a string URL
  };

  // Profile dropdown state
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  // Admin navigation items
  const adminNavItems = [
    { name: 'Dashboard', path: '/admin', icon: <FaChartBar size={20} /> },
    { name: 'Inventory', path: '/admin/inventory', icon: <FaBoxes size={20} /> },
    { name: 'Monitoring', path: '/admin/monitoring', icon: <FaCog size={20} /> },
  ];

  // Regular navigation items
  const regularNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Cars', path: '/cars' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (<>
    {/* Top Loader Bar */}
    {loading && (
      <div className="fixed top-0 left-0 w-full h-1.5 z-[9999] bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 animate-pulse transition-all duration-300" />
    )}
    <header className={`fixed top-0 left-0 w-full bg-gradient-to-r from-black to-blue-900 bg-opacity-10 backdrop-blur-lg border-b-2 border-blue-400 text-white p-4 z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <FaCar size={28} className="text-blue-300" />
          <span className="text-xl font-semibold tracking-wide">
            Tushar Automobiles
            {isAdminSection && <span className="text-sm text-blue-400 ml-2">Admin</span>}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          {(isAdminSection ? adminNavItems : regularNavItems).map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className="relative cursor-pointer text-blue-100 hover:text-blue-400 transition duration-300"
            >
              <Link href={item.path} prefetch={true} className="flex items-center gap-2">
                {isAdminSection && item.icon}
                {item.name}
              </Link>
              {hovered === index && (
                <>
                  {/* Moving Box Effect */}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-400 scale-x-100 transition-transform" />
                  {/* Hover Popup */}
                  <div className="absolute left-0 top-full mt-2 w-40 p-2 bg-gradient-to-br from-black to-blue-900 text-white rounded-lg shadow-lg backdrop-blur-md">
                    <p className="text-sm">Explore {item.name} in detail!</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-4 hidden md:flex">
          {/* <FaSearch size={20} className="cursor-pointer text-blue-300 hover:text-blue-400 transition duration-300" /> */}
          {/* Profile Avatar Dropdown (Desktop) */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center justify-center focus:outline-none"
            >
            
              {user.image ? (
                <div className="w-8 h-8 rounded-full border border-blue-200 overflow-hidden bg-white flex items-center justify-center">
                  <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full border border-blue-200 bg-gradient-to-br from-blue-400 to-blue-900 flex items-center justify-center text-white font-bold text-base">
                  {user.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
            </button>
            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute top-12 right-0 w-48 rounded-xl shadow-xl border border-blue-100 z-50 p-4 animate-fade-in flex flex-col items-start bg-white/60 backdrop-blur-md bg-gradient-to-br from-white/60 to-blue-100/40">
                <div className="flex items-center mb-3 w-full">
                  {user.image ? (
                    <img src={user.image} alt="Profile" className="w-10 h-10 rounded-full border border-blue-300 object-cover mr-2" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-900 flex items-center justify-center text-white font-bold text-lg mr-2">
                      {user.name?.[0]?.toUpperCase() || '?'}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
                <button onClick={() => { setProfileOpen(false); router.push('/profile'); }} className="w-full text-left py-1 px-2 rounded transition hover:bg-blue-100/60 hover:ring-2 hover:ring-blue-300 text-blue-700 text-sm mb-1">View Profile</button>
                <button onClick={() => { setProfileOpen(false); /* handle logout here */ }} className="w-full text-left py-1 px-2 rounded transition hover:bg-blue-100/60 hover:ring-2 hover:ring-blue-300 text-blue-700 text-sm">Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-blue-300">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
    </header>
    
    <div
        ref={menuRef}
        className={`fixed top-[40px] left-0 w-[300px] h-full bg-gradient-to-r from-black to-blue-950  z-40 shadow-xl transform transition-transform duration-300 border-r-blue-400  ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className=" flex flex-col space-y-6 h-full bg-blue-950 bg-opacity-10 p-8 shadow-lg border-r-2 border-blue-400">
          {(isAdminSection ? adminNavItems : regularNavItems).map((item, index) => (
            <Link key={index} href={item.path} prefetch={true} onClick={() => setMenuOpen(false)}>
              <div className="text-white text-lg font-semibold hover:bg-blue-700 hover:text-white py-3 px-4 rounded-lg transition duration-300 cursor-pointer flex items-center gap-3">
                {isAdminSection && item.icon}
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

    {/* Mobile Bottom Navigator */}
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-gradient-to-r from-black to-blue-900 border-t-2 border-blue-400 z-50 flex items-center py-1 backdrop-blur-lg px-1">
      <div className="flex justify-around flex-1 gap-x-1">
        {(isAdminSection ? adminNavItems : [
          {
            name: 'Home',
            path: '/',
            icon: <AiOutlineHome size={20} />,
            activeIcon: <FaHome size={20} />,
          },
          {
            name: 'Cars',
            path: '/cars',
            icon: <AiOutlineCar size={20} />,
            activeIcon: <FaCar size={20} />,
          },
          {
            name: 'Services',
            path: '/services',
            icon: <FaTools size={20} />,
            activeIcon: <FaTools size={20} />,
          },
          {
            name: 'About',
            path: '/about',
            icon: <FaInfoCircle size={20} />,
            activeIcon: <FaInfoCircle size={20} />,
          },
          {
            name: 'Contact',
            path: '/contact',
            icon: <FaRegEnvelope size={20} />,
            activeIcon: <FaEnvelope size={20} />,
          },
        ]).map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className="flex flex-col items-center focus:outline-none relative group px-0.5"
              style={{ minWidth: 44 }}
            >
              {/* Circular bright overlay for active */}
              {isActive && (
                <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-400/30 blur-md animate-pulse z-[-1]" />
              )}
              <span
                className={`transition-all duration-300 ${isActive ? 'text-blue-400' : 'text-blue-200 group-hover:text-blue-400'}`}
                style={{ filter: isActive ? 'drop-shadow(0 0 6px #60a5fa)' : 'none' }}
              >
                {isActive ? (item.activeIcon || item.icon) : item.icon}
              </span>
              <span className={`text-[10px] mt-0.5 transition-all duration-300 ${isActive ? 'text-blue-400 font-bold' : 'text-blue-200 group-hover:text-blue-400'}`}>{item.name}</span>
              {/* Animated underline */}
              <span
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-blue-400 transition-all duration-300 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
              />
            </button>
          );
        })}
      </div>
      {/* Profile Section on the right */}
      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setProfileOpen((v) => !v)}
          className="flex flex-col items-center focus:outline-none relative group ml-1 px-0.5"
          style={{ minWidth: 44 }}
        >
          {/* Circular bright overlay for active */}
          {pathname === '/profile' && (
            <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-400/30 blur-md animate-pulse z-[-1]" />
          )}
          <span className="transition-all duration-300 flex items-center justify-center">
            {user.image ? (
              <div className={`w-8 h-8 rounded-full border ${pathname === '/profile' ? 'border-blue-400 shadow-lg' : 'border-blue-200'} overflow-hidden bg-white flex items-center justify-center`}>
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={`w-8 h-8 rounded-full border ${pathname === '/profile' ? 'border-blue-400 shadow-lg' : 'border-blue-200'} bg-gradient-to-br from-blue-400 to-blue-900 flex items-center justify-center text-white font-bold text-base`}>
                {user.name?.[0]?.toUpperCase() || '?'}
              </div>
            )}
          </span>
          <span className={`text-[10px] mt-0.5 transition-all duration-300 ${pathname === '/profile' ? 'text-blue-400 font-bold' : 'text-blue-200 group-hover:text-blue-400'}`}>Profile</span>
        </button>
        {/* Dropdown */}
        {profileOpen && (
          <div className="absolute bottom-12 right-0 w-48 rounded-xl shadow-xl border border-blue-100 z-50 p-4 animate-fade-in flex flex-col items-start bg-white/60 backdrop-blur-md bg-gradient-to-br from-white/60 to-blue-100/40">
            <div className="flex items-center mb-3 w-full">
              {user.image ? (
                <img src={user.image} alt="Profile" className="w-10 h-10 rounded-full border border-blue-300 object-cover mr-2" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-900 flex items-center justify-center text-white font-bold text-lg mr-2">
                  {user.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <div>
                <div className="font-semibold text-gray-900 text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
            <button onClick={() => { setProfileOpen(false); router.push('/profile'); }} className="w-full text-left py-1 px-2 rounded transition hover:bg-blue-100/60 hover:ring-2 hover:ring-blue-300 text-blue-700 text-sm mb-1">View Profile</button>
            <button onClick={() => { setProfileOpen(false); /* handle logout here */ }} className="w-full text-left py-1 px-2 rounded transition hover:bg-blue-100/60 hover:ring-2 hover:ring-blue-300 text-blue-700 text-sm">Logout</button>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
