import style from "../../styles/Management/ManagementDashboard.module.scss"
import Card from "react-bootstrap/Card";
import { Stack } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserListTable from "../../components/Management/User/UserListTable";

const managementUser = () => {
    return (

        <div className={style.managementDashboardContainer} >
            <Stack >
                <Row className={style.downPartRow} xs={1} md={1}>
                    <Col className={style.downPartCol}>
                        <Card border="light">
                            <Card.Title>
                                사용자 목록
                            </Card.Title>
                            <Card.Body>
                                <UserListTable />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Stack>
        </div>
    );
}

export default managementUser;