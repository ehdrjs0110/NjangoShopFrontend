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
// import {useAuth} from '../../services/auth';

function Main() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

  const location = useLocation();
  const {accessToken} = location.state || {};
  console.log(accessToken);


  useEffect(() => {
      // getNewToken();
      if(!accessToken){
          getNewToken();
      }
  },[])


  let newAccessToken;
  let newRefreshToken;

  async function getNewToken() {
    console.log("refresh token cookie" +cookies.refreshToken);
    const refreshToken = cookies.refreshToken;

    let response;
    try {
      response = await axios.post(
          "http://localhost:8080/api/v1/auth/refreshToken",{},
          {
            headers: {
              "Authorization": `Bearer ${refreshToken}`
            }
          }
      );
    }// 싪패시 로그인 유도
    catch (e) {
      console.log(e);
      navigate('/Sign');
    }
    // response.data;
    console.log(response.data);
    // console.log(res.data);
    newAccessToken = response.data.accessToken;
    newRefreshToken = response.data.refreshToken;

    newRefreshToken = JSON.stringify(refreshToken);



    setCookie(
        'refreshToken',
        refreshToken,
        {
          path:'/',
          maxAge: 7 * 24 * 60 * 60, // 7일
          // expires:new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
        }
    )

  }



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