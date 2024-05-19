import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from '../../styles/Promotion/Promotion.module.scss';

const Promotion = () => {
  const navigate = useNavigate();

  const emailsign = () => {
    navigate('/SignUp');
  };

  const signin = () => {
    navigate('/SignIn');
  };

  return (
    <Container fluid>
      <Row>
        <Col>
            <div className={styles.maincontent}>
                asd
            </div>
        </Col>
        <Col>
            <div className={styles.sidecontent}>
                asd
            </div>
        </Col>
      </Row>

    </Container>
  );
}

export default  Promotion;