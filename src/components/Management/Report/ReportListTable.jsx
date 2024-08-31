import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";

const UserListTable = () => {

    const handleReport = (reportId) => {
        console.log(`Edit reprot with ID: ${reportId}`);
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
                    <Button variant="warning" size="sm" onClick={() => handleReport(report.id)}>
                        handle
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
        />
    );
};

export default UserListTable;
