import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user-slice",
    initialState: {
        isLogin: localStorage.getItem("isLogin") === "true" ?
            true : false,
        username: localStorage.getItem("username") !== null ?
            localStorage.getItem("username") : undefined
    },
    reducers: {
        toggleLoginAction: toggleLogin,
        updateUserNameAction: updateUserName
    }
});

function toggleLogin(state) {
    localStorage.getItem("isLogin") === "true" ?
        state.isLogin = true : state.isLogin = false
}

function updateUserName(state) {
    localStorage.getItem("username") ?
        state.username = localStorage.getItem("username") : state.username = undefined;
}

export const { toggleLoginAction, updateUserNameAction } = userSlice.actions;
export const userReducer = userSlice.reducer;