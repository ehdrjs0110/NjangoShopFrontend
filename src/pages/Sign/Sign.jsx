import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Signup = () => {
  const navigate = useNavigate();

  const LoginhandleSubmit = async (e) => {
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

  const SignUphandleSubmit = async (e) => {
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


  return (
    <div className="container">

      <form onSubmit={LoginhandleSubmit} >
        <input type="text" id='id' />
        <input type="password" id='password' />
        <input type="submit" value={"로그인"} />
      </form>

      <form onSubmit={SignUphandleSubmit} >
        <input type="text" id='id' />
        <input type="password" id='password' />
        <input type="submit" value={"회원가입"} />
      </form>

    </div>
  );
}

export default  Signup;