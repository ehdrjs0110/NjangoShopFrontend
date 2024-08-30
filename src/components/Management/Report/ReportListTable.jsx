import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";

const UserListTable = () => {

    const handleReport = (reportId) => {
        console.log(`Edit reprot with ID: ${reportId}`);
    };

    const columns = [
        { header: 'report_id' },
        { header: 'post_id' },
        { header: 'create_at' },
        { header: 'user_id' },
        { header: 'report_type' },
        { header: 'report_content' },
        { header: 'complete' }
    ];

    const renderReportRow = (report, index) => {
        const rowClass = report.role === 'ADMIN' ? 'table-danger' : '';
        return (
            <tr key={index} className={rowClass}>
                <td>{report.report_id}</td>
                <td>{report.post_id}</td>
                <td>{new Date(report.create_at).toLocaleString()}</td>
                <td>{report.user_id}</td>
                <td>{report.report_type}</td>
                <td>{report.report_content}</td>
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
        <></>
        // <TableWithPagination
        //     apiEndpoint="management/report/getUserListbyIndex"
        //     columns={columns}
        //     renderRow={renderUserRow}
        //     pageSize={5}
        // />
    );
};

export default UserListTable;
