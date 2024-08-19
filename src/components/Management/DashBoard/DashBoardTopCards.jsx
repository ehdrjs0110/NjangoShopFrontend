import React, {useEffect, useState} from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faChartLine, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/Management/ManagementDashboard.module.scss';
import axios from "axios";
import {useSelector} from "react-redux";



const NewMembersCard = () => {
    const [newUserCount,setNewUserConut] = useState(0);
    let accessToken = useSelector(state => state.token.value);
    useEffect(() => {
        axios.get(
                "http://localhost:8080/management/user/todayNewUser", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}` // auth 설정
                    },
                }
            ).then(res => setNewUserConut(res.data))
            .catch(console.error)



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
    useEffect(() => {
        axios.get(
            "http://localhost:8080/management/user/totalUser", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}` // auth 설정
                },
            }
        ).then(res => setTotalUserCount(res.data))
            .catch(console.error)



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
