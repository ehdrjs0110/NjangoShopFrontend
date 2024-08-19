import style from "../../styles/Management/ManagementDashboard.module.scss"
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChartBar,
    faChartLine,
    faCoins, faCreditCard, faDollarSign,
    faMoneyBill,
    faSearch,
    faUser,
    faUserPlus, faWallet
} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Chart from 'chart.js/auto';
import {useEffect, useRef} from "react";
import {Stack} from "react-bootstrap";
import { NewMembersCard, TotalMembersCard, RecipeSearchCard, MonthlyRevenueCard } from "../../components/Management/DashBoard/DashBoardTopCards";
import Visit from "../../components/Management/DashBoard/DashBoardVisit";
const ManagementDashboard = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['월', '화', '수', '목', '금', '토', '일'],
                    datasets: [{
                        label: 'Revenue',
                        data: [400, 350, 500, 450, 600, 550, 500],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1 // 곡률 설정
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, []);
    return(


        <div className={style.managementDashboardContainer} >
            <Stack >
                {/* bashboard - 위쪽 파트 :전체 회원, 신규 회원, 레시피 검색량, gpt 월 주적 금액*/}
                <Row className={style.topPartRow} xs={2} md={4}>
                    <Col><NewMembersCard /></Col>
                    <Col><TotalMembersCard /></Col>
                    <Col><RecipeSearchCard /></Col>
                    <Col><MonthlyRevenueCard /></Col>
                </Row>

                {/*dashboard 위쪽 파트를 제외한 나머지 : 주간 방문자, 미정, 회원 별 검색량, 신고*/}
                <Row className={style.downPartRow} xs={1} md={2}>
                    <Col className={style.downPartCol}>
                        {/*Card == div*/}
                        {/*<Card border="light">*/}
                        {/*    <Card.Title>*/}
                        {/*       주간 방문자*/}
                        {/*    </Card.Title>*/}
                        {/*    <Card.Body>*/}

                        {/*    </Card.Body>*/}
                        {/*</Card>*/}
                        <Visit/>
                        {/*<div>*/}
                        {/*    /!*<canvas ref={chartRef}></canvas>*!/*/}
                        {/*</div>*/}
                    </Col>
                    <Col className={style.downPartCol}>
                        <Card border="light">
                            <Card.Title>
                                미정
                            </Card.Title>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className={style.downPartCol}>
                        <Card border="light">
                            <Card.Title>
                                회원 별 검색량
                            </Card.Title>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className={style.downPartCol}>
                        <Card border="light">
                            <Card.Title>
                               신고 내역
                            </Card.Title>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Stack>








        </div>


    )
}

export default ManagementDashboard;