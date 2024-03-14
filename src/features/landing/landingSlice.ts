import { createSlice } from '@reduxjs/toolkit';
import { ProductInfo } from 'models/product/productInfo';

export interface LandingState {
  productInfoList: ProductInfo[] | null;
}

const initialState: LandingState = {
  productInfoList: null,
};

const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    setProductInfoList(state, action) {
      state.productInfoList = action.payload;
    },
  },
  extraReducers: {},
});

// Actions
export const landingActions = landingSlice.actions;

// Selectors
export const selectStates = (state: any) => state.landing;

// Reducer
const landingReducer = landingSlice.reducer;
export default landingReducer;
