import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from '../../styles/Sign/FindId.module.scss';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import logoImg from '../../assets/Logo/logo.png';
import FormGroup from 'react-bootstrap/esm/FormGroup';

const FindId = () => {

  //modal 창 띄우기
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  //이메일 인증 박스 보이기
  const [isHidden, setHidden] = useState(false);
  

  const navigate = useNavigate();

  const find = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.elements.name.value;
    const phone = form.elements.phone.value;
   
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);

    formData.forEach((value, key) => {
      console.log("key : " + key + " value : " + value);
    });

    setHidden(true);

  };

  const gologin = () => {
    navigate('/SignIn');
  }

  return (
    <Container fluid className={styles.container}>
      <div className={styles.findid}>
        <img src={logoImg} alt='' className={styles.logoimg} />
        <div className={styles.btnbox}>
          <Button className={styles.btn} size='lg' variant="primary" onClick={() => setModalOpen(true)}>아이디 찾기</Button>
        </div>

        {
          modalOpen &&
          <div className={styles.modal_container} ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}>
            <div className={styles.modal_content}>
              <Form onSubmit={find}>
                <Form.Group className={styles.group}>
                  <Form.Control type="text" id='name' placeholder="이름" />
                </Form.Group>
                <Form.Group className={styles.group}>
                  <Form.Control type="text" id='phone' placeholder="전화번호" />
                </Form.Group>
                <Button type='submit' className={styles.modal_btn} variant="primary">확인</Button>
              </Form>
              <hr className={styles.line} />
              <div className={styles.show_email} style={{ display: isHidden ? "block" : "none"}}>
                <p>ehd****110@naver.com</p>
                <Button className={styles.btn} size='md' variant="primary" onClick={gologin}>로그인 하기</Button>
              </div>
            </div>
          </div>
        }
      </div>
    </Container>


  );
}

export default  FindId;