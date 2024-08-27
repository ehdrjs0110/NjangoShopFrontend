import { useEffect, useState } from "react";
import { axiosInstance } from "../../../middleware/customAxios";
import styles from "../../../styles/Management/ManagementSearch.module.scss"
import Table from "react-bootstrap/Table"
import Pagination from 'react-bootstrap/Pagination';

const UserListTable = () => {
    const [pageCount, setPageCount] = useState([]);

    useEffect(() => {
        axiosInstance.get("management/user/getUserListbyIndex/0")
            .then(response => {
                console.log(response);
                console.log(response.data);
            });
        // axiosInstance.get("management/user/getAllUserList")
        //     .then(response => {
        //         console.log(response);
        //         console.log(response.data);
        //     });
    }, []);

    return (
        <>
            <Table>

            </Table>
            {/* <Pagination size="sm">{items}</Pagination> */}
        </>
    )
}

export default UserListTable