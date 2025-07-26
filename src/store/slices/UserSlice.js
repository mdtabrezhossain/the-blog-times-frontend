import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user-slice",
    initialState: {
        isUserLoggedIn: false
    },
    reducers: {
        toggleLoginAction: toggleLogin
    }
});

function toggleLogin(state) {
    state.isUserLoggedIn = state.isUserLoggedIn === false ? true : false;
}

export const { toggleLoginAction } = userSlice.actions;
export const userReducer = userSlice.reducer;
