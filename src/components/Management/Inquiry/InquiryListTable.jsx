import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";

const InquiryListTable = () => {

    const handleAction = (inquiryID) => {
        console.log(`Edit inquiry with ID: ${inquiryID}`);
    };

    const columns = [
        { header: 'inquiry_id' },
        { header: 'question_id' },
        { header: 'answer_id' },
        { header: 'question_type' },
        { header: 'question' },
        { header: 'answer' },
        { header: 'create_at' },
        { header: 'actions' }
    ];

    const renderInquiryRow = (inquiry, index) => {
        // const rowClass = inquiry.role === 'ADMIN' ? 'table-danger' : '';
        const rowClass = "";

        return (
            <tr key={index} className={rowClass}>
                <td>{inquiry.inquiry_id}</td>
                <td>{inquiry.question_id}</td>
                <td>{inquiry.answer_id}</td>
                <td>{inquiry.question_type}</td>
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
