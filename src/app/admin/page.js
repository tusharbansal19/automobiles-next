'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Package, 
  AlertTriangle, 
  XCircle, 
  DollarSign, 
  Plus, 
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { 
  selectInventoryStats, 
  selectLowStockParts,
  selectFilteredParts,
  selectFilters,
  setFilters,
  clearFilters
} from '../../store/inventorySlice';
import Link from 'next/link';
import AdminSidebar from '../component/AdminSidebar';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const stats = useSelector(selectInventoryStats);
  const lowStockParts = useSelector(selectLowStockParts);
  const filteredParts = useSelector(selectFilteredParts);
  const filters = useSelector(selectFilters);
  
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setFilters({ search: searchTerm }));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, dispatch]);

  const statCards = [
    {
      title: 'Total Parts',
      value: stats.totalParts,
      icon: Package,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-500/30',
      trend: '+5%',
      trendUp: true,
    },
    {
      title: 'Low Stock',
      value: stats.lowStock,
      icon: AlertTriangle,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10',
      borderColor: 'border-yellow-500/30',
      trend: '+2',
      trendUp: false,
    },
    {
      title: 'Out of Stock',
      value: stats.outOfStock,
      icon: XCircle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-red-500/10 to-pink-500/10',
      borderColor: 'border-red-500/30',
      trend: '-1',
      trendUp: true,
    },
    {
      title: 'Total Value',
      value: `$${stats.totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-500/30',
      trend: '+12%',
      trendUp: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <AdminSidebar />
      
      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm border-b border-blue-800/50 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Dashboard Overview
                </h1>
                <p className="text-blue-300/80 mt-1">Manage your automobile spare parts inventory</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link 
                  href="/admin/add-part"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105"
                >
                  <Plus size={20} />
                  Add Part
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`${stat.bgColor} ${stat.borderColor} border rounded-2xl p-6 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-blue-300/80">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="flex items-center">
                  {stat.trendUp ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <span className={`text-xs ml-2 font-medium ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.trend}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Search and Filters */}
          <motion.div 
            className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm rounded-2xl border border-blue-800/50 p-6 mb-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search parts by name, model, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-blue-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-blue-300/60 backdrop-blur-sm"
                />
              </div>
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 text-blue-300 hover:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter size={16} />
                Filters
              </motion.button>
              <motion.button
                onClick={() => {
                  dispatch(clearFilters());
                  setSearchTerm('');
                }}
                className="px-6 py-3 text-blue-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear
              </motion.button>
            </div>
          </motion.div>

          {/* Low Stock Alerts */}
          {lowStockParts.length > 0 && (
            <motion.div 
              className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm rounded-2xl border border-yellow-500/30 p-6 mb-8 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                Low Stock Alerts ({lowStockParts.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lowStockParts.slice(0, 6).map((part, index) => (
                  <motion.div
                    key={part.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{part.name}</h3>
                        <p className="text-sm text-blue-300/80">{part.model}</p>
                        <p className="text-sm text-blue-300/80">{part.type}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        part.status === 'Out of Stock' 
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {part.status}
                      </span>
                    </div>
                    <div className="mt-3 text-sm">
                      <span className="text-blue-300/80">Stock: </span>
                      <span className="font-medium text-white">{part.currentStock}/{part.minStock}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              {lowStockParts.length > 6 && (
                <div className="mt-6 text-center">
                  <Link 
                    href="/admin/monitoring"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline transition-colors"
                  >
                    View all {lowStockParts.length} alerts →
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* Recent Parts */}
          <motion.div 
            className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm rounded-2xl border border-blue-800/50 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="p-6 border-b border-blue-800/50">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-400" />
                Recent Parts
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Part Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-800/30">
                  {filteredParts.slice(0, 10).map((part, index) => (
                    <motion.tr
                      key={part.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">{part.name}</div>
                          <div className="text-sm text-blue-300/80">{part.type}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white">{part.model}</td>
                      <td className="px-6 py-4 text-sm text-white">{part.currentStock}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          part.status === 'OK' 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : part.status === 'Low Stock'
                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}>
                          {part.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white">${part.sellingPrice}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredParts.length > 10 && (
              <div className="p-6 border-t border-blue-800/50 text-center">
                <Link 
                  href="/admin/inventory"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline transition-colors"
                >
                  View all {filteredParts.length} parts →
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 