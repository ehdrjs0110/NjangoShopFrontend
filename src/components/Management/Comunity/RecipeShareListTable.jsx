import Button from "react-bootstrap/Button";
import TableWithPagination from "../../Table/TableWithPagination";

const RecipeShareListTable = () => {

    const handleAction = (recipeShareID) => {
        console.log(`Edit recipeShare with ID: ${recipeShareID}`);
    };

    const columns = [
        { header: 'recipe_share_id' },
        { header: 'recipe_id' },
        { header: 'user_id' },
        { header: 'like_count' },
        { header: 'update' },
        { header: 'create_at' },
    ];

    const renderRecipeShareRow = (recipeShare, index) => {
        // const rowClass = recipeShare.role === 'ADMIN' ? 'table-danger' : '';
        const rowClass = "";

        return (
            <tr key={index} className={rowClass}>
                <td>{recipeShare.recipeShare_id}</td>
                <td>{recipeShare.recipe_id}</td>
                <td>{recipeShare.user_id}</td>
                <td>{recipeShare.like_count}</td>
                <td>{new Date(recipeShare.update).toLocaleString()}</td>
                <td>{new Date(recipeShare.create_at).toLocaleString()}</td>
                <td>
                    <Button variant="danger" size="sm" onClick={() => handleAction(recipeShare.id)}>
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
        //     renderRow={renderRecipeShareRow}
        //     pageSize={5}
        // />
    );
};

export default RecipeShareListTable;
