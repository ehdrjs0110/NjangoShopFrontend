import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import '../../styles/Bootstrap/Bootstrap.scss';
import styles from '../../styles/Promotion/Promotion.module.scss';

const Promotion = () => {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);

  const containerRef = useRef(null);
  const isThrottled = useRef(false); // useRef로 변경


  useEffect(() => {
    const container = containerRef.current;
  
    const scrollToIndex = (index) => {
      container.scrollTo({
        top: container.children[index].offsetTop,
        behavior: 'smooth',
      });
      console.log(currentSlide);
    };
  
    const onScroll = (event) => {
      if (isThrottled.current) return; // useRef의 current 사용
      isThrottled.current = true;
      setTimeout(() => (isThrottled.current = false), 800);
  
      const direction = event.deltaY > 0 ? 1 : -1;
      const currentIndex = Math.max(0, Math.min(currentSlide + direction, container.children.length - 1));
      setCurrentSlide(currentIndex);
      scrollToIndex(currentIndex);
    };
  
    const onKeyup = (event) => {
      if (isThrottled.current) return; // useRef의 current 사용
      isThrottled.current = true;
      setTimeout(() => (isThrottled.current = false), 800);
      
      let currentIndex = currentSlide;
      if (event.key === 'ArrowDown') {
        currentIndex = Math.min(currentSlide + 1, container.children.length - 1);
      } else if (event.key === 'ArrowUp') {
        currentIndex = Math.max(currentSlide - 1, 0);
      }
      setCurrentSlide(currentIndex);
      scrollToIndex(currentIndex);
    };

    scrollToIndex(currentSlide);
  
    container.addEventListener('wheel', onScroll);
    window.addEventListener('keyup', onKeyup);
  
    return () => {
      container.removeEventListener('wheel', onScroll);
      window.removeEventListener('keyup', onKeyup);
    };
  }, [currentSlide]);

  const clickDot = (index) => {
    setCurrentSlide(index);
  };

  const signin = () => {
    navigate('/SignIn');
  };

  return (    
    <Container fluid className={styles.container}>
    <Row className={styles.flexcontainer}>
      <Col className={styles.maincol} >
        <div className={styles.maincontent}>
          <div className={styles.slide_dots}>
            {[0, 1, 2, 3].map(index => (
                  <div
                    key={index}
                    className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
                    onClick={() => clickDot(index)}
                  ></div>
            ))}
          </div>
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