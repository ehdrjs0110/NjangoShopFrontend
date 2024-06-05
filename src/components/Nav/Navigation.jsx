import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import styles from '../../styles/Components/Nav/Navigation.module.scss';
import logo from '../../assets/Logo/logo.png';

const id = "tester";

function Navigation() {
  return (
    <>

      <Navbar bg="light" data-bs-theme="light" >
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} className={styles.logo} alt='' />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#inven">냉장고 관리</Nav.Link>
            <Nav.Link href="#search">레시피 검색</Nav.Link>
            <Nav.Link href="#community">커뮤니티</Nav.Link>
            <Nav.Link href="#mypage">내 정보</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="primary">장보기</Button>
            <NavDropdown title={id} id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">내 정보</NavDropdown.Item>
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