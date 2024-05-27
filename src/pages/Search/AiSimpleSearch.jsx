

import Navigation from '../../components/Nav/Navigation'
import Container from "react-bootstrap/Container";
import styles from "../../styles/Search/AiSearch.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Accordion, Table} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import React, {useState} from "react";

import aiSimpleCss from '../../styles/Search/AiSimpleSearch.module.scss';
import {useAccordionButton} from "react-bootstrap/AccordionButton";



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





const AiSimpleSearch = () => {

    const [selectedIngredientList, setSelectedIngredientList] = useState([]);
    var myIngredientList = ["양파", "당근","마늘","파","가지","사과","토마토","김치"];




    // UI = 냉장고 속 재료 보여주기
    const  makeMyIngredientList = () => {
        const checkLsit = myIngredientList.map((ingredient, index) =>
            <Form.Check
                inline
                type="checkbox"
                name="group1"
                id={`inline-checkbox-${index}`}
                label={ingredient}
                onChange={() => selectIngredient(ingredient)}
                checked={selectedIngredientList.includes(ingredient)}
                key={index}
            />)
        return checkLsit;
    }

    // Logic = 선택한 재료 정리, selectedIngredientList에 반영
    const selectIngredient = (ingredient) => {
        setSelectedIngredientList(preState => {
            if (preState.includes(ingredient)) {
                return preState.filter(preItem => preItem !== ingredient )
            } else {
                return [...preState,ingredient];
            }
        });
    }

    // UI = Check 된 리스트 보여주기
    const makeCheckedList = () => {
        const checkedList = selectedIngredientList.map((ingredient, index) =>
            <Col>{ingredient}</Col>
        )
        return checkedList;
    }







    return(
        <div>
            <Navigation/>

            <Container fluid>
                <Row className="justify-content-md-center ai-search-row">
                    <Col xs lg="1" className="ai-search-col">
                        1 of 3
                    </Col>
                    <Col xs={8} lg={10}  className={aiSimpleCss.aiSearchMainCol}>

                        {/* 내 재료 시작점 */}
                        <div className={aiSimpleCss.myIngredientContainer} >
                            <Card border="secondary" className={aiSimpleCss.myIngredientCard}>
                                <Card.Body>
                                    <Card.Title>내 재료</Card.Title>
                                    <Card.Text>
                                        {/*재료 선택*/}
                                        {makeMyIngredientList()}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        {/*내 재료 카드 종료 */}

                        {/*선택된 재료 내역 시작점*/}
                        <div className={aiSimpleCss.checkedIngredientContainer}>
                            <Card border="secondary" >
                                <Card.Body>
                                    <Card.Title>Check</Card.Title>

                                    <Row xs={2} md={4} lg={6}>
                                        {makeCheckedList()}
                                    </Row>
                                    <Card.Text>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        {/*선택된 재료 내역 종료*/}



                        {/*레시피 검색 버튼 시작점*/}
                        <div className={aiSimpleCss.aiSearchNumberContainer}>
                            <InputGroup>
                                <InputGroup.Text id="basic-addon1">레시피 개수</InputGroup.Text>
                                <Form.Control
                                    placeholder="기본: 5"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    className="ai-search-input"
                                />
                                <Button variant="outline-secondary" id="button-addon2" className={styles.aiSearchButton}>
                                    검색
                                </Button>
                            </InputGroup>
                        </div>
                        {/*레시피 검색 버튼 종료*/}


                        {/*레시피 결과 리스트 시작점*/}
                        <div className={aiSimpleCss.aiSearchListContainer}>
                            <Card border="secondary" style={{ width: '100%' }}>
                                <Card.Header>된장찌개</Card.Header>
                                <Card.Body>
                                    <Card.Title>재료</Card.Title>
                                    <Card.Text>
                                        양파 반개, 두무 반모, 파, 된장, 마늘
                                    </Card.Text>
                                    <Card.Title>레시피</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        {/*레시피 결과 리스트 종료점*/}

                    </Col>
                    <Col xs lg="1" className="ai-search-col">
                        3 of 3
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AiSimpleSearch;