import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from '../../styles/Sign/SignUp.module.scss';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import logoImg from '../../assets/Logo/logo.png';

const SignUp = () => {
  const navigate = useNavigate();

  const [isEmail, setEmail] = useState();

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
    //   .post("localhost:8080/SignUp", formData, {
    //     headers: {
    //       "Content-type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     if(res.data==true){
    //       alert("회원가입 성공 하셨습니다!");
    //       //페이지 이동
    //       navigate('/Main');
    //     }else{
    //       alert("회원가입 실패 하셨습니다!" + "\n" + "아이디와 비밀번호를 확인해주세요!");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("err message : " + err);
    //     alert("회원가입 실패 하셨습니다!" + "\n" + "아이디와 비밀번호를 확인해주세요!");
    //   });
  };

  const sendEmail = () => {

    console.log(isEmail);
    const data = {
      emailname : isEmail
    };
  
    //axios 파일 전송
    axios
      .post("http://localhost:8080/mail", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("err message : " + err);
        alert("메일 보내기 실패");
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Container fluid className={styles.container}>
      <div className={styles.signup}>
        <img src={logoImg} alt='' className={styles.logoimg} />
        <form onSubmit={handleSubmit} >
          <div className='inputbox'>  
            <input type="email" id='email' className={styles.inputbox} onChange={handleEmail} placeholder='이메일'/>
          </div>
          <div className='email'>
          <Button variant="primary" className={styles.emailbtn} onClick={sendEmail}>인증번호 전송</Button>
          </div>
          <div className='inputbox'>  
            <input type="password" id='password' className={styles.inputbox} placeholder='비밀번호'/>
          </div>
          <div className='inputbox'>  
            <input type="text" id='nickname' className={styles.inputbox} placeholder='닉네임'/>
          </div>
          <div className='inputbox'>  
            <input type="text" id='name' className={styles.inputbox} placeholder='이름'/>
          </div>
          <div className='inputbox'>  
            <input type="text" id='phone' className={styles.inputbox} placeholder='전화번호'/>
          </div>
          <div className='btnbox'>
            <input type="submit" className={styles.submitbtn} value={"회원가입"} />
          </div>
        </form>
      </div>    
    </Container>
  );
}

export default  SignUp;