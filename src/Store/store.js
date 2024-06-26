import { configureStore } from '@reduxjs/toolkit'
import tokenContainReducer from './tokenSlice'
import userEmailContainReducer from './userEmailSlice'
import userNickNameContainReducer from './userNickName'
import isKaKaoContainReducer from './isKakaoSlice'
export default configureStore({
    reducer: {
        token: tokenContainReducer,
        userEmail : userEmailContainReducer,
        userNickName : userNickNameContainReducer,
        isKaKao : isKaKaoContainReducer
    } // reducer의 key를 'tokenContainer'로 설정
})