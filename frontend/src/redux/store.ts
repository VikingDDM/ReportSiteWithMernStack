import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import { reportApi } from './api/reportApi';
import { payInfoApi } from './api/payInfoApi';
import { freelancerInfoApi } from './api/freelancerInfoApi';
import { upworkInfoApi } from './api/upworkInfoApi';
import { pcInfoApi } from './api/pcInfoApi';
import { vpsInfoApi } from './api/vpsInfoApi';
import { paymentApi } from './api/paymentApi';
import userReducer from './features/userSlice';
import sidebarActionReducer from "./features/sidebarActionSlice";
import reportReducer from './features/reportSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [payInfoApi.reducerPath]: payInfoApi.reducer,
    [freelancerInfoApi.reducerPath]: freelancerInfoApi.reducer,
    [upworkInfoApi.reducerPath]: upworkInfoApi.reducer,
    [pcInfoApi.reducerPath]: pcInfoApi.reducer,
    [vpsInfoApi.reducerPath]: vpsInfoApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    userState: userReducer,
    sidebarState: sidebarActionReducer,
    reportState: reportReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({}).concat([
    authApi.middleware,
    userApi.middleware,
    reportApi.middleware,
    payInfoApi.middleware,
    freelancerInfoApi.middleware,
    upworkInfoApi.middleware,
    pcInfoApi.middleware,
    vpsInfoApi.middleware,
    paymentApi.middleware,
  ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
