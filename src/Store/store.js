import { configureStore } from '@reduxjs/toolkit'
import tokenContainReducer from './tokenSlice'
import userEmailContainReducer from './userEmailSlice'
import userNickNameContainReducer from './userNickName'
export default configureStore({
    reducer: {
        token: tokenContainReducer,
        userEmail : userEmailContainReducer,
        userNickName : userNickNameContainReducer
    } // reducer의 key를 'tokenContainer'로 설정
})