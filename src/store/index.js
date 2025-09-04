import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './inventorySlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// LocalStorage persistence
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('inventoryState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('inventoryState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

// Load initial state from localStorage
const persistedState = loadState();
if (persistedState) {
  store.dispatch({ type: 'inventory/rehydrate', payload: persistedState.inventory });
} 