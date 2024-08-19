import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
    name: 'tokenContainer',
    initialState: {
        value: null
    },
    reducers: {
        containToken: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {containToken } = tokenSlice.actions

export default tokenSlice.reducer