import {createSlice} from "@reduxjs/toolkit";
import {contain} from "./tokenSlice";

export const userNickNameSlice = createSlice(
    {
        name: 'userNickNameContainer',
        initialState: {
            value: ''
        },
        reducers: {
            containNickName: (state,action) => {
                state.value = action.payload
            }
        }
    }
)




export const {containNickName} = userNickNameSlice.actions

export  default userNickNameSlice.reducer