import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SelectEditor from '../../components/Inven/SelectEditor';

import Navigation from '../../components/Nav/Navigation'

import styles from '../../styles/Inven/Excel.module.scss'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Excel() {
    
    const navigate = useNavigate();

    const items = Array(10).fill(0);


    //columns 변수에는 테이블의 제목에 들어갈 내용을 배열에 객체 요소로 담는다.
    const columns = [
        { field: "id", headerName: "ID", width: 100},
        { field: "ingredientName", headerName: "재료명", width: 150, editable: true },
        { 
            field: "size", 
            headerName: "재료양", 
            width: 150, 
            editable: true,
            renderEditCell: (params) => <SelectEditor {...params} />
        },
        { field: "count", headerName: "개수", type: "number", width: 130, editable: true },
        { field: "dateOFUse", headerName: "사용기한", type: "Date", width: 200, editable: true },
        { field: "lastUse", headerName: "마지막 사용 날짜", type: "Date", width: 200, editable: true },
        { field: "lastGet", headerName: "마지막 구입 날짜", type: "Date", width: 200, editable: true },
        { field: "memo", headerName: "기타", width: 300, editable: true },
    ];

    const [rows, setRows] = useState([
        { id: 1, ingredientName: "양파", size: "많음", count: 8, dateOFUse: "2024.04.14", lastUse: "2024.04.02", lastGet: "2024.04.08", memo: null },
        { id: 2, ingredientName: "대파", size: "적당함", count: null, dateOFUse: null, lastUse: "2024.04.02", lastGet: "2024.03.25", memo: null },
        { id: 3, ingredientName: "마늘", size: "없음", count: 0, dateOFUse: null, lastUse: "2024.04.08", lastGet: "2024.03.25", memo: null },
        { id: 4, ingredientName: "김치", size: "많음", count: null, dateOFUse: null, lastUse: "2024.02.17", lastGet: "2024.03.27", memo: null },
        { id: 5, ingredientName: "두부", size: "적당함", count: 4, dateOFUse: "2024.04.12", lastUse: "2024.03.30", lastGet: "2024.04.01", memo: "찌개용 두부" },
    ]);
    
    const handleProcessRowUpdate = (newRow, oldRow) => {
        setRows((prevRows) => prevRows.map((row) => (row.id === newRow.id ? newRow : row)));
        return newRow;
    };

    const normalmode = () => {
        navigate('/Inven');
    };
  
    return (
    <>
        <Navigation></Navigation>
        <Container fluid className={styles.container}>
          <div className={styles.main}>
          <Row className={styles.controllerRow}>
            <Col md={{span: 10, offset: 1}} className={styles.controller}>
              <Row className={styles.controllerRow1}>
                <Col>
                  <h2 className={styles.title}>냉장고 관리</h2>
                </Col>
              </Row>
              <Row className={styles.controllerRow2}>
                <Col className={styles.controlform}>
                  <div className={styles.serch}>
                    <Form.Control type="text" placeholder="재료검색" />
                  </div>
                  <Button className={styles.serchbtn} variant="primary">검색</Button>
                  <Button className={styles.btn} onClick={normalmode} variant="dark">일반 모드</Button>
                  <Button className={styles.btn} variant="light">나의 재료로 요리하기</Button>
                  <Button className={styles.btn} variant="info">일괄 저장</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={styles.contentRow}>
            <Col md={{span: 10, offset: 1}} className={styles.content}>
              <Row>
                <Col>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    processRowUpdate={handleProcessRowUpdate}
                    checkboxSelection
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                    }}
                />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        </Container>
    </>
  );
}

export default Excel;