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

    //입력받은 이메일 
    const [isEmail, setEmail] = useState();

    //입력받은 인증 코드
    const [isCode, setCode] = useState();

    //modal 창 띄우기
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    //이메일 인증 박스 보이기
    const [isHidden, setHidden] = useState(false);

    //이메일 수정 불가
    const [isRead, setRead] = useState(false);

    //비밀번호 일치 체크
    const [isPassword, setPassword] = useState({
      password: "",
      re_password: "",
    });

  const navigate = useNavigate();

  //이메일 입력
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  //코드 입력
  const handleCode = (e) => {
    setCode(e.target.value);
  };

  //이메일 디비 확인 및 전송
  const emailCheck = () => {
    setRead(true);
    setHidden(true);

    console.log(isEmail);
    const data = {
      email : isEmail
    };
  
    //axios 파일 전송
    axios
      .post("http://localhost:8080/mail/send", data)
      .then((res) => {
        alert("메일 보내기 성공");
        console.log('메일 전송 성공:', res.data); // 성공 시 응답 출력
      })
      .catch((err) => {
        console.log("err message : " + err);
        alert("메일 보내기 실패");
        setRead(false);
      });
  };

  const codeCheck = () => {

    const data = {
      email : isEmail,
      code : isCode
    };
  
    //axios 파일 전송
    axios
      .post("http://localhost:8080/verify/code", data)
      .then((res) => {
          if(res.data === true){
            alert("코드 확인!");
            setHidden(false);
            setModalOpen(true);
            console.log('코드 검증 결과:', res.data); // 검증 결과 출력
          }else{
            alert("코드를 다시 입력해주세요.");
          }
          
      })
      .catch((err) => {
        alert("인증 실패");
        setRead(false);
        console.error('코드 검증 실패:', err); // 실패 시 에러 출력
      });  

  };

  const passwordCheck = (e) => {
    setPassword({
      ...isPassword,
      [e.target.name] : e.target.value,
    });
  };

  const changePassword = () => {
    if(isPassword.password != isPassword.re_password){
      console.table(isPassword);
      alert("입력하신 비밀번호가 다릅니다.");
    }else{
      alert("비밀번호가 변경 되었습니다.");
    }
  }

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
              <Form.Control type="text" id='email' onChange={handleEmail} readOnly={isRead} placeholder="이메일" />
            </Form.Group>
            <span style={{ display: isHidden ? "none" : "block"}}>
              <Button type='button' className={styles.btn} onClick={emailCheck} variant="primary">확인</Button>
            </span>
          </Form>
          <div className={styles.show_code} style={{ display: isHidden ? "block" : "none"}}>
            <Form.Control type="text" id='code' onChange={handleCode} placeholder="인증 코드" />
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
                  <Form.Control type="text" id='password' name='password' onChange={(e) => {passwordCheck(e)}} placeholder="새 비밀번호" />
                </Form.Group>
                <Form.Group className={styles.group}>
                  <Form.Control type="text" id='re_password' name='re_password' onChange={(e) => {passwordCheck(e)}} placeholder="비밀번호 재입력" />
                </Form.Group>
                <Button type='button' className={styles.modal_btn} onClick={changePassword} variant="primary">확인</Button>
              </Form>
            </div>
          </div>
        }

      </div>
    

    </Container>
  );
}

export default  FindPw;