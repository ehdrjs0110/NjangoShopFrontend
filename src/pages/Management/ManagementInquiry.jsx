import style from "../../styles/Management/ManagementDashboard.module.scss"
import Card from "react-bootstrap/Card";
import { Stack } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InquiryListTable from "../../components/Management/Inquiry/InquiryListTable";

const ManagementInquiry = () => {
    return (
        <div className={style.managementDashboardContainer} >
            <Stack >
                <Row className={style.downPartRow} xs={1} md={1}>
                    <Col className={style.downPartCol}>
                        <Card border="light">
                            <Card.Title>
                                문의사항
                            </Card.Title>
                            <Card.Body>
                                <InquiryListTable />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Stack>
        </div>
    );
}

export default ManagementInquiry;