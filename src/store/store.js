import { configureStore } from "@reduxjs/toolkit";
import headerListSlice from "./slices/headerListSlice";
import calendarSlice from "./slices/calendarSlice";
import filterSlice from "./slices/filterSlice";
import newRoomSlice from "./slices/newRoomSlice";


const store=configureStore({
   reducer:{
    headerListSlice : headerListSlice,
    calendarSlice: calendarSlice,
    filterSlice : filterSlice,
    newRoomSlice :newRoomSlice
   }
});

export default store;