'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Plus, 
  ArrowLeft, 
  Package,
  Sparkles,
  Save
} from 'lucide-react';
import { addPart } from '../../../store/inventorySlice';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../../component/AdminSidebar';

export default function AddPartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Front',
    model: 'Toyota Camry',
    currentStock: 0,
    minStock: 5,
    maxStock: 50,
    sellingPrice: 0,
    marketRate: 0
  });

  const partTypes = ['Front', 'Rear', 'Left', 'Right', 'Universal'];
  const vehicleModels = [
    'Toyota Camry', 'Toyota Corolla', 'Honda Civic', 'Honda Accord',
    'Ford Focus', 'Ford Mustang', 'BMW 3 Series', 'BMW 5 Series',
    'Mercedes C-Class', 'Mercedes E-Class', 'Audi A4', 'Audi A6',
    'Volkswagen Golf', 'Volkswagen Passat', 'Hyundai Elantra', 'Hyundai Sonata'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Price') || name.includes('Stock') ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPart = {
      ...formData,
      id: Date.now().toString(),
      status: formData.currentStock === 0 ? 'Out of Stock' : 
              formData.currentStock <= formData.minStock ? 'Low Stock' : 'OK',
      lastUpdated: new Date().toISOString()
    };

    dispatch(addPart(newPart));
    router.push('/admin/inventory');
  };

  const isFormValid = formData.name.trim() && 
                     formData.currentStock >= 0 && 
                     formData.minStock >= 0 && 
                     formData.maxStock > formData.minStock &&
                     formData.sellingPrice >= 0 &&
                     formData.marketRate >= 0;

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
                  Add New Part
                </h1>
                <p className="text-blue-300/80 mt-1">Add a new spare part to your inventory</p>
              </motion.div>
              <motion.button
                onClick={() => router.back()}
                className="bg-gradient-to-r from-slate-700 to-slate-800 text-blue-300 px-6 py-3 rounded-xl flex items-center gap-3 hover:from-slate-600 hover:to-slate-700 hover:text-white transition-all duration-300 border border-blue-700/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} />
                Back
              </motion.button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <motion.div 
            className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm rounded-2xl border border-blue-800/50 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Part Information</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-blue-300 mb-3">
                      Part Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-blue-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-blue-300/60 backdrop-blur-sm"
                      placeholder="Enter part name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-blue-300 mb-3">
                      Part Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-blue-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white backdrop-blur-sm"
                    >
                      {partTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-blue-300 mb-3">
                      Vehicle Model
                    </label>
                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-blue-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white backdrop-blur-sm"
                    >
                      {vehicleModels.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-blue-300 mb-3">
                      Current Stock
                    </label>
                    <input
                      type="number"
                      name="currentStock"
                      value={formData.currentStock}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-blue-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white backdrop-blur-sm"
                      placeholder="0"
                    />
                  </motion.div>
                </div>

                {/* Stock Limits */}
                <motion.div 
                  className="bg-gradient-to-r from-slate-700/30 to-blue-800/30 rounded-xl p-6 border border-blue-700/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-400" />
                    Stock Management
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-blue-300 mb-3">
                        Minimum Stock Level
                      </label>
                      <input
                        type="number"
                        name="minStock"
                        value={formData.minStock}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-blue-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white backdrop-blur-sm"
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-300 mb-3">
                        Maximum Stock Level
                      </label>
                      <input
                        type="number"
                        name="maxStock"
                        value={formData.maxStock}
                        onChange={handleInputChange}
                        min={formData.minStock + 1}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-blue-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white backdrop-blur-sm"
                        placeholder="50"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Pricing */}
                <motion.div 
                  className="bg-gradient-to-r from-slate-700/30 to-blue-800/30 rounded-xl p-6 border border-blue-700/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-400" />
                    Pricing Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-blue-300 mb-3">
                        Selling Price ($)
                      </label>
                      <input
                        type="number"
                        name="sellingPrice"
                        value={formData.sellingPrice}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-blue-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white backdrop-blur-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-300 mb-3">
                        Market Rate ($)
                      </label>
                      <input
                        type="number"
                        name="marketRate"
                        value={formData.marketRate}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-blue-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white backdrop-blur-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Form Actions */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-blue-800/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                >
                  <motion.button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-6 py-3 border border-blue-700/50 rounded-xl text-blue-300 hover:text-white hover:bg-blue-500/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={!isFormValid}
                    className={`flex-1 px-6 py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 ${
                      isFormValid
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105'
                        : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                    }`}
                    whileHover={isFormValid ? { scale: 1.02 } : {}}
                    whileTap={isFormValid ? { scale: 0.98 } : {}}
                  >
                    <Save size={20} />
                    Add Part
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 