import axios from "axios";
import {containToken} from "../Store/tokenSlice";
import {useDispatch} from "react-redux";
import {useCookies} from "react-cookie";



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

const getNewTokenAdmin = async (refreshToken) => {
    // console.log("service layer 실행중");
    // 체크 완
    // console.log("service layer애 전달 : " + refreshToken);

    let response;
    try {
        response = await axios.post(
            "http://localhost:8080/api/v1/auth/refreshToken/checkAdmin",{},
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

// const fetchAccessTokenAndRefreshToken  = (fetchObject) => {
//     const dispatch = useDispatch();
//     // const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);
//     // let refreshToken = fetchObject.newRefreshToken;
//     // setCookie(
//     //     'refreshToken',
//     //     refreshToken,
//     //     {
//     //         path:'/',
//     //         maxAge: 7 * 24 * 60 * 60, // 7일
//     //         // expires:new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
//     //     }
//     // )
//     dispatch(containToken(fetchObject.newToken));
// }

export {getNewToken,getNewTokenAdmin}