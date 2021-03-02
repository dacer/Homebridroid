import { combineReducers } from "@reduxjs/toolkit";

import { api, userPreferences } from "../ducks";

const rootReducer = combineReducers({
  userPreferences: userPreferences.reducer,
  api: api.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
