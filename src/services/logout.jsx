import axios from "axios";

const kakaoLogout = async () =>
{
    const CLIENT_ID = "7a2afab08fdef9ddd3b09ac451ca30b9";
    const REDIRECT_URI = "http://localhost:3000/SignIn";
    const KOKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${REDIRECT_URI}`;
    // const KOKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout`;


    try {
        const response = await axios.get(KOKAO_LOGOUT_URL);
        console.log(response.data);
        // 로그아웃 성공 후 추가 작업 수행 가능
    } catch (error) {
        console.error("로그아웃 오류:", error);
        // 오류 처리
    }
}

export {kakaoLogout}