import { createSlice } from "@reduxjs/toolkit";
import { apiLogin, apiLogout, apiRefreshUser, apiRegister } from './operations';

const initialState = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
};

const handlePending = (state) => { state.error = null;};
const handleRejected = (state, action) => {
   state.error = action.payload;
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(apiRegister.pending, handlePending)
            .addCase(apiRegister.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(apiRegister.rejected, handleRejected)
            .addCase(apiLogin.pending, handlePending)
            .addCase(apiLogin.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(apiLogin.rejected, handleRejected)
            .addCase(apiLogout.pending, handlePending)
            .addCase(apiLogout.fulfilled, () => {
                return initialState;
            })
            .addCase(apiLogout.rejected, handleRejected)
            .addCase(apiRefreshUser.pending, (state) => {
                state.error = null;
                state.isRefreshing = true;
            })
            .addCase(apiRefreshUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.isRefreshing = false;
            })
            .addCase(apiRefreshUser.rejected, (state, action) => {
                state.error = action.payload;
                state.isRefreshing = false;
            })
        
    },
});

export const authReducer = authSlice.reducer;