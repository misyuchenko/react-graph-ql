import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth";
import { rtkQueryApi } from "@/shared/api/rtkQuery";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [rtkQueryApi.reducerPath]: rtkQueryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
