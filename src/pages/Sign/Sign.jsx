import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from '../../styles/Sign/Sign.module.scss';

import Container from 'react-bootstrap/Container';

import logoImg from '../../assets/Logo/logo.png';

const Sign = () => {
  const navigate = useNavigate();

  const emailsign = () => {
    navigate('/SignUp');
  };

  const signin = () => {
    navigate('/SignIn');
  };
//?
  return (
    <Container fluid className={styles.container}>
      <div className={styles.sign}>
        <img src={logoImg} alt='' className={styles.logoimg} />
        <form>
          <div className={styles.btnbox}>
            <input type="button" className={styles.kakaobtn} value={"카카오 계정으로 가입하기"} />
          </div>
          <div className={styles.btnbox}>
            <input type="button" className={styles.emailbtn} onClick={emailsign} value={"이메일 계정으로 가입하기"} />
          </div>
        </form>
        <div className={styles.account}>
          <a>아이디 찾기</a>
          <span> | </span>
          <a>비밀번호 찾기</a>
          <span> | </span>
          <a onClick={signin}>로그인</a>
        </div>
      </div>
    

    </Container>
  );
}

export default  Sign;