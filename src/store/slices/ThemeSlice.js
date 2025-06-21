import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "theme-slice",
    initialState: {
        theme: "light"
    },
    reducers: {
        toggleThemeAction: toggleTheme
    }
});

function toggleTheme(state) {
    state.theme = state.theme === "light" ? "dark" : "light";
}

export const { toggleThemeAction } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;