import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";
import { axiosInstance } from "../../../middleware/customAxios";

const RecipeShareListTable = () => {
    const [reloadTrigger, setReloadTrigger] = useState(false); // 데이터를 다시 로드하기 위한 트리거 상태

    const handleDelete = (recipeShareID) => {
        console.log(`Delete recipeShare with ID: ${recipeShareID}`);
        axiosInstance.delete(`management/recipeShare/deleteRecipeShareByRecipeShareID/${recipeShareID}`)
            .then(response => {
                console.log(response.data);
                setReloadTrigger(!reloadTrigger); // 삭제 후 reloadTrigger를 변경하여 데이터를 다시 로드
            })
            .catch(error => {
                console.error("There was an error deleting the recipeShare!", error);
            });
    };

    const columns = [
        { header: 'recipeShareId' },
        { header: 'recipeId' },
        { header: 'userId' },
        { header: 'likeCount' },
        { header: 'update' },
        { header: 'createAt' },
        { header: 'actions' },
    ];

    const renderRecipeShareRow = (recipeShare, index) => {
        // const rowClass = recipeShare.role === 'ADMIN' ? 'table-danger' : '';
        const rowClass = "";

        return (
            <tr key={index} className={rowClass}>
                <td>{recipeShare.recipeShareId}</td>
                <td>{recipeShare.recipeId}</td>
                <td>{recipeShare.userId}</td>
                <td>{recipeShare.likeCount}</td>
                <td>{new Date(recipeShare.update).toLocaleString()}</td>
                <td>{new Date(recipeShare.createAt).toLocaleString()}</td>
                <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(recipeShare.recipeShareId)}>
                        handle
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <TableWithPagination
            apiEndpoint="management/recipeShare/getRecipeShareListByIndex"
            columns={columns}
            renderRow={renderRecipeShareRow}
            pageSize={5}
        />
    );
};

export default RecipeShareListTable;
