import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faChartLine, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Management/ManagementDashboard.module.scss';

const NewMembersCard = () => (
    <Card border="primary" className={styles.managementCard}>
        <Card.Header>신규회원</Card.Header>
        <Card.Body className={styles.cardBodyContainer}>
            <Card.Title className={styles.managementCardTitle}>Primary Card Title</Card.Title>
            <FontAwesomeIcon icon={faUser} className={styles.managementCardIcon} />
        </Card.Body>
    </Card>
);

const TotalMembersCard = () => (
    <Card border="primary" className={styles.managementCard}>
        <Card.Header>전체 회원</Card.Header>
        <Card.Body className={styles.cardBodyContainer}>
            <Card.Title className={styles.managementCardTitle}>Primary Card Title</Card.Title>
            <FontAwesomeIcon icon={faUserPlus} className={styles.managementCardIcon} />
        </Card.Body>
    </Card>
);

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
