import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";

const InquiryListTable = () => {

    const handleAction = (inquiryID) => {
        console.log(`Edit inquiry with ID: ${inquiryID}`);
    };

    const columns = [
        { header: 'inquiryId' },
        { header: 'questionerName' },
        { header: 'responderName' },
        { header: 'questionType' },
        { header: 'question' },
        { header: 'answer' },
        { header: 'createAt' },
        { header: 'actions' }
    ];

    const renderInquiryRow = (inquiry, index) => {
        // const rowClass = inquiry.role === 'ADMIN' ? 'table-danger' : '';
        const rowClass = "";

        return (
            <tr key={index} className={rowClass}>
                <td>{inquiry.inquiryId}</td>
                <td>{inquiry.questionerName}</td>
                <td>{inquiry.responderName}</td>
                <td>{inquiry.questionType}</td>
                <td>{inquiry.question}</td>
                <td>{inquiry.answer}</td>
                <td>{new Date(inquiry.createAt).toLocaleString()}</td>
                <td>
                    <Button variant="danger" size="sm" onClick={() => handleAction(inquiry.id)}>
                        handle
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <TableWithPagination
            apiEndpoint="management/inquiry/getInquiryListbyIndex"
            columns={columns}
            renderRow={renderInquiryRow}
            pageSize={5}
        />
    );
};

export default InquiryListTable;
