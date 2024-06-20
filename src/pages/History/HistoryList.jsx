import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';

import Navigation from '../../components/Nav/Navigation'

import styles from '../../styles/Search/AiSearch.module.scss';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const HistoryList = () => {
    
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {

            const userid = "ehdrjs0110@naver.com";
      
            try{
                const res = await axios.get(`http://localhost:8080/history/${userid}`);
                const storedRecipe = res.data;
                console.log(storedRecipe);

                if(storedRecipe) {
                    setRecipe(storedRecipe);
                }
      
            }catch(err){
              console.log("err message : " + err);
            }
          }
      
          fetchData();

    }, []);

    // recipe UI
    function recipeResponce()
    {
        if (recipe != null)
        {
            return recipe.map((recipe, index) => (
                <Card className={styles.recipeCard} key={index}>
                    <Card.Header  className={styles.hearder}>
                        <Row xs={1} md={2}>
                            <Col className={styles.recipeTitleCol}>
                                {JSON.stringify(recipe.title)}
                            </Col>
                            <Col className={styles.recipeDetailSearchCol}>
                                <Button className={styles.recipeDetailSearchButton}  variant="outline-secondary" onClick={() =>startDetailAiSearch(recipe.recipeId)}>
                                        상세보기
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <strong>재료:</strong> {JSON.stringify(recipe.ingredients)}
                        </Card.Text>
                    </Card.Body>
                </Card>
        ));
        }

        return null;

    }

    // 레시피 상세 보기로 값 넘겨주가
    const startDetailAiSearch = (recipe) =>
    {
        navigate('/HistoryDetail', { state: { recipe } }); // 레시피 전달

    }

    return (
        <>
            <Navigation/>
            <Container fluid style={{paddingLeft:0, paddingRight:0}}>
            <div className={styles.aiSearchContainer}>
                <Row  className={styles.aiSearchRow}>
                    <Col  style={{paddingLeft:0, paddingRight:0}} md={{ span: 10, offset: 1 }} className={styles.aiSearchCol} >
                       

                        {/* Title 시작점*/}
                        <div className={styles.aiSearchOptionContainer}>
                            히스토리
                        </div>
                        {/* Title 종료점*/}


                        {/*레시피 History 시작점*/}
                        <div className={styles.recipeContainer}>

                            {recipeResponce()}
                        </div>
                        {/*/!*레시피 History 종료점*!/*/}



                    </Col>
                </Row>

            </div>
                </Container>
        </>
    );
}

export default HistoryList;