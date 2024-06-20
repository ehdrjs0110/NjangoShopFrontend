import axios from "axios";

const getNewToken = async (refreshToken) => {
    // console.log("service layer 실행중");
    // 체크 완
    // console.log("service layer애 전달 : " + refreshToken);

    let response;
    try {
        response = await axios.post(
            "http://localhost:8080/api/v1/auth/refreshToken",{},
            {
                headers: {
                    "Authorization": `Bearer ${refreshToken}`
                }
            }
        );
    }
    catch (e) {
        // refresh token 유의미 하지 않을 경우
        return new Error("refresh token invalid")
    }

    // console.log("service layer new accesstoken: " + response.data.accessToken);
    // console.log("service layer new refreshtoken: " +response.data.refreshToken);


    const newTokenObject
        = { "newToken" : response.data.accessToken, "newRefreshToken" : response.data.refreshToken};

    console.log(newTokenObject.newToken)
    return newTokenObject


}

export {getNewToken}