import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        signupStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        signupSuccess: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        signupFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    },
});

export const {
    loginStart, loginSuccess, loginFailure, logout,
    signupStart, signupSuccess, signupFailure
} = authSlice.actions;

export default authSlice.reducer;
