import { configureStore, Action } from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";

import rootReducer, { RootState } from "./rootReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, userPreferences } from "../ducks";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [],
  whitelist: [userPreferences.namespace, api.namespace],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
