import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import whishlistSlice from "./whishlistSlice";

const store=configureStore({
    reducer:{
        cart:cartSlice,
        wishList:whishlistSlice
    }
})

export default store