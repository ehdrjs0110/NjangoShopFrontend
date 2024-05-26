import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Navigation from '../../components/Nav/Navigation'

import styles from '../../styles/Inven/Inven.module.scss'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Main() {
  const navigate = useNavigate();

  const signin = () => {
    navigate('/SignIn');
  };
  
  return (
    <>
        <Navigation></Navigation>
        <Container fluid className={styles.container}>
          <div className={styles.main}>
          <Row className={styles.linkrow}>
            <Col md={{span: 10, offset: 1}} className={styles.linkbox}>
              <h1>AI 레시피 검색</h1>
              <a onClick={signin}>바로가기</a>
            </Col>
          </Row>
        </div>
        </Container>
    </>
  );
}

export default Main;