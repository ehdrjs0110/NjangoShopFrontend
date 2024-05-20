import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import styles from '../../styles/Promotion/Promotion.module.scss';

const Promotion = () => {
  const navigate = useNavigate();

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let currentIndex = 0;
    let isThrottled = false;
  
    const scrollToIndex = (index) => {
      container.scrollTo({
        top: container.children[index].offsetTop,
        behavior: 'smooth',
      });
      console.log(currentIndex);
    };
  
    const onScroll = (event) => {
      if (isThrottled) return;                                  
      isThrottled = true;
      setTimeout(() => (isThrottled = false), 800);
  
      const direction = event.deltaY > 0 ? 1 : -1;
      currentIndex = Math.max(0, Math.min(currentIndex + direction, container.children.length - 1));
      scrollToIndex(currentIndex);
    };
  
    const onKeydown = (event) => {
      if (isThrottled) return;
      isThrottled = true;
      setTimeout(() => (isThrottled = false), 800);
      
      if (event.key === 'ArrowDown') {
        currentIndex = Math.min(currentIndex + 1, container.children.length - 1);
        scrollToIndex(currentIndex);
      } else if (event.key === 'ArrowUp') {
        currentIndex = Math.max(currentIndex - 1, 0);
        scrollToIndex(currentIndex);
      }
    };

    
  
    container.addEventListener('wheel', onScroll);
    window.addEventListener('keydown', onKeydown);
  
    return () => {
      container.removeEventListener('wheel', onScroll);
      window.removeEventListener('keydown', onKeydown);
    };
  }, []);
  

  const signin = () => {
    navigate('/SignIn');
  };

  return (    
    <Container fluid className={styles.container}>
    <Row className={styles.flexcontainer}>
      <Col className={styles.maincol} >
        <div className={styles.maincontent}>
          <div ref={containerRef} class={styles.slide_container}>
            <div class={styles.slide}>slide1</div>
            <div class={styles.slide}>slide2</div>
            <div class={styles.slide}>slide3</div>
            <div class={styles.slide}>slide4</div>
          </div>
        </div>
      </Col>
      <Col className={styles.sidecol}>
        <div className={styles.sidecontent}>
          <div>
            <h2 className={styles.start}>Let's Start</h2>
          </div>
          <div>
            <Button variant="primary" size="lg" className={styles.startbtn} onClick={signin}>Sign</Button>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
  );
}

export default  Promotion;