import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./slices/ThemeSlice.js";
import { userReducer } from "./slices/UserSlice.js";

export const store = configureStore({
    reducer: {
        themeReducer: themeReducer,
        userReducer: userReducer,
    }
});