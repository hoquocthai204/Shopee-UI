import { createSlice } from '@reduxjs/toolkit';
import { User } from 'models';

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
  isMerchant?: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
  isMerchant: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setIsMerchant(state, action) {
      state.isMerchant = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {},
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsMerchant = (state: any) => state.auth.isMerchant;
export const selectCurrentUser = (state: any) => state.auth.currentUser;
export const selectStates = (state: any) => state.auth;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
