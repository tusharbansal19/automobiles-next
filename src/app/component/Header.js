"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaCar, FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
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
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          {[
            { name: 'Home', path: '/' },
            { name: 'Cars', path: '/cars' },
            { name: 'Services', path: '/services' },
            { name: 'About Us', path: '/about' },
            { name: 'Contact', path: '/contact' },
          ].map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHovered(index)}

              onMouseLeave={() => setHovered(null)}
              className="relative cursor-pointer text-blue-100 hover:text-blue-400 transition duration-300"
            >
              <Link href={item.path} prefetch={true}>{item.name}</Link>
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
        <div className="flex items-center space-x-4">
          <FaSearch size={20} className="cursor-pointer text-blue-300 hover:text-blue-400 transition duration-300" />
          <FaUser size={20} className="cursor-pointer text-blue-300 hover:text-blue-400 transition duration-300" />
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
          {[
            { name: 'Home', path: '/' },
            { name: 'Cars', path: '/cars' },
            { name: 'Services', path: '/services' },
            { name: 'About Us', path: '/about' },
            { name: 'Contact', path: '/contact' },
          ].map((item, index) => (
            <Link key={index} href={item.path} prefetch={true} onClick={() => setMenuOpen(false)}>
              <div className="text-white text-lg font-semibold hover:bg-blue-700 hover:text-white py-3 px-4 rounded-lg transition duration-300 cursor-pointer">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
