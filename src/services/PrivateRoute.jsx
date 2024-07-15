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
    // 방문자를 체크하기 위한 cookie
    const [today, setTodayCheck, removeTodayCheck] = useCookies(['todayCheck']);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    let refreshToken = cookies.refreshToken;
    let todayCheck = today.todayCheck;
    let token;

    // redux 함수
    const dispatch = useDispatch();
    useEffect(() => {
        // 방문 기록을 증가시키는 함수
        async function increaseVisitCount() {
            try {
                // POST 요청을 보낼 데이터 (여기서는 별도의 데이터를 전달하지 않음)
                const response = await axios.post('http://localhost:8080/management/visit/today',{},
                    {
                    headers: {
                        "Authorization": `Bearer ${token}` // auth 설정
                    },
                });

                // 요청 성공 시 서버에서 반환한 데이터 출력
                console.log(response.data); // true (방문자 수 증가 성공 여부)

                // 필요한 추가 로직을 여기에 구현할 수 있습니다.
            } catch (error) {
                console.error('Error while increasing visit count:', error);
            }finally {
                setLoading(false);   // 비동기 작업 완료 후 로딩 상태 변경
            }
        }
        // accessToken을 확인하고 갱신하는 함수
        async function checkAccessToken() {
            try {
                // refreshToken을 사용하여 새로운 accessToken을 발급받습니다.
                const result = await getNewToken(refreshToken);
                refreshToken = result.newRefreshToken;

                // 새로 발급받은 refreshToken을 쿠키에 저장합니다.
                setCookie(
                    'refreshToken',
                    refreshToken,
                    {
                        path: '/',
                        maxAge: 7 * 24 * 60 * 60, // 7일 동안 유효
                    }
                )
                // 새로 발급받은 accessToken을 Redux 스토어에 저장합니다.
                dispatch(containToken(result.newToken));
                token = result.newToken;

            } catch (error) {
                console.log(error);
            }finally {
                // 오늘 방문 기록을 확인하고 처리하는 로직
                if(!todayCheck){
                    // 오늘 방문한 기록이 없는 경우
                    let time = new Date();
                    const formattedToday = time.toLocaleDateString('ko-KR'); // 현재 로컬 시간대에 맞춰서 포맷
                    // 오늘 날짜를 쿠키에 저장합니다.
                    setTodayCheck(
                        'todayCheck',
                        formattedToday,
                        {
                            path: '/',
                            maxAge: 1 * 24 * 60 * 60, // 1일 동안 유효
                        }
                    )

                    // 방문 기록을 증가시키는 함수 호출
                    increaseVisitCount();

                }else {
                    let time = new Date();
                    const formattedToday = time.toLocaleDateString('ko-KR'); // 현재 로컬 시간대에 맞춰서 포맷

                    if (todayCheck === formattedToday)
                    {
                        // 오늘 이미 방문한 경우
                        setLoading(false);   // 비동기 작업 완료 후 로딩 상태 변경
                    }else {
                        // 방문한 기록은 있으나, 오늘이 아닌 경우
                        increaseVisitCount();
                    }
                }
            }
        }
        if(accessToken === null && refreshToken !== null)
        {
            // accessToken이 없고 refreshToken이 존재할 때
            checkAccessToken();
        }else {
            //refreshToken이 없거나 만료일 때
            dispatch(containToken(false));
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