import { configureStore, combineReducers } from "@reduxjs/toolkit";
import erorrReducer from "./errors";
import { logger } from "./middleware/logger";
import taskReducer from "./task";

const rootReducers = combineReducers({
  errors: erorrReducer,
  tasks: taskReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export default createStore;
