import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import {Accordion} from "react-bootstrap";
import Navigation from "../components/Nav/Navigation";
// import Navigation from '../../components/Nav/Navigation'




const Demo = () => {


    return (
        <>
            <Navigation />
            <div>
            <Container fluid style={{padding:0}} >
                    <Row style={{ backgroundColor: "lightblue", height: "50vh" ,paddingLeft:0, paddingRight:0}}>
                        <Col style={{ backgroundColor: "lightgrey", paddingLeft: 0, paddingRight: 0 }} md={{ span: 10, offset: 1 }}>
                            <h1>작업을 하자</h1>
                        </Col>
                    </Row>
            </Container>
            </div>
        </>
    );
}

export default Demo;
