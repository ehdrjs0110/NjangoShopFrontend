import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import classNames from 'classnames';

import Navigation from '../../components/Nav/Navigation'
import axios from "axios";

import styles from '../../styles/Inven/Inven.module.scss'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Inven() {
  
  const navigate = useNavigate();

  //페이지 변화
  const [isChange, setChange] = useState(false);
  //재료 데이터
  const [isData, setData] = useState([]);



  useEffect(() => {

    const fetchData = async () => {

      const params = { userid:"ehdrjs0110"};

      try{
        const res = await axios.get("http://localhost:8080/inven/manage", {params});
        console.log(res.data);
        setData(res.data);

      }catch(err){
        console.log("err message : " + err);
      }
    }

    fetchData();

  }, [isChange]);

  const addData = async () => {

    const data = { 
      userid : "ehdrjs0110",
      ingredientname : "오이",
      size : "없음",
      count : 0,
      dateofuse :"",
      lastuse :"",
      lastget :"",
      memo : ""
    };

    try{
      console.log(data);
      const res = await axios.post("http://localhost:8080/inven/manage/add", {data});
      console.log(res.data);
      setData(res.data);
      setChange(!isChange);

    }catch(err){
      console.log("err message : " + err);
    }

  };

  const excelmode = () => {
    navigate('/Excel');
  };
  
  return (
    <>
        <Navigation></Navigation>
        <Container fluid className={styles.container}>
          <div className={styles.main}>
          <Row className={styles.controllerRow}>
            <Col md={{span: 10, offset: 1}} className={styles.controller}>
              <Row className={styles.controllerRow1}>
                <Col>
                  <h2 className={styles.title}>냉장고 관리</h2>
                </Col>
              </Row>
              <Row className={styles.controllerRow2}>
                <Col className={styles.controlform}>
                  <div className={styles.serch}>
                    <Form.Control type="text" placeholder="재료검색" />
                  </div>
                  <Button className={styles.serchbtn} variant="primary">검색</Button>
                  <Button className={styles.btn} onClick={excelmode} variant="dark">전문가 모드</Button>
                  <Button className={styles.btn} variant="light">나의 재료로 요리하기</Button>
                  <Button className={styles.btn} variant="info">일괄 저장</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={styles.contentRow}>
            <Col md={{span: 10, offset: 1}} className={styles.content}>

              {isData.map((item, index) => {
                // 클래스 네임 결합
                const combinedClassName = classNames(
                  index % 2 === 0 ? styles.odd : styles.even,
                  styles.line
                );

                return (
                  <div key={index} className="item">
                    <Row className={combinedClassName}>
                      <Col>
                        <h3 className={styles.title}>{item.ingredientname}</h3>
                      </Col>
                      <Col>
                        <Button className={styles.btn} variant="secondary" disabled>없음</Button>
                      </Col>
                      <Col>
                        <Button className={styles.btn} variant="warning">적음</Button>
                        <Button className={styles.btn} variant="primary">적당함</Button>
                        <Button className={styles.btn} variant="success">많음</Button>
                      </Col>
                      <Col>
                        <p className={styles.text}>수량</p>
                        <Form.Control type="number" className={styles.count} placeholder="0" value={item.count} />
                      </Col>
                      <Col>
                        <Button className={styles.btn} variant="danger">삭제</Button>
                      </Col>
                    </Row>
                  </div>
                );
              })}

              <Button variant="primary" onClick={addData}>+</Button>

            </Col>
          </Row>
        </div>
        </Container>
    </>
  );
}

export default Inven;