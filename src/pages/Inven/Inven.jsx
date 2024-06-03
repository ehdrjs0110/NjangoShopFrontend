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
  //추가 재료 데이터
  const [isNewData, setNewData] = useState([]);
  //삭제 재료 데이터
  const [isDelData, setDelData] = useState([]);


  useEffect(() => {
    setNewData({      
      userid : "ehdrjs0110",
    });
  },[]);

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

    const data = isNewData;

    try{
      console.log(data);
      const res = await axios.post("http://localhost:8080/inven/manage/add", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setChange(!isChange);

    }catch(err){
      console.log("err message : " + err);
    }

  };

  //재료 삭제
  const deleteData = async (selectIndex) => {

    const selectedItem = isData[selectIndex];
    setDelData(selectedItem.ingredientname);

    const params = {
      userid: "ehdrjs0110",
      ingredientname: selectedItem.ingredientname
    };

    if(window.confirm(`정말 ${selectedItem.ingredientname}를 삭제하시겠습니까?`)){
      try{ 
        console.log(params);
        await axios.delete("http://localhost:8080/inven/manage/delete", {params});
        alert("삭제 되었습니다.");
        setChange(!isChange);
      }catch(err){
        console.log("err message : " + err);
      }
    }else {
      alert("취소 되었습니다.");
    }
    

  };

  //재료명 입력
  const setIngredName = (e) => {
    setNewData((isNewData) => ({
      ...isNewData,
      "ingredientname" : e.target.value,
    }));
  };

  //재료양 입력
  const setSize = (e) => {
    setNewData((isNewData) => ({
      ...isNewData,
      "size" : e.target.value,
    }));

  };
  
  //재료수량 입력
  const setCount = (e) => {
    setNewData((isNewData) => ({
      ...isNewData,
      "count" : e.target.value,
    }));

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

            <Row className={styles.addline}>
                <Col>
                <Form.Control type="text" className={styles.ingredientname} onChange={setIngredName} placeholder="재료명"/>
                </Col>
                <Col>
                  <Button className={styles.btn} variant="secondary" onClick={setSize} value={"없음"} >없음</Button>
                </Col>
                <Col>
                  <Button className={styles.btn} variant="warning" onClick={setSize} value={"적음"} >적음</Button>
                  <Button className={styles.btn} variant="primary" onClick={setSize} value={"적당함"} >적당함</Button>
                  <Button className={styles.btn} variant="success" onClick={setSize} value={"많음"} >많음</Button>
                </Col>
                <Col>
                  <p className={styles.text}>수량</p>
                  <Form.Control type="number" className={styles.count} onChange={setCount} placeholder="0"/>
                </Col>
                <Col>
                <Button className={styles.btn} variant="primary" onClick={addData}>추가</Button>
                </Col>
              </Row>


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
                        <Button className={styles.btn} onClick={() => deleteData(index)} variant="danger">삭제</Button>
                      </Col>
                    </Row>
                  </div>
                );
              })}

            </Col>
          </Row>
        </div>
        </Container>
    </>
  );
}

export default Inven;