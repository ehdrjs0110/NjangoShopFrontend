import { createSlice } from '@reduxjs/toolkit'

export const isAdminSlice = createSlice({
    name: 'isAdmin',
    initialState: {
        value: false
    },
    reducers: {
        containIsAdmin: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {containIsAdmin } = isAdminSlice.actions

export default isAdminSlice.reducer