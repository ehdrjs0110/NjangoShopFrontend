import Nav from 'react-bootstrap/Nav';
import managementCss from '../../styles/Management/ManagementNav.module.scss'
import React, {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {NavItem, Offcanvas} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
const ManagementNav = () => {
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const Dashboard = () => {
        navigate('/Management/Dashboard');
    };
    const User = () => {
        navigate('/Management/User');
    };


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>

            <Nav className={`${managementCss.managementNav} flex-column`} >
                {/*새로고침 방지 navgationd*/}
                <button onClick={() => navigate('/Management/Dashboard')} className={managementCss.navButton}>
                    Dashboard
                </button>
                <button onClick={() => navigate('/Management/User')} className={managementCss.navButton}>
                    유저관리
                </button>
            </Nav>

        </div>
         );

}



export default ManagementNav;