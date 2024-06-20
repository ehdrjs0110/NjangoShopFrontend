import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

import styles from '../../styles/Components/Nav/Navigation.module.scss';
import logo from '../../assets/Logo/logo.png';

import cart from '../../assets/Nav/cart.png'


// auth관련
import {useCookies} from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {containEmail} from "../../Store/userEmailSlice";
import {containNickName} from "../../Store/userNickName";



function Navigation() {
  const navigate = useNavigate();

  // auth 관련
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);
  let refreshToken  = cookies.refreshToken;
  const dispatch = useDispatch();

  let reduxEmail = useSelector(state => state.userEmail.value);
  let reduxNickname = useSelector( state => state.userNickName.value);

  let id = reduxNickname;
  // 토큰 decode

  useEffect(() => {
    getEmailAndNickname();
  },[refreshToken])

  //
  const getEmailAndNickname = ()  => {
    try {
      console.log("위치 nav에서 출력, refreshToken:  " + refreshToken);
      const decoded = jwtDecode(refreshToken);

      // useremail
      reduxEmail = decoded.sub;
      reduxNickname = decoded.nickname;

      dispatch(containEmail(reduxEmail));
      dispatch(containNickName(reduxNickname));


      console.log(decoded);
      console.log(decoded.sub); // useremail
      console.log(decoded.nickname); //
    } catch (error) {
      console.error("Invalid token specified: ", error);
    }
  }






    const goToMain = () => {
    navigate("/Main");
  }

  const goToInven = () => {
    navigate("/Inven");
  }

  const goToSearch = () => {
    navigate("/AiSearch");
  }

  const goToMy = () => {
    navigate("/MyPage");
  }

  return (
    <>

      <Navbar bg="light" data-bs-theme="light" >
        <Container>
          <Navbar.Brand onClick={goToMain}>
            <img src={logo} className={styles.logo} alt='' />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={goToInven}>냉장고 관리</Nav.Link>
            <Nav.Link onClick={goToSearch}>레시피 검색</Nav.Link>
            <Nav.Link>커뮤니티</Nav.Link>
          </Nav>
          <Nav>
            <a className={styles.shop} >
              <img src={cart} className={styles.cart} alt='' />
            </a>
            <NavDropdown title={id} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={goToMy}>내 정보</NavDropdown.Item>
              <NavDropdown.Item href="#action4">구매내역</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                로그아웃
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;