import { createSlice } from "@reduxjs/toolkit";

const items=localStorage.getItem('cartItems')!= null ? JSON.parse(localStorage.getItem('cartItems')):[]
const initialState=[]

const cartSlice=createSlice({
    name:'cart',
    initialState:items,
    reducers:{
        addToCart:(state,action)=>{
            state.push(action.payload)
            localStorage.setItem('cartItems',JSON.stringify(state.map(item=>item)))
        },
        removeCart:(state,action)=>{
                localStorage.setItem('cartItems',JSON.stringify(state.filter(item=>item._id!==action.payload)))
                return state.filter(item=>item._id!==action.payload)
        },
        reset:()=>
            initialState
    }
})

export const{addToCart,removeCart,reset}=cartSlice.actions
export default cartSlice.reducer