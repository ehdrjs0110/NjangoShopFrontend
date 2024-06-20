import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Card from 'react-bootstrap/Card';
import Navigation from '../../components/Nav/Navigation'
import imgPath from '../../assets/MyPageImg/img.png';
import myPageStyle from '../../styles/MyPage/MyPage.module.scss'




const MyPage = () => {
    const navigate = useNavigate();

    const goHistory = () => {
        navigate('/HistoryList');
    };

    const goLike = () => {
        navigate('/LikeList');
    };

    return (
        <>
            <Navigation />
            <div>
                <Container fluid  className={myPageStyle.MyPageContainer} >
                    <Row className={myPageStyle.ContainerRow} >
                        <Col md={{ span:  10, offset: 1 }} className={myPageStyle.ContainerCol}>
                            <Col md={{ span:  6, offset: 3 }} className={myPageStyle.MyPageCardContainCol}>
                                <Card className={`text-center ${myPageStyle.MyPageCard}`} >
                                    <Card.Body className={myPageStyle.MyPageCardBody}>
                                        <img src={imgPath}/>
                                        <Card.Text >
                                            <Row xs={2} lg={2}>
                                                <Col><p> 아이디 </p></Col>
                                                <Col><p>eunhee000</p></Col>
                                            </Row>
                                            <Row xs={2} lg={2}>
                                                <Col><p>닉네임</p></Col>
                                                <Col><p>은희123</p></Col>
                                            </Row>
                                            <Row xs={2} lg={2}>
                                                <Col><p>이름</p></Col>
                                                <Col><p>최은희</p></Col>
                                            </Row>
                                            <Row xs={2} lg={2}>
                                                <Col><p>이메일</p></Col>
                                                <Col><p>123dfeww@naver.com</p></Col>
                                            </Row>
                                            <Row xs={2} lg={2}>
                                                <Col><p>전화번호</p></Col>
                                                <Col><p>0101-1234-5678</p></Col>
                                            </Row>
                                        </Card.Text>
                                        <Button variant="outline-secondary">정보수정</Button>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                        <Button variant="outline-secondary">필터 설정</Button>{' '}
                                        <Button variant="outline-secondary" onClick={goHistory}>레시피 기록</Button>{' '}
                                        <Button variant="outline-secondary" onClick={goLike}>Like🖤</Button>{' '}
                                    </Card.Footer>
                                </Card>

                            </Col>

                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default MyPage;
