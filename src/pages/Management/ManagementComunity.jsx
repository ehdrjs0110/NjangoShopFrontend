import style from "../../styles/Management/ManagementDashboard.module.scss"
import Card from "react-bootstrap/Card";
import { Stack } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RecipeShareListTable from "../../components/Management/Comunity/RecipeShareListTable";
import GalleryListTable from "../../components/Management/Comunity/GalleryListTable";

const ManagementComunity = () => {
    return (
        <div className={style.managementDashboardContainer} >
            <Stack >
                <Row className={style.downPartRow} xs={1} md={2}>
                    <Col className={style.downPartCol}>
                        <Card border="light">
                            <Card.Title>
                                레시피
                            </Card.Title>
                            <Card.Body>
                                <RecipeShareListTable />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className={style.downPartCol}>
                        <Card border="light">
                            <Card.Title>
                                갤러리
                            </Card.Title>
                            <Card.Body>
                                <GalleryListTable />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Stack>
        </div>
    );
}

export default ManagementComunity;