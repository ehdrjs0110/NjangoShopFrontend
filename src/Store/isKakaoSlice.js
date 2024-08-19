import { createSlice } from '@reduxjs/toolkit'

export const isKakaoSlice = createSlice({
    name: 'isKakaoContainer',
    initialState: {
        value: null
    },
    reducers: {
        containIsKaKao: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {containIsKaKao } = isKakaoSlice.actions

export default isKakaoSlice.reducer