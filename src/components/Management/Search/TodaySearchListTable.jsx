import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";

const TodaySearchListTable = () => {

    const handleReport = (todaySearchId) => {
        console.log(`Edit reprot with ID: ${todaySearchId}`);
    };

    const columns = [
        { header: 'daySearchId' },
        { header: 'Nickname ' },
        { header: 'User ID ' },
        { header: 'count' },
    ];

    const renderTodaySearchRow = (todaySearch, index) => {
        // const rowClass = todaySearch.role === 'ADMIN' ? 'table-danger' : '';
        return (
            <tr key={index}>
                <td>{todaySearch.daySearchId}</td>
                <td>{todaySearch.userId }</td>
                <td>{todaySearch.nickName }</td>
                <td>{todaySearch.count}</td>
                <td>
                    <Button variant="warning" size="sm" onClick={() => handleReport(todaySearch.id)}>
                        handle
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <TableWithPagination
            apiEndpoint="management/search/getTodaySearchListbyIndex"
            columns={columns}
            renderRow={renderTodaySearchRow}
            pageSize={5}
        />
    );
};

export default TodaySearchListTable;
