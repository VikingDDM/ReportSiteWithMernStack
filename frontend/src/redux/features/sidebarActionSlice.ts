import { createSlice } from "@reduxjs/toolkit";
import { SidebarState } from "../api/types";

const initialState: SidebarState = {
    open: false
};

export const sidebarActionSlice = createSlice({
    name:"sidebarAction",
    initialState,
    reducers: {
        sidebaropening: (state, action) => {
            state.open = action.payload
        },
    },
})

export const { sidebaropening } = sidebarActionSlice.actions;

export default sidebarActionSlice.reducer