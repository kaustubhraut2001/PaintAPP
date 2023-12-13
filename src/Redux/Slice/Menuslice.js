import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS } from "@/constants";
const initialState = {
    activeMenuItem: MENU_ITEMS.PENCIL,
    actionMenuItem: null
}

const menuslice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        menuItemClick: (state, action) => {
            state.activeMenuItem = action.payload
        },
        actionitemcliick: (state, action) => {

            state.actionMenuItem = action.payload
        }


    }

})

export const { menuItemClick, actionitemcliick } = menuslice.actions;
export default menuslice.reducer;