import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Navigation from '../../components/Nav/Navigation'
import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faEllipsis,
    faHandHoldingHeart,
    faHourglassHalf,
    faMobile,
    faStar,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {useLocation} from "react-router-dom";
import axios from "axios";




const AiDetaileSearch = () => {
    const location = useLocation(); // 현재 위치 객체를 가져옴
    const { recipe } = location.state || {}; // 전달된 상태에서 recipe 추출, 없을 경우 빈 객체로 대체
    // const {detailRecipe, setDetailRecipe} = useState(null);
    const [detailRecipe, setDetailRecipe] = useState(null);
    const [etc, setEtc] = useState(null);
    const [level,setLevel] = useState(0);
    const [time,setTime] = useState(0);
    const [serve,setServe] = useState(0);

    // const [recipyTitle, setRecipyTitle] = useState(recipe.요리제목);


    console.log(recipe);

    let recipyTitle = recipe.요리제목;
    // setRecipyTitle(recipe.요리제목);z
    const ingredientObject = recipe.재료;
    const recipyIndigredient = JSON.stringify(ingredientObject);
    let recipyProgress = recipe.과정;

    function makeString () {
        let string;
        Object.entries(ingredientObject).map(([key, value], index) => (
            string+=`${key} 재료는 ${value}사용 ,`
        ));

        return string;
    }


    // 재료 리스트 ui

    function makeIngredient () {
        return Object.entries(ingredientObject).map(([key, value], index) => (
            <Row key={index} xs={2} md={2} lg={2}>
                <Col>{key}</Col>
                <Col style={{textAlign: "right"}}>{value}</Col>
            </Row>
        ));
    }

    function makeLeve ()
    {
        if (level == 1) {
            return (
                <div>

                    <FontAwesomeIcon icon={faStar} style={{fontSize: "0.8rem"}}/>
                </div>
            )
        }
        else if (level == 2 ) {
            return (
                <div>
                    <FontAwesomeIcon icon={faStar} style={{fontSize: "0.8rem"}}/>
                    <FontAwesomeIcon icon={faStar} style={{fontSize: "0.8rem"}}/>
                </div>
            )
        }
        else {
            return (
                <div>
                    <FontAwesomeIcon icon={faStar} style={{fontSize: "0.8rem"}}/>
                    <FontAwesomeIcon icon={faStar} style={{fontSize: "0.8rem"}}/>
                    <FontAwesomeIcon icon={faStar} style={{fontSize: "0.8rem"}}/>
                </div>
            )
        }
    }


    async function aiSearchEtcRequest (){
        let level = `${recipyTitle} 종류의 ${recipyProgress} 레시피가 난이도는 1~3에서 어느 정도인지, 몇 인분인지, 소요 예상 시간은 어떤지 보내줘` +
            "그리고 json 객체로  {0:{난이도: },1:{인분: },2:{소요시간: },} ```형태로만 참고로 키는 무조건 숫자여야해 보내줘";
        let ectResponse;
        console.log("요청중");


        const requestBody = {
            "userContent": level
        };

        try {
            ectResponse = await axios.post(
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

        // console.log("인분");
        // console.log(ectResponse);
        let response = ectResponse.data.choices[0].message.content;
        console.log(response);
        // const cleanString = response.replace(/```json|```/g, '').trim();
        // console.log("cleanString: " + cleanString);
        // const stringObject = JSON.parse(cleanString);
        // const ectList =  Object.values(stringObject);
        // console.log(ectList);

        var startNum = response.indexOf( "```json");
        var lastNum = response.indexOf ("```", startNum + 10 );
        var cleanString =  response.slice(startNum+7,lastNum);
        console.log(cleanString);


        // JSON 문자열을 JavaScript 객체로 변환
        const etc = JSON.parse(cleanString);
        const etcList =  Object.values(etc);
        console.log(etcList);

        console.log(etcList[0]);

        setEtc(etcList);

        // 난이도
        setLevel(etcList[0].난이도);
        setServe(etcList[1].인분);
        setTime(etcList[2].소요시간);

    }




    async function aiSearchRequest () {
        let recipyIndigredientString = makeString();
        let request  = `${recipyTitle} 종류의 ${recipyProgress} 레시피를 알려주는데 만드는 과정을 더욱 자세하게 얘기해주고 재료는 종류, 양 변화 없이 ${recipyIndigredientString} 추가사항 없이 사용되어야 해 ` +
                "그리고 json 객체로 {0:[{과정제목: },{과정:  }], 1: [{과정제목: },{과정:  }, ..} 형태로만 참고로 키는 무조건 숫자여야해 보내줘";

        console.log("요청 중");

        const requestBody = {
            "userContent": request
        };

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

        console.log(searchResponse);

        let response = searchResponse.data.choices[0].message.content;
        console.log("최종 응답");

        console.log(response);

        // ```json과 ```를 제거하는 코드
        const cleanString = response.replace(/```json|```/g, '').trim();

        // JSON 문자열을 JavaScript 객체로 변환
        const recipes = JSON.parse(cleanString);
        const recipesList =  Object.values(recipes);

        console.log(recipesList);
        // console.log("JavaScript 객체를 콘솔에 출력");
        // console.log(recipes);
        setDetailRecipe(recipesList);
    }


    // 레시피 자세히 보기 ui
    function makeDetailRecipe ()
    {
        if(detailRecipe != null)
        {
            return detailRecipe.map((recipe,index) => (
                <div key={index}>
                    <Row>
                        <Col style={{padding:0}}>
                            <div>
                                <Card style={{height: "100%", textAlign:"center"}}>
                                    {index}
                                </Card>
                            </div>

                        </Col>
                        <Col xs={11} style={{}}>
                            <Card style={{ width: '100%',border:"0",padding:"0" }}>
                                <Card.Body style={{border:"0",padding:"0 "}}>
                                    <Card.Title>{recipe[0].과정제목}</Card.Title>
                                    <Card.Text>
                                        {recipe[1].과정}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            ));
        }
        return null;
    }

    useEffect(() => {
        aiSearchRequest()
        aiSearchEtcRequest()
        // setRecipyTitle(recipe.요리제목);
    }, []);




    return (
        <>
            <Navigation />
            <div>
                <Container fluid style={{padding:0}} >
                    <Row style={{ backgroundColor: "lightblue", height: "100vh" ,paddingLeft:0, paddingRight:0}}>
                        <Col style={{ backgroundColor: "white", paddingLeft: 0, paddingRight: 0 }} md={{ span: 10, offset: 1 }}>
                            <Col md={{ span:  8, offset: 2 }} >
                                <Card style={{height: "100vh"}}>
                                    <Card.Body>
                                        <Card.Title>
                                            <Row xs={2} md={2} lg={2}>
                                                <Col>
                                                    {recipyTitle}
                                                </Col>
                                                <Col>
                                                    <Button variant="outline-secondary">
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </Button>{' '}
                                                    <Button variant="outline-secondary">
                                                        <FontAwesomeIcon icon={faMobile} />
                                                    </Button>{' '}
                                                    <Button variant="outline-secondary">
                                                        <FontAwesomeIcon icon={faEllipsis} />
                                                    </Button>{' '}
                                                </Col>
                                            </Row>
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            <Row xs={2} md={2} lg={2}>
                                                <Row xs={3} md={3} lg={3}>
                                                    <Col>
                                                        <p>
                                                            {makeLeve()}
                                                        </p>
                                                    </Col>
                                                    <Col>
                                                        <p><FontAwesomeIcon icon={faUsers} style={{fontSize:"1.5rem"}}/></p>
                                                    </Col>
                                                    <Col>
                                                        <p><FontAwesomeIcon icon={faHourglassHalf} style={{fontSize:"1.5rem"}} /></p>
                                                    </Col>
                                                </Row>
                                                <Row xs={2} md={2} lg={2}>
                                                    <Col>
                                                    {/*    여기는 비율 맞추기 위한 공백  */}
                                                    </Col>
                                                    <Col>
                                                        <Button variant="outline-secondary" style={{padding:0, width:"100%", height:"100%"}}>요리완료</Button>
                                                    </Col>
                                                </Row>
                                            </Row>
                                            <Row xs={2} md={2} lg={2}>
                                                <Row xs={3} md={3} lg={3}>
                                                    <Col>
                                                        <p>난이도</p>
                                                    </Col>
                                                    <Col>
                                                        <p>{serve}인분</p>
                                                    </Col>
                                                    {/*{aiSearchEtcRequest()}*/}
                                                    <Col>
                                                        <p>{time}분</p>
                                                    </Col>
                                                </Row>
                                                <Row xs={2} md={2} lg={2}>
                                                {/*여기는 비율 맞추기 위한 공백    */}
                                                </Row>
                                            </Row>
                                        </Card.Subtitle>
                                        {/*재료*/}
                                            <div>
                                            <Card style={{ width: '100%' }}>
                                                <Card.Body>
                                                    <Card.Title>재료</Card.Title>
                                                    <div>
                                                        {makeIngredient()}
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                            </div>
                                        {/*재료 종료*/}
                                        {/*레시피*/}
                                            <div>
                                                <Card style={{ width: '100%' }}>
                                                    <Card.Body>
                                                        <Card.Title>레시피</Card.Title>
                                                        {makeDetailRecipe()}
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        {/*레시피 종료*/}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default AiDetaileSearch;
