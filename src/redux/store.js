import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies/movies";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});