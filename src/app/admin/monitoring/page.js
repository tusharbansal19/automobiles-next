'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  XCircle, 
  TrendingDown, 
  TrendingUp,
  Plus,
  RefreshCw,
  Bell,
  Package,
  DollarSign,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { 
  selectLowStockParts,
  selectInventoryStats,
  selectAllParts,
  updateStock
} from '../../../store/inventorySlice';
import AdminSidebar from '../../component/AdminSidebar';

export default function MonitoringPage() {
  const dispatch = useDispatch();
  const lowStockParts = useSelector(selectLowStockParts);
  const stats = useSelector(selectInventoryStats);
  const allParts = useSelector(selectAllParts);
  
  const [selectedPart, setSelectedPart] = useState(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');

  const outOfStockParts = lowStockParts.filter(part => part.status === 'Out of Stock');
  const criticalLowStockParts = lowStockParts.filter(part => part.status === 'Low Stock');

  const handleStockUpdate = (part) => {
    setSelectedPart(part);
    setStockQuantity(1);
    setShowStockModal(true);
  };

  const confirmStockUpdate = () => {
    if (selectedPart && stockQuantity > 0) {
      dispatch(updateStock({
        id: selectedPart.id,
        quantity: parseInt(stockQuantity),
        operation: 'add'
      }));
      setShowStockModal(false);
      setSelectedPart(null);
      setStockQuantity(1);
    }
  };

  const getFilteredParts = () => {
    switch (filterStatus) {
      case 'out-of-stock':
        return outOfStockParts;
      case 'low-stock':
        return criticalLowStockParts;
      default:
        return lowStockParts;
    }
  };

  const alertCards = [
    {
      title: 'Out of Stock',
      count: outOfStockParts.length,
      icon: XCircle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-red-500/10 to-pink-500/10',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-300',
      description: 'Parts with zero stock'
    },
    {
      title: 'Low Stock',
      count: criticalLowStockParts.length,
      icon: AlertTriangle,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10',
      borderColor: 'border-yellow-500/30',
      textColor: 'text-yellow-300',
      description: 'Parts below minimum stock'
    },
    {
      title: 'Total Alerts',
      count: lowStockParts.length,
      icon: Bell,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-300',
      description: 'All stock alerts'
    }
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
        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm border-b border-blue-800/50 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Stock Monitoring
                </h1>
                <p className="text-blue-300/80 mt-1">Monitor and manage low stock alerts</p>
              </motion.div>
              <motion.button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw size={20} />
                Refresh
              </motion.button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Alert Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {alertCards.map((alert, index) => (
              <motion.div
                key={alert.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`${alert.bgColor} ${alert.borderColor} border rounded-2xl p-6 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-300/80">{alert.title}</p>
                    <p className="text-3xl font-bold text-white mt-1">{alert.count}</p>
                    <p className="text-xs text-blue-300/60">{alert.description}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${alert.color} shadow-lg`}>
                    <alert.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div 
            className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm rounded-2xl border border-blue-800/50 p-6 mb-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-blue-400" />
              Inventory Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{stats.totalParts}</div>
                <div className="text-sm text-blue-300/80">Total Parts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {stats.totalParts - stats.lowStock - stats.outOfStock}
                </div>
                <div className="text-sm text-blue-300/80">In Stock</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{stats.lowStock}</div>
                <div className="text-sm text-blue-300/80">Low Stock</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{stats.outOfStock}</div>
                <div className="text-sm text-blue-300/80">Out of Stock</div>
              </div>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div 
            className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm rounded-2xl border border-blue-800/50 p-6 mb-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filterStatus === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-800/50 text-blue-300 hover:text-white hover:bg-blue-500/20 border border-blue-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                All Alerts ({lowStockParts.length})
              </motion.button>
              <motion.button
                onClick={() => setFilterStatus('out-of-stock')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filterStatus === 'out-of-stock'
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/25'
                    : 'bg-slate-800/50 text-blue-300 hover:text-white hover:bg-red-500/20 border border-blue-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Out of Stock ({outOfStockParts.length})
              </motion.button>
              <motion.button
                onClick={() => setFilterStatus('low-stock')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filterStatus === 'low-stock'
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg shadow-yellow-500/25'
                    : 'bg-slate-800/50 text-blue-300 hover:text-white hover:bg-yellow-500/20 border border-blue-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Low Stock ({criticalLowStockParts.length})
              </motion.button>
            </div>
          </motion.div>

          {/* Alerts List */}
          <motion.div 
            className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm rounded-2xl border border-blue-800/50 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="p-6 border-b border-blue-800/50">
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                <Bell className="h-6 w-6 text-blue-400" />
                Stock Alerts
              </h2>
            </div>
            
            <div className="divide-y divide-blue-800/30">
              <AnimatePresence>
                {getFilteredParts().map((part, index) => (
                  <motion.div
                    key={part.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    className={`p-6 hover:bg-slate-800/30 transition-all duration-300 ${
                      part.status === 'Out of Stock' ? 'bg-red-500/5' : 'bg-yellow-500/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {part.status === 'Out of Stock' ? (
                            <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg">
                              <XCircle className="h-5 w-5 text-white" />
                            </div>
                          ) : (
                            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
                              <AlertTriangle className="h-5 w-5 text-white" />
                            </div>
                          )}
                          <h3 className="text-xl font-medium text-white">{part.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            part.status === 'Out of Stock' 
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                              : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          }`}>
                            {part.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-blue-300/80">Model:</span>
                            <span className="ml-2 font-medium text-white">{part.model}</span>
                          </div>
                          <div>
                            <span className="text-blue-300/80">Type:</span>
                            <span className="ml-2 font-medium text-white">{part.type}</span>
                          </div>
                          <div>
                            <span className="text-blue-300/80">Current Stock:</span>
                            <span className="ml-2 font-medium text-red-400">{part.currentStock}</span>
                          </div>
                          <div>
                            <span className="text-blue-300/80">Min Required:</span>
                            <span className="ml-2 font-medium text-white">{part.minStock}</span>
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <span className="text-blue-300/80">Price:</span>
                          <span className="ml-2 font-medium text-white">${part.sellingPrice}</span>
                          <span className="text-blue-300/60 ml-3">(Market: ${part.marketRate})</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 ml-6">
                        <motion.button
                          onClick={() => handleStockUpdate(part)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/25"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Plus size={16} />
                          Add Stock
                        </motion.button>
                        <div className="text-xs text-blue-300/60 text-center">
                          Last updated: {new Date(part.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {getFilteredParts().length === 0 && (
              <div className="text-center py-16">
                <div className="text-blue-400/60 mb-6">
                  <Bell size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">No alerts found</h3>
                <p className="text-blue-300/80">
                  {filterStatus === 'all' 
                    ? 'All parts are well stocked!'
                    : filterStatus === 'out-of-stock'
                    ? 'No parts are out of stock'
                    : 'No parts are low on stock'
                  }
                </p>
              </div>
            )}
          </motion.div>

          {/* Stock Level Chart */}
          <motion.div 
            className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm rounded-2xl border border-blue-800/50 p-6 mt-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-blue-400" />
              Stock Level Distribution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-3xl font-bold text-green-400">
                  {Math.round(((stats.totalParts - stats.lowStock - stats.outOfStock) / stats.totalParts) * 100)}%
                </div>
                <div className="text-sm text-blue-300/80">Well Stocked</div>
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-3xl font-bold text-yellow-400">
                  {Math.round((stats.lowStock / stats.totalParts) * 100)}%
                </div>
                <div className="text-sm text-blue-300/80">Low Stock</div>
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl border border-red-500/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-3xl font-bold text-red-400">
                  {Math.round((stats.outOfStock / stats.totalParts) * 100)}%
                </div>
                <div className="text-sm text-blue-300/80">Out of Stock</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stock Update Modal */}
      {showStockModal && selectedPart && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-2xl p-8 w-full max-w-md border border-blue-800/50 shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-blue-400" />
              Add Stock - {selectedPart.name}
            </h3>
            <div className="mb-6">
              <div className="text-sm text-blue-300 mb-3">
                Current Stock: <span className="font-medium text-white">{selectedPart.currentStock}</span>
              </div>
              <div className="text-sm text-blue-300 mb-3">
                Minimum Required: <span className="font-medium text-white">{selectedPart.minStock}</span>
              </div>
              <label className="block text-sm font-medium text-blue-300 mb-3">
                Quantity to Add
              </label>
              <input
                type="number"
                min="1"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white backdrop-blur-sm"
                placeholder="Enter quantity"
              />
            </div>
            <div className="flex gap-4">
              <motion.button
                onClick={() => setShowStockModal(false)}
                className="flex-1 px-4 py-3 border border-blue-700/50 rounded-xl text-blue-300 hover:text-white hover:bg-blue-500/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={confirmStockUpdate}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add Stock
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 