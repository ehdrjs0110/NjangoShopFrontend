import {Navigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import {useEffect, useState} from "react";
import {getNewToken} from "./auth2"
import {containToken} from "../Store/tokenSlice";
import {useDispatch, useSelector} from "react-redux";
// import {containIsAdmin} from "../Store/isAdminSlice";

const PrivateRoute = ({component: Component}) => {
    const accessToken = useSelector((state) => state.token.value);

    const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    let refreshToken = cookies.refreshToken;

    // redux 함수
    const dispatch = useDispatch();
    useEffect(() => {
        async function checkAccessToken() {
            try {
                // getNewToken 함수 호출 (비동기 함수이므로 await 사용)
                console.log("토큰 null이라서 실행");
                const result = await getNewToken(refreshToken);
                refreshToken = result.newRefreshToken;

                // refresh token cookie에 재설정
                setCookie(
                    'refreshToken',
                    refreshToken,
                    {
                        path: '/',
                        maxAge: 7 * 24 * 60 * 60, // 7일
                    }
                )
                dispatch(containToken(result.newToken));

            } catch (error) {
                console.log(error);
            }finally {
                setLoading(false); // 비동기 작업 완료 후 로딩 상태 변경
            }
        }
        if(accessToken === null && refreshToken !== null)
        {
            checkAccessToken();
        }else {
            setLoading(false);
        }
    }, [ accessToken, refreshToken, dispatch, setCookie]);
    if (loading) {
        return null; // 로딩 중일 때는 아무 것도 렌더링하지 않음
    }
    return(
        accessToken ? Component : <Navigate to="/signIn"/>
    )
}


export default PrivateRoute;