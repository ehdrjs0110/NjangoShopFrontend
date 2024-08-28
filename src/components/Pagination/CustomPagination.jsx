import { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (props.data) initPage(props.data, props.current);
    }, [props.data, props.current]);

    const initPage = (data, current) => {
        const { totalPages, last, first, empty } = data;
        let paginationItems = [];

        if (empty) return;

        paginationItems.push(<Pagination.First key="first" onClick={() => props.onPageChange(1)} />);
        if (!first) {
            paginationItems.push(<Pagination.Prev key="prev" onClick={() => props.onPageChange(current - 1)} />);
        }

        if (current > 3) {
            paginationItems.push(<Pagination.Item key={1} onClick={() => props.onPageChange(1)}>{1}</Pagination.Item>);
            if (current > 4) {
                paginationItems.push(<Pagination.Ellipsis key="ellipsis-prev" />);
            }
        }

        for (let i = Math.max(1, current - 2); i <= Math.min(totalPages, current + 2); i++) {
            paginationItems.push(
                <Pagination.Item
                    key={i}
                    active={i === current}
                    onClick={() => props.onPageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        if (current < totalPages - 2) {
            if (current < totalPages - 3) {
                paginationItems.push(<Pagination.Ellipsis key="ellipsis-next" />);
            }
            paginationItems.push(
                <Pagination.Item
                    key={totalPages}
                    onClick={() => props.onPageChange(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        if (!last) {
            paginationItems.push(<Pagination.Next key="next" onClick={() => props.onPageChange(current + 1)} />);
        }
        paginationItems.push(<Pagination.Last key="last" onClick={() => props.onPageChange(totalPages)} />);

        setItems(paginationItems);
    };

    return (
        <Pagination size={props.size}>
            {items}
        </Pagination>
    );
}

export default CustomPagination