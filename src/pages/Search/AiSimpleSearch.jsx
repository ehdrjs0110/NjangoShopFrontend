

import Navigation from '../../components/Nav/Navigation'
import Container from "react-bootstrap/Container";
import styles from "../../styles/Search/AiSearch.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, {useState} from "react";

import aiSimpleCss from '../../styles/Search/AiSimpleSearch.module.scss';
import axios from "axios";
import {isNumber} from "@mui/x-data-grid/internals";




const AiSimpleSearch = () => {

    // 선택한 재료
    const [selectedIngredientList, setSelectedIngredientList] = useState([]);
    // 레시피 답변
    const [recipe, setRecipe] = useState(null);
    // 레시피 갯수
    const [recipeCount, setRecipeCount] = useState("5");
    var myIngredientList = ["양파", "당근","마늘","파","가지","사과","토마토","김치"];



    // 레시피 갯수 입력받기
    const recipeHendler = (event) => {
        const {value} = event.target;
        console.log(typeof value);
        console.log(value);
        if(Number(value) <= 5){
            console.log("검색가능");
            setRecipeCount(value);
        }
        else {
            console.error("검색 불가능");
        }


    }


    // UI = 냉장고 속 재료 보여주기
    const  makeMyIngredientList = () => {
        const checkLsit = myIngredientList.map((ingredient, index) =>
            <Form.Check
                key={index}
                inline
                type="checkbox"
                name="group1"
                id={`inline-checkbox-${index}`}
                label={ingredient}
                onChange={() => selectIngredient(ingredient)}
                checked={selectedIngredientList.includes(ingredient)}

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
            <Col key={index}>{ingredient}</Col>
        )
        return checkedList;
    }



    // prompt 요청
    async function aiSearchRequest () {
        console.log("selectedMyIngredientList" + selectedIngredientList);
        // console.log();
        console.log(recipeCount);

        if(recipeCount == null || Number(recipeCount) <= 0 )
        {
            setRecipeCount("1");
        }


        console.log("요청 중");
        const requestBody = {"userContent" : ` ${selectedIngredientList}를 이용한 레시피를 ${recipeCount}개를 알려주는데 재료는 자세하게 알려주고 만드는 과정에 ` +
                `대해서는 130글자 내로 간략하게 알려줘  ${myIngredientList}가 있어 형태는 요리제목,재료,과정으로 알려줘` +
                `그리고 json 객체로 {0:[요리 1], ...} 형태로 ${recipeCount}갯수로 참고로 키는 무조건 숫자여야해 보내줘`};
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

        console.log(recipeCount);

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
                                    <Card.Text as="div">
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
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    className="ai-search-input"
                                    onChange={recipeHendler}
                                    value={recipeCount}

                                />
                                <Button variant="outline-secondary" id="button-addon2" className={styles.aiSearchButton} onClick={aiSearchRequest}>
                                    검색
                                </Button>
                            </InputGroup>
                        </div>
                        {/*레시피 검색 버튼 종료*/}


                        {/*레시피 결과 리스트 시작점*/}
                        <div className={aiSimpleCss.aiSearchListContainer}>
                            {recipeResponce()}
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