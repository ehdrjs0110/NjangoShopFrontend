import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";
import { axiosInstance } from "../../../middleware/customAxios";

const UserListTable = () => {
    const [reloadTrigger, setReloadTrigger] = useState(false); // 데이터를 다시 로드하기 위한 트리거 상태

    const handleDelete = (reportId) => {
        console.log(`Delete reprot with ID: ${reportId}`);
        axiosInstance.delete(`management/report/deleteReportByReportId/${reportId}`)
            .then(response => {
                console.log(response.data);
                setReloadTrigger(!reloadTrigger); // 삭제 후 reloadTrigger를 변경하여 데이터를 다시 로드
            })
            .catch(error => {
                console.error("There was an error deleting the report!", error);
            });
    };

    const columns = [
        { header: 'reportId' },
        { header: 'galleryReportId ' },
        { header: 'recipeShareReportId ' },
        { header: 'createAt' },
        { header: 'userId' },
        { header: 'reportType' },
        { header: 'reportContent' },
        { header: 'complete' }
    ];

    const renderReportRow = (report, index) => {
        const rowClass = report.role === 'ADMIN' ? 'table-danger' : '';
        return (
            <tr key={index} className={rowClass}>
                <td>{report.reportId}</td>
                <td>{report.galleryReportId }</td>
                <td>{report.recipeShareReportId }</td>
                <td>{new Date(report.createAt).toLocaleString()}</td>
                <td>{report.userId}</td>
                <td>{report.reportType}</td>
                <td>{report.reportContent}</td>
                <td>{report.complete ? "Yes" : "No"}</td>
                <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(report.reportId)}>
                        delete
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <TableWithPagination
            apiEndpoint="management/report/getReportListbyIndex"
            columns={columns}
            renderRow={renderReportRow}
            pageSize={5}
            reloadTrigger={reloadTrigger} // 트리거 상태 전달
        />
    );
};

export default UserListTable;
