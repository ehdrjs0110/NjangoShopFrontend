import {createSlice} from "@reduxjs/toolkit";
import {contain, tokenSlice} from "./tokenSlice";


export const userEmailSlice = createSlice(
    {
        name: 'userEmailContainer',
        initialState: {
            value: ''
        },
        reducers: {
            containEmail: (state, action) => {
                state.value = action.payload
            }
        }
    }
)



export const {containEmail} = userEmailSlice.actions

export default userEmailSlice.reducer

