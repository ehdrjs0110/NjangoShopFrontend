import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";
import { axiosInstance } from "../../../middleware/customAxios";

const InquiryListTable = () => {
    const [reloadTrigger, setReloadTrigger] = useState(false); // 데이터를 다시 로드하기 위한 트리거 상태

    const handleDelete = (inquiryId) => {
        console.log(`Delete inquiry with ID: ${inquiryId}`);
        axiosInstance.delete(`management/inquiry/deleteInquiryByInquiryId/${inquiryId}`)
            .then(response => {
                console.log(response.data);
                setReloadTrigger(!reloadTrigger); // 삭제 후 reloadTrigger를 변경하여 데이터를 다시 로드
            })
            .catch(error => {
                console.error("There was an error deleting the inquiry!", error);
            });
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
                    <Button variant="danger" size="sm" onClick={() => handleDelete(inquiry.inquiryId)}>
                        delete
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
            reloadTrigger={reloadTrigger} // 트리거 상태 전달
        />
    );
};

export default InquiryListTable;
