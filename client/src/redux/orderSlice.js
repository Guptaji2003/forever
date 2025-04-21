import { createSlice } from "@reduxjs/toolkit";
const orderSlice = createSlice({
    name:'order',
    initialState:{
        orders:[],
        selectedOrder:null,
    },
    reducers:{
        //actions
        setOrders:(state,action) => {
            state.orders = action.payload;
        },
        setSelectedOrder:(state,action) => {
            state.selectedOrder = action.payload;
        }
    }
});
export const {setOrders, setSelectedOrder} = orderSlice.actions;
export default orderSlice.reducer;