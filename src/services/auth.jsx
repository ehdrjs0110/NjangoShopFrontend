import axios from "axios";
import { useCookies } from 'react-cookie';
import {useEffect} from "react";
import {containToken} from "../Store/tokenSlice";
import {useDispatch, useSelector} from "react-redux";



// const testService = () => {
//     console.log("test service 실행중 ");
//
//     const dispatch = useDispatch();
//     let newAccessToken;
//     let newRefreshToken;
//     // console.log("refresh token cookie" +cookies.refreshToken);
//     // const refreshToken = cookies.refreshToken;
//
//     let response;
//     try {
//         response = await axios.post(
//             "http://localhost:8080/api/v1/auth/refreshToken",{},
//             {
//                 headers: {
//                     "Authorization": `Bearer ${refreshToken}`
//                 }
//             }
//         );
//     }
//     catch (e) {
//         // console.log();
//         // navigate('/Sign');
//         // refresh token 유의미 하지 않을 경우
//         return new Error("refresh token invalid")
//     }
//
// }

// check access token
// post refresh token
// get access token && refresh token
// access token이 있는지 학인한 후
// 없다면 refresh token으로  access token과 refresh token을 발급
const useAuth = (accessToken) => {
    const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

    // useEffect(() => {
    //     // getNewToken();
    //     if(!accessToken){
    //         getNewToken();
    //     }
    // },[])

    if(!accessToken){
        getNewToken();
    }


    let newAccessToken;
    let newRefreshToken;

    async function getNewToken() {
        console.log("refresh token cookie" +cookies.refreshToken);
        const refreshToken = cookies.refreshToken;

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
            // console.log(e);
            // navigate('/Sign');
            newAccessToken = false;
        }
        // response.data;
        console.log(response.data);
        // console.log(res.data);
        newAccessToken = response.data.accessToken;
        newRefreshToken = response.data.refreshToken;

        newRefreshToken = JSON.stringify(refreshToken);

        console.log(response.data.accessToken);
        console.log(response.data.refreshToken);


        setCookie(
            'refreshToken',
            refreshToken,
            {
                path:'/',
                maxAge: 7 * 24 * 60 * 60, // 7일
                // expires:new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
            }
        )

        return newAccessToken;

    }


    console.log("return newAccessToken");
    console.log(newAccessToken);

    return newAccessToken;

};

// refresh token 으로 새로운 access token 발급 받기
const getNewAccessToken =  async (refreshToken) =>  {

    // console.log("getNewToken service 실행중")
    // const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

    // 현재 refresh token 가져오기
    // const refreshToken = cookies.refreshToken;

    // const dispatch = useDispatch();
    let newAccessToken;
    let newRefreshToken;
    // console.log("refresh token cookie" +cookies.refreshToken);
    // const refreshToken = cookies.refreshToken;

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
        // console.log();
        // navigate('/Sign');
        // refresh token 유의미 하지 않을 경우
        return new Error("refresh token invalid")
    }
    // response.data;
    console.log(response.data);
    // console.log(res.data);
    newAccessToken = response.data.accessToken;
    newRefreshToken = response.data.refreshToken;

    newRefreshToken = JSON.stringify(refreshToken);

    // console.log(response.data.accessToken);
    // console.log(response.data.refreshToken);


    // refresh token cookie에 재설정
    // setCookie(
    //     'refreshToken',
    //     refreshToken,
    //     {
    //         path:'/',
    //         maxAge: 7 * 24 * 60 * 60, // 7일
    //         // expires:new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
    //     }
    // )

    // access token redux에 재설정
    // dispatch(containToken(newAccessToken))

    // const returnObject = {"accessToken": newAccessToken, "refreshToken": newRefreshToken}
    return newAccessToken;

}

export {useAuth, getNewAccessToken}

// export {testService}