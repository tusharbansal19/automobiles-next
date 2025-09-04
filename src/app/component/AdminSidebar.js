'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  AlertTriangle,
  Settings,
  LogOut,
  Sparkles,
  Plus,
  Menu,
  X
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      description: 'Overview and quick stats'
    },
    {
      name: 'Inventory',
      href: '/admin/inventory',
      icon: Package,
      description: 'Manage all parts'
    },
    {
      name: 'Monitoring',
      href: '/admin/monitoring',
      icon: AlertTriangle,
      description: 'Stock alerts and tracking'
    },
    {
      name: 'Add Part',
      href: '/admin/add-part',
      icon: Plus,
      description: 'Add new spare part'
    }
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 border-r border-blue-800/50 fixed left-0 top-0 h-full z-40">
        {/* Logo Section */}
        <div className="p-6 border-b border-blue-800/50">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tushar Automobiles
              </h1>
              <p className="text-xs text-blue-300/80">Admin Panel</p>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    active
                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 shadow-lg shadow-blue-500/20'
                      : 'text-blue-300 hover:text-white hover:bg-blue-500/10 border border-transparent hover:border-blue-400/30'
                  }`}
                >
                  <Icon size={18} className={active ? 'text-blue-400' : ''} />
                  <span>{item.name}</span>
                  {active && (
                    <motion.div
                      layoutId="activeSidebarTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-400/30"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {item.description}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-blue-800/50 space-y-2">
          <motion.button 
            className="w-full flex items-center gap-3 px-4 py-3 text-blue-300 hover:text-white hover:bg-blue-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-400/30"
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Settings size={18} />
            <span>Settings</span>
          </motion.button>
          <motion.button 
            className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-red-400/30"
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 border-r border-blue-800/50 z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-blue-800/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Admin Panel
                    </h1>
                    <p className="text-xs text-blue-300/80">Tushar Automobiles</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-blue-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        active
                          ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30'
                          : 'text-blue-300 hover:text-white hover:bg-blue-500/10'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-blue-800/50 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-blue-300 hover:text-white hover:bg-blue-500/10 rounded-xl transition-all duration-300">
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-xl transition-all duration-300">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-gradient-to-r from-slate-900 to-blue-950 border-t border-blue-800/50 z-40 backdrop-blur-lg">
        <div className="flex justify-around items-center py-2">
          {navItems.slice(0, 4).map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center p-2 rounded-lg transition-all duration-300 group"
              >
                <div className={`relative p-2 rounded-lg transition-all duration-300 ${
                  active 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400' 
                    : 'text-blue-300 group-hover:text-blue-400 group-hover:bg-blue-500/10'
                }`}>
                  <Icon size={20} />
                  {active && (
                    <motion.div
                      layoutId="activeBottomTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
                <span className={`text-xs mt-1 transition-all duration-300 ${
                  active ? 'text-blue-400 font-medium' : 'text-blue-300 group-hover:text-blue-400'
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
} 