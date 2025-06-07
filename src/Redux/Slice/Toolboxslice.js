import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS, COLORS, BACKGROUND_COLOR } from "../../constants";
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

    [BACKGROUND_COLOR.color]: {
        color: COLORS.WHITE // default background color
    }

};

const toolkitslice = createSlice({
    name: "toolkitslice",
    initialState,
    reducers: {
        changecolor: (state, action) => {

            state[action.payload.item].color = action.payload.color

        },
        changeEraserColor: (state, action) => {
            state[MENU_ITEMS.ERASER].color = action.payload.color;
        },
        changeBrushSize: (state, action) => {
            state[action.payload.item].size = action.payload.size

        },
        changeBackgroundColor: (state, action) => {
            state[BACKGROUND_COLOR.color] = { color: action.payload.color };
        }

    }
});

export const { changecolor, changeBrushSize, changeBackgroundColor, changeEraserColor } = toolkitslice.actions;
export default toolkitslice.reducer;