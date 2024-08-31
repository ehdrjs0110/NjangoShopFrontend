import React, {useEffect, useState} from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faChartLine, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/Management/ManagementDashboard.module.scss';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {expired, getNewToken} from "../../../services/auth2";
import {containToken} from "../../../Store/tokenSlice";
import {containIsAdmin} from "../../../Store/isAdminSlice";
import {axiosInstance} from "../../../middleware/customAxios";



const NewMembersCard = () => {
    const [newUserCount,setNewUserConut] = useState(0);
    let accessToken = useSelector(state => state.token.value);

    // refresh token 가져오기
    const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

    // redux에서 가져오기
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function tokenHandler() {


        const isExpired = expired();
        if(isExpired){

            let refreshToken = cookies.refreshToken;
            try {

                // getNewToken 함수 호출 (비동기 함수이므로 await 사용)
                const result = await getNewToken(refreshToken);
                refreshToken = result.newRefreshToken;

                // refresh token cookie에 재설정
                setCookie(
                    'refreshToken',
                    refreshToken,
                    {
                        path:'/',
                        maxAge: 7 * 24 * 60 * 60, // 7일
                        // expires:new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
                    }
                )

                // Redux access token 재설정
                dispatch(containToken(result.newToken));
                dispatch(containIsAdmin(true));

            } catch (error) {
                console.log(error);
                navigate('/Management');
            }
        }

    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                // 토큰 핸들러 호출
                await tokenHandler();
                // 데이터 가져오기
                const res = await axiosInstance.get(`management/user/todayNewUser`).then(res => setNewUserConut(res.data))
                    .catch(console.error)
            } catch (err) {
                console.error(err);
            }
        };

        fetchData(); // 비동기 함수 호출
    }, []);

    return(
    <Card border="primary" className={styles.managementCard}>
        <Card.Header>신규회원</Card.Header>
        <Card.Body className={styles.cardBodyContainer}>
            <Card.Title className={styles.managementCardTitle}>{newUserCount}</Card.Title>
            <FontAwesomeIcon icon={faUser} className={styles.managementCardIcon} />
        </Card.Body>
    </Card>
    )
};

const TotalMembersCard = () => {
    const [totalUserCount,setTotalUserCount] = useState(0);
    let accessToken = useSelector(state => state.token.value);
    const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

    // redux에서 가져오기
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function tokenHandler() {


        const isExpired = expired();
        if(isExpired){

            let refreshToken = cookies.refreshToken;
            try {

                // getNewToken 함수 호출 (비동기 함수이므로 await 사용)
                const result = await getNewToken(refreshToken);
                refreshToken = result.newRefreshToken;

                // refresh token cookie에 재설정
                setCookie(
                    'refreshToken',
                    refreshToken,
                    {
                        path:'/',
                        maxAge: 7 * 24 * 60 * 60, // 7일
                        // expires:new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
                    }
                )

                // Redux access token 재설정
                dispatch(containToken(result.newToken));
                dispatch(containIsAdmin(true));

            } catch (error) {
                console.log(error);
                navigate('/Management');
            }
        }

    }

        useEffect(() => {
            const fetchData = async () => {
                try {
                    // 토큰 핸들러 호출
                    await tokenHandler();

                    // 데이터 가져오기
                    const res = await axiosInstance.get(`management/user/totalUser`)
                        .then(res => setTotalUserCount(res.data))
                        .catch(console.error)

                } catch (err) {
                    console.error(err);
                }
            };

            fetchData(); // 비동기 함수 호출


    }, []);

    return(
    <Card border="primary" className={styles.managementCard}>
        <Card.Header>전체 회원</Card.Header>
        <Card.Body className={styles.cardBodyContainer}>
            <Card.Title className={styles.managementCardTitle}>{totalUserCount}</Card.Title>
            <FontAwesomeIcon icon={faUserPlus} className={styles.managementCardIcon}/>
        </Card.Body>
    </Card>
    )
};

const RecipeSearchCard = () => (
    <Card border="primary" className={styles.managementCard}>
        <Card.Header>레시피 검색량</Card.Header>
        <Card.Body className={styles.cardBodyContainer}>
            <Card.Title className={styles.managementCardTitle}>Primary Card Title</Card.Title>
            <FontAwesomeIcon icon={faChartLine} className={styles.managementCardIcon} />
        </Card.Body>
    </Card>
);

const MonthlyRevenueCard = () => (
    <Card border="primary" className={styles.managementCard}>
        <Card.Header>GPT 월 누적 금액</Card.Header>
        <Card.Body className={styles.cardBodyContainer}>
            <Card.Title className={styles.managementCardTitle}>Primary Card Title</Card.Title>
            <FontAwesomeIcon icon={faDollarSign} className={styles.managementCardIcon} />
        </Card.Body>
    </Card>
);

export { NewMembersCard, TotalMembersCard, RecipeSearchCard, MonthlyRevenueCard };
