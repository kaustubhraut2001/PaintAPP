import { configureStore } from "@reduxjs/toolkit";
import Menuslice from "../Slice/Menuslice"
import Toolkitslice from "../Slice/Toolboxslice"

const store = configureStore({
    reducer: {

        menu: Menuslice,
        toolkit: Toolkitslice
    }

});



export default store;