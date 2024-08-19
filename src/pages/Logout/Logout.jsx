import React from "react";
import axios from "axios";


function KakaoLogout() {
    const CLIENT_ID = "7a2afab08fdef9ddd3b09ac451ca30b9";
    const REDIRECT_URI = "http://localhost:3000/login/kakao";
    const KOKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${REDIRECT_URI}&response_type=code&`;

    const handleLogout = async () => {
        try {
            const response = await axios.get(KOKAO_LOGOUT_URL);
            console.log(response.data);
            // 로그아웃 성공 후 추가 작업 수행 가능
        } catch (error) {
            console.error("로그아웃 오류:", error);
            // 오류 처리
        }
    };

    return (
        <div>
            <h1>카카오 로그아웃</h1>
            <button onClick={handleLogout}>카카오 로그아웃</button>
        </div>
    );
}

export default KakaoLogout;
