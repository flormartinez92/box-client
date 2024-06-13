import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import { userApi } from './services/userApi';
import { packageApi } from './services/packageApi';
import { adminApi } from './services/adminApi';
// import { setupListeners } from '@reduxjs/toolkit/query';
import { adminSlice } from './slices/adminSlice';
import packageSlice from './slices/packageSlice';
const rootReducer = combineReducers({
  user: userSlice.reducer,
  adminState: adminSlice.reducer,
  packages: packageSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [packageApi.reducerPath]: packageApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer
  // Agrega otros slices según sea necesario
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, packageApi.middleware, adminApi.middleware])
});

// setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
