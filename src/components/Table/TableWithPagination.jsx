import { useEffect, useState } from "react";
import { axiosInstance } from "../../middleware/customAxios";
import styles from "../../styles/Management/ManagementSearch.module.scss";
import Table from "react-bootstrap/Table";
import CustomPagination from "../Pagination/CustomPagination";

const TableWithPagination = ({ apiEndpoint, columns, renderRow, pageSize = 5, reloadTrigger, pageCount: propsPageCount, setPageCount: propsSetPageCount }) => {
    // Props로 넘어온 pageCount와 setPageCount를 사용하고, 없으면 로컬 상태로 선언
    const [localPageCount, setLocalPageCount] = useState(0);
    const pageCount = propsPageCount ?? localPageCount;
    const setPageCount = propsSetPageCount ?? setLocalPageCount;

    const [data, setData] = useState(null);

    useEffect(() => {
        // API 호출시 pageCount가 변경될 때마다 데이터 다시 가져오기
        axiosInstance.get(`${apiEndpoint}/${pageCount}/${pageSize}`)
            .then(response => {
                setData(response.data);
            });
    }, [pageCount, apiEndpoint, pageSize, reloadTrigger]);

    return (
        <>
            <Table striped bordered hover className={styles.userTable}>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data ? data.content.map((item, index) => renderRow(item, index)) : <tr><td colSpan={columns.length + 1}>Loading...</td></tr>}
                </tbody>
            </Table>
            {data && (
                <CustomPagination
                    data={data}
                    size="sm"
                    current={pageCount + 1}
                    onPageChange={(cur) => setPageCount(cur - 1)}
                />
            )}
        </>
    );
};

export default TableWithPagination;
