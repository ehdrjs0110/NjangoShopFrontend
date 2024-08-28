import { useEffect, useState } from "react";
import { axiosInstance } from "../../../middleware/customAxios";
import styles from "../../../styles/Management/ManagementSearch.module.scss";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CustomPagination from "../../Pagination/CustomPagination";

const UserListTable = () => {
    const [pageCount, setPageCount] = useState(0);
    const [userDataPageAble, setUserDataPageAble] = useState();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axiosInstance.get(`management/user/getUserListbyIndex/${pageCount}`)
            .then(response => {
                setUserDataPageAble(response.data);
                initTable(response.data.content);
            });
    }, [pageCount]);

    const handleEditUser = (userId) => {
        // 유저 수정 로직 추가
        console.log(`Edit user with ID: ${userId}`);
        // 예: 수정 모달을 열거나, 해당 유저 정보를 편집하는 페이지로 이동
    };

    const handleDeleteUser = (userId) => {
        // 유저 삭제 로직 추가
        console.log(`Delete user with ID: ${userId}`);
        // 예: API 호출로 유저 삭제 후, 테이블 갱신
    };

    const initTable = (data) => {
        const tableItems = data.map((user, index) => {
            const rowClass = user.role === 'ADMIN' ? 'table-danger' : '';

            return (
                <tr key={index} class={rowClass}>
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
        });

        setUserList(tableItems);
    };

    return (
        <>
            <Table striped bordered hover className={styles.userTable}>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Nickname</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                        <th>Kakao Linked</th>
                        <th>Creation Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList}
                </tbody>
            </Table>
            <CustomPagination
                data={userDataPageAble}
                size={"sm"}
                current={pageCount + 1}
                onPageChange={(cur) => setPageCount(cur - 1)}
            />
        </>
    );
};

export default UserListTable;
