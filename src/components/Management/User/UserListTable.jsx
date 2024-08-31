import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";
import { axiosInstance } from "../../../middleware/customAxios";

const UserListTable = () => {
    const [reloadTrigger, setReloadTrigger] = useState(false); // 데이터를 다시 로드하기 위한 트리거 상태

    const handleEditUser = (userId) => {
        console.log(`Edit user with ID: ${userId}`);
    };

    const handleDelete = (userId) => {
        console.log(`Delete user with ID: ${userId}`);
        axiosInstance.delete(`management/user/deleteUserByUserId/${userId}`)
            .then(response => {
                console.log(response.data);
                setReloadTrigger(!reloadTrigger);
            })
            .catch(error => {
                console.error("There was an error deleting the user!", error);
            });
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
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <TableWithPagination
            apiEndpoint="management/user/getUserListbyIndex"
            columns={columns}
            renderRow={renderUserRow}
            pageSize={5}
            reloadTrigger={reloadTrigger} // 트리거 상태 전달
        />
    );
};

export default UserListTable;
