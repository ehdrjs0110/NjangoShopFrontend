import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from '../../styles/Sign/FindPw.module.scss';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/esm/FormGroup';

import logoImg from '../../assets/Logo/logo.png';

const FindPw = () => {

    //modal 창 띄우기
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    //이메일 인증 박스 보이기
    const [isHidden, setHidden] = useState(false);

    //이메일 수정 불가
    const [isRead, setRead] = useState(false);

  const navigate = useNavigate();

  const emailCheck = () => {
    setRead(true);
    setHidden(true);
  };

  const codeCheck = () => {
    setModalOpen(true);
  };

  const emailsign = () => {
    navigate('/SignUp');
  };

  const signin = () => {
    navigate('/SignIn');
  };

  return (
    <Container fluid className={styles.container}>
      <div className={styles.findpw}>
        <img src={logoImg} alt='' className={styles.logoimg} />
        <div className={styles.formbox}>
          <Form>
            <Form.Group className={styles.group}>
              <Form.Control type="text" id='email' readOnly={isRead} placeholder="이메일" />
            </Form.Group>
            <span style={{ display: isHidden ? "none" : "block"}}>
              <Button type='button' className={styles.btn} onClick={emailCheck} variant="primary">확인</Button>
            </span>
          </Form>
          <div className={styles.show_code} style={{ display: isHidden ? "block" : "none"}}>
            <Form.Control type="text" id='code' placeholder="인증 코드" />
            <Button className={styles.btn} size='md' onClick={codeCheck} variant="primary">확인</Button>
          </div>
        </div>

        {
          modalOpen &&
          <div className={styles.modal_container} ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}>
            <div className={styles.modal_content}>
              <Form>
                <Form.Label>새로운 비밀번호를 입력해주세요.</Form.Label>
                <Form.Group className={styles.group}>
                  <Form.Control type="text" id='password' placeholder="새 비밀번호" />
                </Form.Group>
                <Form.Group className={styles.group}>
                  <Form.Control type="text" id='re_password' placeholder="비밀번호 재입력" />
                </Form.Group>
                <Button type='button' className={styles.modal_btn} variant="primary">확인</Button>
              </Form>
            </div>
          </div>
        }

      </div>
    

    </Container>
  );
}

export default  FindPw;