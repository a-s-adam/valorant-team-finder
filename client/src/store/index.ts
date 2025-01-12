import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import teamReducer from './slices/teamSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teams: teamReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 