import style from "../../styles/Management/ManagementDashboard.module.scss";
import { Stack } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserListTable from "../../components/Management/User/UserListTable";

const ManagementUser = () => {
    return (
        <div className={style.managementDashboardContainer}>
            <Stack>
                <Row className={style.downPartRow} xs={2} md={2}>
                    <Col>
                        <UserListTable type="user" />
                    </Col>
                    <Col>
                        <UserListTable type="admin" />
                    </Col>
                </Row>
            </Stack>
        </div>
    );
};

export default ManagementUser;
