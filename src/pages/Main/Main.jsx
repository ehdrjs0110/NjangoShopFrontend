import React, { useState , useRef , useEffect } from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import Navigation from '../../components/Nav/Navigation'

import '../../styles/Bootstrap/Bootstrap.scss';
import styles from '../../styles/Main/Main.module.scss'

import recipeImg from "../../assets/Main/recipe.jpg";
import managerImg from "../../assets/Main/manager.jpg";
import galleryImg from "../../assets/Main/gallery.jpg";
import comuImg from "../../assets/Main/comu.jpg";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { useCookies } from 'react-cookie';
import {useDispatch, useSelector} from "react-redux";
import {getNewToken} from '../../services/auth2';
import {containToken} from "../../Store/tokenSlice";

function Main() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);



 // redux에서 가져오기
  let accessToken = useSelector(state => state.token.value);
  const dispatch = useDispatch();


  useEffect(() => {

    let refreshToken = cookies.refreshToken;
    async function checkAccessToken() {
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

    if(accessToken == null || accessToken == undefined)
    {
      checkAccessToken();
    }

    },[])







  const AiSearch = () => {
    navigate('/AiSearch');
  };

  const signin = () => {
    navigate('/SignIn');
  };

  const inven = () => {
    navigate('/Inven');
  };
  
  return (
    <>
        <Navigation></Navigation>
        <Container fluid className={styles.container}>
          <div className={styles.main}>
          <Row className={styles.linkrow}>
            <Col md={{span: 3, offset: 2}} className={styles.linkbox}>
              <img src={recipeImg} className={styles.img} alt='' />
              <div className={styles.panel}>
                <h2 className={styles.text}>레시피 검색</h2>
                <a onClick={AiSearch}>바로가기</a>
              </div>
            </Col>
            <Col md={{span: 3, offset: 2}} className={styles.linkbox}>
            <img src={managerImg} className={styles.img} alt='' />
              <div className={styles.panel}>
                <h2 className={styles.text}>냉장고 관리</h2>
                <a onClick={inven}>바로가기</a>
              </div>
            </Col>
          </Row>
          <Row className={styles.linkrow}>
            <Col md={{span: 3, offset: 2}} className={styles.linkbox}>
            <img src={comuImg} className={styles.img} alt='' />
              <div className={styles.panel}>
                <h2 className={styles.text}>커뮤니티</h2>
                <a onClick={signin}>바로가기</a>
              </div>
            </Col>
            <Col md={{span: 3, offset: 2}} className={styles.linkbox}>
            <img src={galleryImg} className={styles.img} alt='' />
              <div className={styles.panel}>
                <h2 className={styles.text}>갤러리</h2>
                <a onClick={signin}>바로가기</a>
              </div>
            </Col>
          </Row>
          </div>
        </Container>
    </>
  );
}

export default Main;