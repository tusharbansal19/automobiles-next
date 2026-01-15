import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './inventorySlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';

// LocalStorage persistence
const loadState = () => {
  if (typeof window === 'undefined') return undefined;
  try {
    const serializedState = localStorage.getItem('appState');
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
    const serializedState = JSON.stringify({
      inventory: state.inventory,
      auth: state.auth
    });
    localStorage.setItem('appState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    auth: authReducer,
    ui: uiReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

store.subscribe(() => {
  saveState(store.getState());
});