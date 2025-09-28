import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
    name: "feed-slice",
    initialState: {
        blogsReadCount: 0,
        blogsRead: []
    },
    reducers: {
        updateBlogsReadCountAction: updateBlogsReadCount,
        updateBlogsReadAction: updateBlogsRead
    }
});

function updateBlogsReadCount(state) {
    state.blogsReadCount += 4;
}

function updateBlogsRead(state, action) {
    action.payload.forEach(blog => {
        state.blogsRead.push(blog);
    });
}

export const { updateBlogsReadCountAction, updateBlogsReadAction } = feedSlice.actions;
export const feedReducer = feedSlice.reducer;