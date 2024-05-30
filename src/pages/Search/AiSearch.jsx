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
import axios from "axios";




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
    // 냉장고 재료 반영 선택 여부
    const [activeKey, setActiveKey] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [selectedKindOfFood, setSelectedKindOfFood] = useState([]);

    const [selectedMyIngredientList, setSelectedMyIngredientList] = useState([]);
    // const [allergyFood, setAllergyFood] = useState([])


    // 테스트 데이터
    let allergyFood = ["새우,오징어"];



    // 테스트 데이터
    var myIngredientList = ["양파", "당근","마늘","파","옥수수"];

    //  재료선택
    function makeIngredientList() {
        const IngredientList = myIngredientList.map((ingredient,index) =>

            <Form.Check
                inline
                type="checkbox"
                name="group3"
                id={ingredient}
                label={ingredient}
                onChange={myIngredientHandler}
            />)
        return IngredientList;
    }

    const myIngredientHandler = (event) => {
        const food = event.target.id;
        const isCheked = event.target.checked;

        setSelectedMyIngredientList((prevState) => {
            if(!isCheked)
                return prevState.filter(preItem => preItem !== food)
            else{
                return [...prevState, food];
            }
        })

        console.log(selectedKindOfFood);

        console.log(selectedKindOfFood);


    }


    // option - 종류

    var kindOfFoodList = ["한식", "중식", "양식"];


    const kindOfFoodHandler = (event) => {
        const kind = event.target.id;
        const isCheked = event.target.checked;

        setSelectedKindOfFood((prevState) => {
            if(!isCheked)
                return prevState.filter(preItem => preItem !== kind)
            else{
                return [...prevState, kind];
            }
        })

        console.log(selectedKindOfFood);

        console.log(selectedKindOfFood);


    }

    function makeKindOfFoodList() {
        return kindOfFoodList.map((kind,index) =>

            <Form.Check
                inline
                type="checkbox"
                name="group1"
                id={kind}
                label={kind}
                onChange={kindOfFoodHandler}
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







    // prompt 요청
    async function aiSearchRequest () {
        console.log("selectedKindOfFood: " + selectedKindOfFood );
        console.log("searchValue" + searchValue);
        console.log("allergyFood" + allergyFood);
        console.log("selectedMyIngredientList" + selectedMyIngredientList);
        // console.log();


        console.log("요청 중");
        const requestBody = {"userContent" : `${selectedKindOfFood} 종류의 ${searchValue} 레시피를 5개를 알려주는데 재료는 자세하게 알려주고 만드는 과정에 ` +
                `대해서는 130글자 내로 간략하게 알려줘 ${allergyFood}는 들어가면 안돼 ${selectedMyIngredientList}가 있어 형태는 요리제목,재료,과정으로 알려줘` +
                "그리고 json 객체로 {0:[요리 1], 1: [요리2], 2: [요리3}, 3:[요리], 4:[요리]} 형태로만 참고로 키는 무조건 숫자여야해 보내줘"};
        let searchResponse;
        try {
             searchResponse = await axios.post(
                "http://localhost:8080/api/v1/chat-gpt",
                requestBody,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

        } catch (e) {
            console.error(e);
        }

        let response = searchResponse.data.choices[0].message.content;

        console.log("최종 응답");

        console.log(response);

        // ```json과 ```를 제거하는 코드
        const cleanString = response.replace(/```json|```/g, '').trim();

        // JSON 문자열을 JavaScript 객체로 변환
        const recipes = JSON.parse(cleanString);

        console.log("JavaScript 객체를 콘솔에 출력");
        console.log(recipes);
        const recipesList =  Object.values(recipes);

        console.log(recipesList);
        setRecipe(recipesList);
    }


    // recipe UI
    function recipeResponce()
    {
        if (recipe != null)
        {
            return recipe.map((recipe, index) => (
                <Card key={index}>
                    <Card.Header>{JSON.stringify(recipe.요리제목)}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <strong>재료:</strong> {JSON.stringify(recipe.재료)}
                        </Card.Text>
                        <Card.Text>
                            <strong>과정:</strong> {JSON.stringify(recipe.과정)}
                        </Card.Text>
                        </Card.Body>
                </Card>
        ));
        }

        return null;

    }

    const searchInputHandler = (event) => {
        const {value} = event.target;
        setSearchValue(value);
    }

    return (
        <>
            <Navigation/>
            {/*<Container fluid className={styles.aiSearchContainer}>*/}
            <Container fluid style={{paddingLeft:0, paddingRight:0}}>
            <div className={styles.aiSearchContainer}>
                {/*<Row className="justify-content-md-center ai-search-row">*/}
                <Row  className={styles.aiSearchRow}>
                    {/*<Col xs="0" lg="1"   className="ai-search-col">*/}
                    {/*    1 of 3*/}
                    {/*</Col>*/}
                    <Col  style={{backgroundColor:"lightgrey", paddingLeft:0, paddingRight:0}} md={{ span: 10, offset: 1 }} >
                        {/*레시피 명 입력 지작점*/}
                        <div  style={{padding:0}}>
                            <InputGroup style={{padding:0}} className={styles.aiSearchInputGroup}>
                                <Form.Control  style={{padding:0}}
                                    placeholder="레시피 검색"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    className="ai-search-input"
                                    onChange={searchInputHandler}
                                    value={searchValue}
                                />
                                <Button variant="outline-secondary" id="button-addon2" className={styles.aiSearchButton} onClick={aiSearchRequest}>
                                    검색
                                </Button>
                            </InputGroup>
                        </div>
                        {/*레시피 명 입력 종료점*/}

                        {/*레시피 옵션 시작점*/}
                        <div>
                            <Accordion defaultActiveKey="0" alwaysOpen style={{ paddingRight: '0', paddingLeft: '0', width:'100%'}}>
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
                        </div>
                        {/*레시피 옵션 종료점*/}


                        {/*레시피 검색 결과 시작점*/}
                        <div>
                            {/*<Card border="secondary" style={{ width: '100%' }}>*/}
                                {/*<Card.Header>된장찌개</Card.Header>*/}
                                {/*<Card.Body>*/}
                                {/*    <Card.Title>재료</Card.Title>*/}
                                {/*    <Card.Text>*/}
                                {/*       양파 반개, 두무 반모, 파, 된장, 마늘*/}
                                {/*    </Card.Text>*/}
                                {/*    <Card.Title>레시피</Card.Title>*/}
                                {/*    <Card.Text>*/}
                                {/*        Some quick example text to build on the card title and make up the*/}
                                {/*        bulk of the card's content.*/}
                                {/*    </Card.Text>*/}
                                {/*</Card.Body>*/}
                                {/*{recipe && recipeResponce}*/}
                            {recipeResponce()}
                            {/*</Card>*/}
                        </div>
                        {/*/!*레시피 검색 결과 종료점*!/*/}



                    </Col>
                    {/*<Col xs="0" lg="1" className="ai-search-col">*/}
                    {/*    3 of 3*/}
                    {/*</Col>*/}
                </Row>

            </div>
                </Container>
        </>
    );
}

export default AiSearch;
