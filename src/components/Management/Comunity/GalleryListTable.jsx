import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";

const GalleryListTable = () => {

    const handleAction = (galleryID) => {
        console.log(`Edit gallery with ID: ${galleryID}`);
    };

    const columns = [
        { header: 'gallery_id' },
        { header: 'recipe_share_id' },
        { header: 'user_id' },
        { header: 'photo_id' },
        { header: 'like_count' },
        { header: 'update' },
        { header: 'create_at' },
    ];

    const renderGalleryRow = (gallery, index) => {
        // const rowClass = gallery.role === 'ADMIN' ? 'table-danger' : '';
        const rowClass = "";

        return (
            <tr key={index} className={rowClass}>
                <td>{gallery.gallery_id}</td>
                <td>{gallery.recipe_share_id}</td>
                <td>{gallery.recipe_id}</td>
                <td>{gallery.user_id}</td>
                <td>{gallery.like_count}</td>
                <td>{new Date(gallery.update).toLocaleString()}</td>
                <td>{new Date(gallery.create_at).toLocaleString()}</td>
                <td>
                    <Button variant="danger" size="sm" onClick={() => handleAction(gallery.id)}>
                        handle
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <></>
        // <TableWithPagination
        //     apiEndpoint="management/user/getUserListbyIndex"
        //     columns={columns}
        //     renderRow={renderGalleryRow}
        //     pageSize={5}
        // />
    );
};

export default GalleryListTable;
