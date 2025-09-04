import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Sample initial data
const initialParts = [
  {
    id: '1',
    name: 'Front Bumper',
    type: 'Front',
    model: 'Toyota Camry',
    currentStock: 15,
    minStock: 10,
    maxStock: 50,
    sellingPrice: 250,
    marketRate: 280,
    status: 'OK',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Headlight Assembly',
    type: 'Front',
    model: 'Honda Civic',
    currentStock: 8,
    minStock: 10,
    maxStock: 30,
    sellingPrice: 180,
    marketRate: 200,
    status: 'Low Stock',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Engine Oil 5W-30',
    type: 'Fluid',
    model: 'Universal',
    currentStock: 0,
    minStock: 5,
    maxStock: 100,
    sellingPrice: 25,
    marketRate: 30,
    status: 'Out of Stock',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Brake Pads',
    type: 'Brake',
    model: 'Ford Focus',
    currentStock: 25,
    minStock: 15,
    maxStock: 60,
    sellingPrice: 45,
    marketRate: 55,
    status: 'OK',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Rear Bumper',
    type: 'Rear',
    model: 'Nissan Altima',
    currentStock: 12,
    minStock: 8,
    maxStock: 40,
    sellingPrice: 220,
    marketRate: 250,
    status: 'OK',
    lastUpdated: new Date().toISOString(),
  },
];

const initialState = {
  parts: initialParts,
  filters: {
    search: '',
    type: 'All',
    model: 'All',
    status: 'All',
    priceRange: { min: 0, max: 1000 },
  },
  sortBy: 'name',
  sortOrder: 'asc',
  loading: false,
  error: null,
};

// Helper function to calculate status
const calculateStatus = (currentStock, minStock) => {
  if (currentStock === 0) return 'Out of Stock';
  if (currentStock <= minStock) return 'Low Stock';
  return 'OK';
};

// Helper function to filter parts
const filterParts = (parts, filters) => {
  return parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         part.model.toLowerCase().includes(filters.search.toLowerCase()) ||
                         part.type.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesType = filters.type === 'All' || part.type === filters.type;
    const matchesModel = filters.model === 'All' || part.model === filters.model;
    const matchesStatus = filters.status === 'All' || part.status === filters.status;
    const matchesPrice = part.sellingPrice >= filters.priceRange.min && 
                        part.sellingPrice <= filters.priceRange.max;
    
    return matchesSearch && matchesType && matchesModel && matchesStatus && matchesPrice;
  });
};

// Helper function to sort parts
const sortParts = (parts, sortBy, sortOrder) => {
  return [...parts].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    rehydrate: (state, action) => {
      return { ...state, ...action.payload };
    },
    
    addPart: (state, action) => {
      const newPart = {
        ...action.payload,
        id: Date.now().toString(),
        status: calculateStatus(action.payload.currentStock, action.payload.minStock),
        lastUpdated: new Date().toISOString(),
      };
      state.parts.push(newPart);
    },
    
    updatePart: (state, action) => {
      const { id, updates } = action.payload;
      const partIndex = state.parts.findIndex(part => part.id === id);
      if (partIndex !== -1) {
        const updatedPart = {
          ...state.parts[partIndex],
          ...updates,
          status: calculateStatus(updates.currentStock || state.parts[partIndex].currentStock, 
                                updates.minStock || state.parts[partIndex].minStock),
          lastUpdated: new Date().toISOString(),
        };
        state.parts[partIndex] = updatedPart;
      }
    },
    
    deletePart: (state, action) => {
      state.parts = state.parts.filter(part => part.id !== action.payload);
    },
    
    updateStock: (state, action) => {
      const { id, quantity, operation } = action.payload;
      const partIndex = state.parts.findIndex(part => part.id === id);
      if (partIndex !== -1) {
        const part = state.parts[partIndex];
        const newStock = operation === 'add' ? part.currentStock + quantity : part.currentStock - quantity;
        state.parts[partIndex] = {
          ...part,
          currentStock: Math.max(0, newStock),
          status: calculateStatus(Math.max(0, newStock), part.minStock),
          lastUpdated: new Date().toISOString(),
        };
      }
    },
    
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    setSort: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },
    
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  rehydrate,
  addPart,
  updatePart,
  deletePart,
  updateStock,
  setFilters,
  setSort,
  clearFilters,
} = inventorySlice.actions;

// Selectors
export const selectAllParts = (state) => state.inventory.parts;
export const selectFilters = (state) => state.inventory.filters;
export const selectSort = (state) => state.inventory.sortBy;
export const selectSortOrder = (state) => state.inventory.sortOrder;

export const selectFilteredParts = (state) => {
  const { parts, filters, sortBy, sortOrder } = state.inventory;
  const filtered = filterParts(parts, filters);
  return sortParts(filtered, sortBy, sortOrder);
};

export const selectLowStockParts = (state) => {
  return state.inventory.parts.filter(part => part.status === 'Low Stock' || part.status === 'Out of Stock');
};

export const selectUniqueTypes = (state) => {
  const types = [...new Set(state.inventory.parts.map(part => part.type))];
  return types.sort();
};

export const selectUniqueModels = (state) => {
  const models = [...new Set(state.inventory.parts.map(part => part.model))];
  return models.sort();
};

export const selectInventoryStats = (state) => {
  const parts = state.inventory.parts;
  return {
    totalParts: parts.length,
    lowStock: parts.filter(part => part.status === 'Low Stock').length,
    outOfStock: parts.filter(part => part.status === 'Out of Stock').length,
    totalValue: parts.reduce((sum, part) => sum + (part.currentStock * part.sellingPrice), 0),
  };
};

export default inventorySlice.reducer; 