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
// auth 관련 --
import {useCookies} from "react-cookie";
import {getNewToken} from "../../services/auth2";
import {containToken} from "../../Store/tokenSlice";
import {useDispatch, useSelector} from "react-redux";
//--

const HistoryList = () => {
    
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();



    // auth 관련 --
    const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);
    // redux에서 가져오기
    let accessToken = useSelector(state => state.token.value);
    let userId = useSelector(state => state.userEmail.value);
    const dispatch = useDispatch();
    // --

    useEffect(() => {

        // access token의 유무에 따라 재발급 --
        let refreshToken = cookies.refreshToken;
        async function checkAccessToken() {
            try {
                // console.log("useEffect에서 실행")

                // getNewToken 함수 호출 (비동기 함수이므로 await 사용)
                const result = await getNewToken(refreshToken);
                refreshToken = result.newRefreshToken;

                // refresh token cookie에 재설정
                setCookie(
                    'refreshToken',
                    refreshToken,
                    {
                        path:'/',
                        maxAge: 7 * 24 * 60 * 60, // 7일
                        // expires:new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
                    }
                )

                // Redux access token 재설정
                dispatch(containToken(result.newToken));

            } catch (error) {
                console.log(error);
                navigate('/SignIn');
            }
        }
        // checkAccessToken();

        // checkAccessToken();
        if(accessToken == null || accessToken == undefined)
        {
            checkAccessToken();
        }

        // --

        const fetchData = async () => {
      
            try{
                const res = await axios.get(`http://localhost:8080/history/${userId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${accessToken}` // auth 설정
                        },
                    }
                );
                const storedRecipe = res.data;
                console.log(storedRecipe);

                if(storedRecipe) {
                    // JSON 문자열을 파싱하여 불필요한 이스케이프 문자를 제거
                    const recipes = storedRecipe.map(item => ({
                        ...item,
                        ingredients: JSON.parse(item.ingredients)
                    }));

                    console.log(recipes);
                    setRecipe(recipes);
                }
      
            }catch(err){
              console.log("err message : " + err);
              // 첫 랜더링 시에 받아온 토큰이 기간이 만료했을 경우 다시 받아오기 위함
            checkAccessToken2();
            try {

                const res = await axios.get(`http://localhost:8080/history/${userId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${accessToken}` // auth 설정
                        },
                    }
                );
                const storedRecipe = res.data;
                console.log(storedRecipe);

                if(storedRecipe) {
                    // JSON 문자열을 파싱하여 불필요한 이스케이프 문자를 제거
                    const recipes = storedRecipe.map(item => ({
                        ...item,
                        ingredients: JSON.parse(item.ingredients)
                    }));

                    console.log(recipes);
                    setRecipe(storedRecipe);
                }

            } catch (e) {
                console.error(e);
                // 첫 랜더링 시에 받아온 토큰이 기간이 만료했을 경우 다시 받아오기 위함
                checkAccessToken2();
                }
            }
        }
      
          fetchData();

    }, []);

    async function checkAccessToken2() {

        let refreshToken = cookies.refreshToken;
        try {

            // getNewToken 함수 호출 (비동기 함수이므로 await 사용)
            const result = await getNewToken(refreshToken);
            refreshToken = result.newRefreshToken;

            // refresh token cookie에 재설정
            setCookie(
                'refreshToken',
                refreshToken,
                {
                    path:'/',
                    maxAge: 7 * 24 * 60 * 60, // 7일
                    // expires:new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
                }
            )

            // Redux access token 재설정
            dispatch(containToken(result.newToken));

        } catch (error) {
            console.log(error);
            navigate('/Sign');
        }
    }

    const deleteRecipe = async (historyId) => {

        if(window.confirm("정말 삭제 하시겠습니까?")){

            try{
                const res = await axios.delete(`http://localhost:8080/history/${historyId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${accessToken}` // auth 설정
                        },
                    }
                );

                if(res){
                    alert("삭제되었습니다.");
                }else {
                    alert("실패했습니다.");
                }

            }catch(e) {
                console.error(e);
                checkAccessToken2();
    
                try{
                    await axios.delete(`http://localhost:8080/history/${historyId}`,
                        {
                            headers: {
                                "Authorization": `Bearer ${accessToken}` // auth 설정
                            },
                        }
                    )
                }catch(e) {
                    console.error(e);
                    checkAccessToken2();
                }
            }
        }else {
            alert("취소 되었습니다.");
        }

        
    };


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
                                {JSON.stringify(recipe.title).replace(/\"/gi, "")}
                            </Col>
                            <Col className={styles.recipeDetailSearchCol}>
                                <Button className={styles.recipeDetailSearchButton}  variant="outline-secondary" onClick={() =>startDetailAiSearch(recipe)}>
                                        상세보기
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <strong>재료:</strong> {formatIngredients(recipe.ingredients)}
                            <Button className={styles.deleteBtn} onClick={() => deleteRecipe(recipe.historyId)}>삭제</Button>
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

    // ingredients 객체를 문자열로 변환하여 사람이 읽기 쉽게 포맷팅하는 함수
    const formatIngredients = (ingredients) => {
        return Object.entries(ingredients)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
    };

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