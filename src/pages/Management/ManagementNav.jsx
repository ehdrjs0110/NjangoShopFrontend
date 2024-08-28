import Nav from 'react-bootstrap/Nav';
import managementCss from '../../styles/Management/ManagementNav.module.scss'
import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavItem, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManagementNav = () => {
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const Dashboard = () => {
        navigate('/Management/Dashboard');
    };
    const User = () => {
        navigate('/Management/User');
    };
    const Inquiry = () => {
        navigate('/Management/Inquiry');
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            {/*<Navbar expand="lg" className={managementCss.managementNav}>*/}
            {/*    <Button variant="outline-primary" onClick={handleShow} className={managementCss.barIcon}>*/}
            {/*        <FontAwesomeIcon icon={faBars} />*/}
            {/*    </Button>*/}
            {/*    <Navbar.Brand href="/">Brand</Navbar.Brand>*/}
            {/*</Navbar>*/}

            <div className={managementCss.sideMenu}>
                <button onClick={Dashboard}>Dashboard</button>
                <button onClick={User}>유저관리</button>
                <button onClick={Inquiry}>문의사항</button>
                {/*<a onClick={dashboard}>바로가기</a>*/}
            </div>

            {/*<Offcanvas show={show} onHide={handleClose} className={managementCss.offcanvas}>*/}
            {/*    <Offcanvas.Header closeButton>*/}
            {/*        <Offcanvas.Title>Menu</Offcanvas.Title>*/}
            {/*    </Offcanvas.Header>*/}
            {/*    <Offcanvas.Body>*/}
            {/*        <Nav className="flex-column">*/}
            {/*            /!*<Nav.Link href="/management/dashboard">Dashboard</Nav.Link>*!/*/}


            {/*            /!* 추가 링크를 여기에 추가하세요 *!/*/}
            {/*        </Nav>*/}
            {/*    </Offcanvas.Body>*/}
            {/*</Offcanvas>*/}
            {/*<Nav className={`${managementCss.managementNav} flex-column`} >*/}
            {/*    /!*새로고침 방지 navgationd*!/*/}
            {/*    <Nav.Link className={managementCss.bigNavItem} href="/management/dashboard">dashboard</Nav.Link>*/}
            {/*    <Nav.Link className={managementCss.bigNavItem} href="/management/User">User</Nav.Link>*/}
            {/*    <NavItem className={managementCss.barIcon}>*/}
            {/*        <FontAwesomeIcon onClick={handleShow} icon={faBars} />*/}
            {/*    </NavItem>*/}


            {/*    /!*<Nav.Link eventKey="link-1">Link</Nav.Link>*!/*/}
            {/*    /!*<Nav.Link eventKey="link-2">Link</Nav.Link>*!/*/}
            {/*    /!*<Nav.Link eventKey="link-2">Link</Nav.Link>*!/*/}
            {/*    /!*<Nav.Link eventKey="disabled" disabled>*!/*/}
            {/*    /!*    Disabled*!/*/}
            {/*    /!*</Nav.Link>*!/*/}
            {/*</Nav>*/}
        </div>
    );
}

export default ManagementNav;