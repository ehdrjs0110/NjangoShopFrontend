import { useState, useEffect, useRef } from 'react';
import style from "../../styles/Management/ManagementDashboard.module.scss";
import Card from "react-bootstrap/Card";
import { Stack } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RecipeShareListTable from "../../components/Management/Comunity/RecipeShareListTable";
import GalleryListTable from "../../components/Management/Comunity/GalleryListTable";

const ManagementComunity = () => {
    const [current, setCurrent] = useState(0);
    const [card, setCard] = useState();
    const startX = useRef(0);
    const diff = useRef(0);

    const cards = [{
        title: '레시피',
        component: <RecipeShareListTable />,
    }, {
        title: '갤러리',
        component: <GalleryListTable />,
    }];

    useEffect(() => {
        setCard(cards[current]);
    }, [current]);

    const handleMouseDown = (e) => {
        startX.current = e.clientX;
    };

    const handleMouseMove = (e) => {
        if (startX.current !== 0) {
            diff.current = e.clientX - startX.current;
        }
    };

    const handleMouseUp = () => {
        if (Math.abs(diff.current) > 50) { // 드래그 거리가 50px 이상일 때만
            if (diff.current > 0) {
                setCurrent((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
            } else {
                setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
            }
        }
        startX.current = 0;
        diff.current = 0;
    };

    return (
        <div
            className={style.managementDashboardContainer}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <Stack>
                <Row className={style.downPartRow} xs={1} md={1}>
                    <Col className={style.downPartCol}>
                        <Card border="light">
                            <Card.Title>
                                {card?.title}
                            </Card.Title>
                            <Card.Body>
                                {card?.component}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Stack>
        </div>
    );
}

export default ManagementComunity;
