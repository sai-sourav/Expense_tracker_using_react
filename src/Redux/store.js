import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./Reducer";
import userSlice from "./userReducer";

const expenseStore = configureStore({
  reducer:{
    expense: expenseSlice,
    user: userSlice
  }
})

export default expenseStore