import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./slices/ThemeSlice.js";
import { userReducer } from "./slices/UserSlice.js";
import { feedReducer } from "./slices/Feed.js";

export const store = configureStore({
    reducer: {
        themeReducer,
        userReducer,
        feedReducer
    }
});