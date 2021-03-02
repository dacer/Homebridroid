import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  username: "",
  password: "",
  serverAddress: "",
};

const userPreferences = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    userLoggedIn(state, action: PayloadAction<AuthInfo>) {
      state.username = action.payload.username
      state.password = action.payload.password
      state.serverAddress = action.payload.serverAddress
    },
  },
});

const {
  userLoggedIn,
} = userPreferences.actions;

export const actions = {
  userLoggedIn,
};

export const namespace = userPreferences.name;

export const reducer = userPreferences.reducer;

export interface AuthInfo {
  username: string,
  password: string,
  serverAddress: string,
  token?: string
}