import Nav from 'react-bootstrap/Nav';
import managementCss from '../../styles/Management/ManagementNav.module.scss'
import {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {NavItem, Offcanvas} from "react-bootstrap";
const ManagementNav = () => {
    const [show, setShow] = useState(false);

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

            <Offcanvas show={show} onHide={handleClose} className={managementCss.offcanvas}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link href="/management/dashboard">Dashboard</Nav.Link>
                        {/* 추가 링크를 여기에 추가하세요 */}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
            <Nav className={`${managementCss.managementNav} flex-column`} >
                {/*새로고침 방지 navgationd*/}
                <Nav.Link className={managementCss.bigNavItem} href="/management/dashboard">dashboard</Nav.Link>
                <NavItem className={managementCss.barIcon}>
                    <FontAwesomeIcon onClick={handleShow} icon={faBars} />
                </NavItem>


                {/*<Nav.Link eventKey="link-1">Link</Nav.Link>*/}
                {/*<Nav.Link eventKey="link-2">Link</Nav.Link>*/}
                {/*<Nav.Link eventKey="link-2">Link</Nav.Link>*/}
                {/*<Nav.Link eventKey="disabled" disabled>*/}
                {/*    Disabled*/}
                {/*</Nav.Link>*/}
            </Nav>

        </div>
         );

}



export default ManagementNav;