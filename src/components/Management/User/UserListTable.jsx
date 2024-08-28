import { useEffect, useState } from "react";
import { axiosInstance } from "../../../middleware/customAxios";
import styles from "../../../styles/Management/ManagementSearch.module.scss"
import Table from "react-bootstrap/Table"
import CustomPagination from "../../Pagination/CustomPagination";

const UserListTable = () => {
    const [pageCount, setPageCount] = useState(0);
    const [userDataPageAble, setUserDataPageAble] = useState();

    useEffect(() => {
        axiosInstance.get(`management/user/getUserListbyIndex/${pageCount}`)
            .then(response => {
                console.log(response.data);

                setUserDataPageAble(response.data);
            });
    }, [pageCount]);

    return (
        <>
            <Table>

            </Table>
            <CustomPagination
                data={userDataPageAble}
                size={"sm"}
                current={pageCount + 1}
                onPageChange={(cur) => setPageCount(cur - 1)}
            />
        </>
    )
}

export default UserListTable