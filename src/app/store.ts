import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import homeReducer from 'features/home/homeSlice';
import landingReducer from 'features/landing/landingSlice';

export const store = configureStore({
  reducer: {
    landing: landingReducer,
    auth: authReducer,
    home: homeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
