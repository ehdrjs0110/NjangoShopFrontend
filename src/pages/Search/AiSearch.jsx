import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import {Accordion} from "react-bootstrap";

import Navigation from '../../components/Nav/Navigation'

import styles from '../../styles/Search/AiSearch.module.scss';




function CustomToggle({ children, eventKey }) {



    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <button
            type="button"
            style={{ backgroundColor: 'pink' }}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}


const AiSearch = () => {
    const [activeKey, setActiveKey] = useState(null);
    const [recipe, setRecipe] = useState(null);

    var myIngredientList = ["양파", "당근","마늘","파"];

    function makeIngredientList() {
        const IngredientList = myIngredientList.map((ingredient,index) =>

            <Form.Check
                inline
                type="checkbox"
                name="group3"
                id={`inline-checkbox-${index}`}
                label={ingredient}
            />)
        return IngredientList;
    }

    var kindOfFoodList = ["한식", "중식", "양식"];

    function makeKindOfFoodList() {
        return kindOfFoodList.map((kind,index) =>

            <Form.Check
                inline
                type="checkbox"
                name="group1"
                id={`inline-checkbox-${index}`}
                label={kind}
            />)
    }




    const handleCheckboxChange = () => {
        setActiveKey(activeKey === "1" ? null : "1");
    };

    var etcList = ["냉장고 재료 반영", "알레르기 반영", "소비 기한 우선 사용"];


    function makeEtcList() {
        return etcList.map((etc,index) =>
        {
            if(!index)
            {
                return(
                <Form.Check
                    inline
                    type="checkbox"
                    name="group2"
                    id="inline-checkbox-4"
                    label="냉장고 재료 반영"
                    onChange={handleCheckboxChange}
                    checked={activeKey === "1"}
                />
                );
            }
            else{
                return (
                    <Form.Check
                        inline
                        type="checkbox"
                        name="group2"
                        id={`inline-checkbox-${index}`}
                        label={etc}
                    />
                );
            }
        });
    }



    function recipeResponce()
    {
        setRecipe(["부대찌개 만드는 법","감자탕 만드는 법","아이스크림 만드는 법"]);

        if (recipe != null)
        {

        }

    }


    return (
        <>
            <Navigation/>
            <Container fluid className={styles.aiSearchContainer}>
                <Row className="justify-content-md-center ai-search-row">
                    <Col xs lg="1" className="ai-search-col">
                        1 of 3
                    </Col>
                    <Col xs={8} lg={10}  className={styles.aiSearchMainCol}>
                        <InputGroup className={styles.aiSearchInputGroup}>
                            <Form.Control
                                placeholder="레시피 검색"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                className="ai-search-input"
                            />
                            <Button variant="outline-secondary" id="button-addon2" className={styles.aiSearchButton}>
                                검색
                            </Button>
                        </InputGroup>
                        <Container style={{ paddingRight: '0', paddingLeft: '0' }}   className={styles.aiSearchOptionButtonContainer}>
                            <Accordion defaultActiveKey="0" alwaysOpen>
                                <Card  className>
                                    <Card.Header className={styles.aiSearchOptionButton}>
                                        <CustomToggle eventKey="0"  >Option</CustomToggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <div>
                                                <Form.Group>
                                                    종류&nbsp;&nbsp;&nbsp;
                                                    {makeKindOfFoodList()}
                                                </Form.Group>
                                            </div>
                                            <div>
                                                <Form.Group>
                                                    기타&nbsp;&nbsp;&nbsp;
                                                    {makeEtcList()}
                                                </Form.Group>
                                            </div>
                                            <Accordion activeKey={activeKey}>
                                                <Card>
                                                    <Accordion.Collapse eventKey="1">
                                                        <Card.Body>
                                                            <div>
                                                                <h5>내 재료</h5>
                                                                <Form.Group>
                                                                    {makeIngredientList()}
                                                                </Form.Group>
                                                            </div>

                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </Accordion>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Container>
                    </Col>
                    <Col xs lg="1" className="ai-search-col">
                        3 of 3
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AiSearch;
