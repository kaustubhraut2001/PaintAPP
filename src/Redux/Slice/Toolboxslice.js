import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS, COLORS } from "../../constants";
const initialState = {
    [MENU_ITEMS.PENCIL]: {
        color: COLORS.BLACK,
        size: 5,
    },
    [MENU_ITEMS.ERASER]: {
        color: COLORS.WHITE,
        size: 5,
    },
    [MENU_ITEMS.UNDO]: {


    },
    [MENU_ITEMS.REDO]: {},
    [MENU_ITEMS.DOWNLOAD]: {},
};

const toolkitslice = createSlice({
    name: "toolkitslice",
    initialState,
    reducers: {
        changecolor: (state, action) => {

            state[action.payload.item].color = action.payload.color

        },
        changeBrushSize: (state, action) => {
            state[action.payload.item].size = action.payload.size

        }

    }
});

export const { changecolor, changeBrushSize } = toolkitslice.actions;
export default toolkitslice.reducer;