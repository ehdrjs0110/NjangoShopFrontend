
import store from './store';
import {containToken} from "./tokenSlice";
import {useDispatch} from "react-redux"; // 스토어를 import 합니다.


// 상태를 가져오는 함수
export const getToken = () => {
    const state = store.getState();
    return state.token.value;
};


