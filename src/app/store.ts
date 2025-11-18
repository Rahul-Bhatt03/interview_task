// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApiSlice } from "../features/users/userSlice";
import { productsApiSlice } from "../features/products/productSlice";
import { medicinesApi } from "../features/medicines/medicineSlice";

export const store = configureStore({
  reducer: {
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [medicinesApi.reducerPath]: medicinesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApiSlice.middleware)
      .concat(productsApiSlice.middleware)
      .concat(medicinesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
