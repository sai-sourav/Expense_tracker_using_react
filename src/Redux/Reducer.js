import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name:"expense",
    initialState:{
        expenses:[],
    },
    reducers:{
        addExpense(state,action){
            state.expenses.push(action.payload)
        },
        updateArray(state,action){
            state.expenses = action.payload
        },
        deleteExpense(state,action){
            // let ind = state.expenses.findIndex((item)=>item.id === action.payload)
            let updatedarray = state.expenses.filter(item => {
                return item.id !== action.payload
            })
            // const updatedArr = [...state.expenses].splice(ind,1)
            state.expenses = updatedarray
        }
    }
})

export const expenseAction = expenseSlice.actions

export default expenseSlice.reducer
