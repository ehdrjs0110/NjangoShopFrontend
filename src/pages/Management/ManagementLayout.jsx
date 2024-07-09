import React from 'react';
import ManagementNav from "./ManagementNav";
import style from "../../styles/Management/ManagementLayout.module.scss"
import Container from "react-bootstrap/Container";


const ManagementLayout = ({ children }) => {
    return (
        <div className={style.managementLayout}>
            <ManagementNav />
            <div className={style.managementContent}>
                {children}
            </div>
        </div>
    );
};

export default ManagementLayout;