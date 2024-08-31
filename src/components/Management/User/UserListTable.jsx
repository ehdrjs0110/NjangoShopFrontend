import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";
import { axiosInstance } from "../../../middleware/customAxios";
import UserEditModal from "./UserEditModal";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import style from "../../../styles/Management/ManagementDashboard.module.scss";

const UserListTable = ({ type }) => {
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEditUser = (userId) => {
        axiosInstance.get(`management/user/getUserByUserId/${userId}`)
            .then(response => {
                setSelectedUser(response.data);
                setShowModal(true);
            })
            .catch(error => {
                console.error("There was an error getting the user!", error);
            });
    };

    const handleDelete = (userId) => {
        axiosInstance.delete(`management/user/deleteUserByUserId/${userId}`)
            .then(response => {
                setReloadTrigger(!reloadTrigger);
            })
            .catch(error => {
                console.error("There was an error deleting the user!", error);
            });
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleSave = () => {
        setReloadTrigger(!reloadTrigger);
    };

    const columns = [
        { header: 'Email' },
        { header: 'Nickname' },
        { header: 'Phone Number' },
        { header: 'Role' },
        { header: 'Kakao Linked' },
        { header: 'Creation Date' },
        { header: 'Status' },
        { header: 'actions' }
    ];

    const renderUserRow = (user, index) => {
        const rowClass = user.role === 'ADMIN' ? 'table-danger' : '';
        return (
            <tr key={index} className={rowClass}>
                <td>{user.id}</td>
                <td>{user.nickname}</td>
                <td>{user.phoneNumber || "N/A"}</td>
                <td>{user.role}</td>
                <td>{user.kakao ? "Yes" : "No"}</td>
                <td>{new Date(user.createAt).toLocaleString()}</td>
                <td>{user.enabled ? "Active" : "Inactive"}</td>
                <td>
                    <Button variant="warning" size="sm" onClick={() => handleEditUser(user.id)}>
                        수정
                    </Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                        삭제
                    </Button>{' '}
                </td>
            </tr>
        );
    };

    return (
        <Col className={style.downPartCol}>
            <Card border="light">
                <Card.Title>
                    {type === "user" ? "사용자 목록" : type === "admin" ? "관리자 목록" : "ALL"}
                </Card.Title>
                <Card.Body>
                    <TableWithPagination
                        apiEndpoint={
                            type === "user" 
                                ? "management/user/getUserListbyIndex" 
                                : type === "admin"
                                    ? "management/user/getAdminListbyIndex"
                                    : "management/user/getAllUserListbyIndex"
                        }                        
                        columns={columns}
                        renderRow={renderUserRow}
                        pageSize={5}
                        reloadTrigger={reloadTrigger}
                    />
                    {selectedUser && (
                        <UserEditModal
                            show={showModal}
                            handleClose={handleModalClose}
                            user={selectedUser}
                            onSave={handleSave}
                        />
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default UserListTable;
