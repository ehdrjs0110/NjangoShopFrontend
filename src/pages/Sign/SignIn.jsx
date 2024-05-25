import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from '../../styles/Sign/SignIn.module.scss';

import Container from 'react-bootstrap/Container';

import logoImg from '../../assets/Logo/logo.png';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const id = form.elements.id.value;
    const password = form.elements.password.value;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("password", password);

    formData.forEach((value, key) => {
      console.log("key : " + key + " value : " + value);
    });

  
    //axios 파일 전송
    // axios
    //   .post("localhost:8080/Login", formData, {
    //     headers: {
    //       "Content-type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     if(res.data==true){
    //       alert("로그인 성공 하셨습니다!");
    //       //페이지 이동
    //       navigate('/Main');
    //     }else{
    //       alert("로그인 실패 하셨습니다!" + "\n" + "아이디와 비밀번호를 확인해주세요!");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("err message : " + err);
    //     alert("로그인 실패 하셨습니다!" + "\n" + "아이디와 비밀번호를 확인해주세요!");
    //   });
  };

  const findid = () => {
    navigate('/FindId');
  };

  const findpw = () => {
    navigate('/FindPw');
  };

  const signup = () => {
    navigate('/Sign');
  };

  return (
    <Container fluid className={styles.container}>
      <div className={styles.login}>
        <img src={logoImg} alt='' className={styles.logoimg} />
        <form onSubmit={handleSubmit} >
          <div className='inputdiv'>
            <input type="text" className={styles.inputbox} id='id' placeholder='이메일'/>
          </div>
          <div className='inputdiv'>
            <input type="password" className={styles.inputbox} id='password' placeholder='비밀번호'/>
          </div>
          <div className='btnbox'>
            <input type="submit" className={styles.submitbtn} value={"로그인"} />
          </div>
        </form>
        <div className={styles.account}>
          <a onClick={findid}>아이디 찾기</a>
          <span> | </span>
          <a onClick={findpw}>비밀번호 찾기</a>
          <span> | </span>
          <a onClick={signup}>회원가입</a>
        </div>
        <div className={styles.snslogin}>
          <input type="button" className={styles.kakaobtn} onclick="" />
        </div>
      </div>
    

    </Container>
  );
}

export default  SignIn;