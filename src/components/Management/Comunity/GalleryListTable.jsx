import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";
import { axiosInstance } from "../../../middleware/customAxios";

const GalleryListTable = () => {
    const [reloadTrigger, setReloadTrigger] = useState(false); // 데이터를 다시 로드하기 위한 트리거 상태

    const handleDelete = (galleryId) => {
        console.log(`Delete gallery with ID: ${galleryId}`);
        axiosInstance.delete(`management/gallery/deleteGalleryByGalleryId/${galleryId}`)
            .then(response => {
                console.log(response.data);
                setReloadTrigger(!reloadTrigger); // 삭제 후 reloadTrigger를 변경하여 데이터를 다시 로드
            })
            .catch(error => {
                console.error("There was an error deleting the report!", error);
            });
    };

    const columns = [
        { header: 'galleryId' },
        { header: 'recipeShareId' },
        { header: 'userId' },
        { header: 'photoId' },
        { header: 'likeCount' },
        { header: 'update' },
        { header: 'createAt' },
        { header: 'actions' },
    ];

    const renderGalleryRow = (gallery, index) => {
        // const rowClass = gallery.role === 'ADMIN' ? 'table-danger' : '';
        const rowClass = "";

        return (
            <tr key={index} className={rowClass}>
                <td>{gallery.galleryId}</td>
                <td>{gallery.recipeShareId}</td>
                <td>{gallery.recipeId}</td>
                <td>{gallery.userId}</td>
                <td>{gallery.likeCount}</td>
                <td>{new Date(gallery.update).toLocaleString()}</td>
                <td>{new Date(gallery.createAt).toLocaleString()}</td>
                <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(gallery.galleryId)}>
                        delete
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <TableWithPagination
            apiEndpoint="management/gallery/getGalleryListByIndex"
            columns={columns}
            renderRow={renderGalleryRow}
            pageSize={5}
            reloadTrigger={reloadTrigger} // 트리거 상태 전달
        />
    );
};

export default GalleryListTable;
