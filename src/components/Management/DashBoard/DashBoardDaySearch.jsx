import {ListGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {axiosInstance} from "../../../middleware/customAxios";
import styles from "../../../styles/Management/ManagementSearch.module.scss"

const DaySearch = () => {
    const [todaySearchList, setTodaySearchList] = useState([]);



    useEffect(() => {
        axiosInstance.get("management/search/count")
            .then(response => {
                // console.log( r.data)
                // console.error(r.data[0])
                // console.error(r.data[0][0])

                let data = response.data;
                console.log('Data:', data); // 데이터 확인

                setTodaySearchList(data[0]);
        });
    }, []);

    // let index = [1,2,3]
    return(
        <>
            <ListGroup horizontal className={styles.listGroupHorizontal}>
                <ListGroup.Item className={styles.tableHeader}>순위</ListGroup.Item>
                <ListGroup.Item className={`${styles.tableHeader} ${styles.userIdItem}`}>User Id</ListGroup.Item>
                <ListGroup.Item className={styles.tableHeader}>Count</ListGroup.Item>
            </ListGroup>
            {todaySearchList.map((item, index) =>
                <ListGroup horizontal key={index} className={styles.listGroupHorizontal}>
                    <ListGroup.Item className={styles.item}>{index + 1}</ListGroup.Item>
                    <ListGroup.Item className={`${styles.item} ${styles.userIdItem}`}>{item[2]}</ListGroup.Item>
                    <ListGroup.Item className={styles.item}>{item[1]}</ListGroup.Item>
                </ListGroup>)
            }
        </>
    )
}

export default DaySearch