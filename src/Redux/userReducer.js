import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin : localStorage.getItem('authToken') ? true : false,
    Profiledetails: localStorage.getItem('profile') === null || localStorage.getItem('profile') === "false" ? false : true,
    isEmailVerified: localStorage.getItem('verifyemail') === null || localStorage.getItem('verifyemail') === "false" ? false : true
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers:{
        updateLogin(state,action){
            state.isLogin = !state.isLogin
        },
        updateProfiledetails(state,action){
            state.Profiledetails = action.payload
        },
        updateEmailVerified(state,action){
            state.isEmailVerified = action.payload
        }
    }
    
})

export const userAction = userSlice.actions;
export default userSlice.reducer;