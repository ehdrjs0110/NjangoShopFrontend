import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";

const WordSearchListTable = () => {

    const handleReport = (searchId) => {
        console.log(`Edit reprot with ID: ${searchId}`);
    };

    const columns = [
        { header: 'Search Id' },
        { header: 'User Id ' },
        { header: 'Nickname ' },
        { header: 'Search Word' },
        { header: 'Create At' },
    ];

    const renderWordSearchRow = (wordSearch, index) => {
        return (
            <tr key={index}>
                <td>{wordSearch.searchId}</td>
                <td>{wordSearch.userId }</td>
                <td>{wordSearch.nickName }</td>
                <td>{wordSearch.searchWord}</td>
                <td>{new Date(wordSearch.createAt).toLocaleString()}</td>


                <td>
                    <Button variant="warning" size="sm" onClick={() => handleReport(wordSearch.searchId)}>
                        handle
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <TableWithPagination
            apiEndpoint="management/search/getWordSearchListbyIndex"
            columns={columns}
            renderRow={renderWordSearchRow}
            pageSize={5}
        />
    );
};

export default WordSearchListTable;
