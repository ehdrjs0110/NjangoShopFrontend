import { useEffect, useState } from "react";
import { axiosInstance } from "../../middleware/customAxios";
import styles from "../../styles/Management/ManagementSearch.module.scss";
import Table from "react-bootstrap/Table";
import CustomPagination from "../Pagination/CustomPagination";

const TableWithPagination = ({ apiEndpoint, columns, renderRow, pageSize = 5, reloadTrigger  }) => {
    const [pageCount, setPageCount] = useState(0);
    const [data, setData] = useState(null);

    useEffect(() => {
        axiosInstance.get(`${apiEndpoint}/${pageCount}/${pageSize}`)
            .then(response => {
                setData(response.data);
                console.log(apiEndpoint)
                console.log(response.data);
            });
    }, [pageCount, apiEndpoint, pageSize, reloadTrigger ]);

    return (
        <>
            <Table striped bordered hover className={styles.userTable}>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                        <th>Actions</th>
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
