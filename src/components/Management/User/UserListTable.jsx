import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";

const UserListTable = () => {

    const handleEditUser = (userId) => {
        console.log(`Edit user with ID: ${userId}`);
    };

    const handleDeleteUser = (userId) => {
        console.log(`Delete user with ID: ${userId}`);
    };

    const columns = [
        { header: 'Email' },
        { header: 'Nickname' },
        { header: 'Phone Number' },
        { header: 'Role' },
        { header: 'Kakao Linked' },
        { header: 'Creation Date' },
        { header: 'Status' }
    ];

    const renderUserRow = (user, index) => {
        const rowClass = user.role === 'ADMIN' ? 'table-danger' : '';
        return (
            <tr key={index} className={rowClass}>
                <td>{user.username}</td>
                <td>{user.nickName}</td>
                <td>{user.phoneNumber || "N/A"}</td>
                <td>{user.role}</td>
                <td>{user.kakao ? "Yes" : "No"}</td>
                <td>{new Date(user.createAt).toLocaleString()}</td>
                <td>{user.enabled ? "Active" : "Inactive"}</td>
                <td>
                    <Button variant="warning" size="sm" onClick={() => handleEditUser(user.id)}>
                        수정
                    </Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
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
        />
    );
};

export default UserListTable;
