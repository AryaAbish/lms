import { createSlice } from "@reduxjs/toolkit";

const items=localStorage.getItem('whishItems')!= null ? JSON.parse(localStorage.getItem('whishItems')):[]
const initialState=[]

const whishlistSlice=createSlice({
    name:'whishlist',
    initialState:items,
    reducers:{
        addToWhishlist:(state,action)=>{
            state.push(action.payload)
            localStorage.setItem('whishItems',JSON.stringify(state.map(item=>item)))
        },
        removeFromWhishlist:(state,action)=>{
            localStorage.setItem('whishItems',JSON.stringify(state.filter(item=>item._id!==action.payload)))

            return state.filter(item=>item._id!=action.payload)
        }
    }
})

export const {addToWhishlist,removeFromWhishlist}=whishlistSlice.actions
export default whishlistSlice.reducer
