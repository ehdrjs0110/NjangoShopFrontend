import { useEffect, useState } from "react";
import { axiosInstance } from "../../middleware/customAxios";
import styles from "../../styles/Management/ManagementSearch.module.scss";
import Table from "react-bootstrap/Table";
import CustomPagination from "../Pagination/CustomPagination";
import {useCookies} from "react-cookie";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {expired, getNewToken} from "../../services/auth2";
import {containToken} from "../../Store/tokenSlice";
import {containIsAdmin} from "../../Store/isAdminSlice";

const TableWithPagination = ({ apiEndpoint, columns, renderRow, pageSize = 5, reloadTrigger  }) => {
    const [pageCount, setPageCount] = useState(0);
    const [data, setData] = useState(null);

    // refresh token 가져오기
    const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

    // redux에서 가져오기
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function tokenHandler() {


        const isExpired = expired();
        if(isExpired){

            let refreshToken = cookies.refreshToken;
            try {

                // getNewToken 함수 호출 (비동기 함수이므로 await 사용)
                const result = await getNewToken(refreshToken);
                refreshToken = result.newRefreshToken;

                // refresh token cookie에 재설정
                setCookie(
                    'refreshToken',
                    refreshToken,
                    {
                        path:'/',
                        maxAge: 7 * 24 * 60 * 60, // 7일
                        // expires:new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
                    }
                )

                // Redux access token 재설정
                dispatch(containToken(result.newToken));
                dispatch(containIsAdmin(true));

            } catch (error) {
                console.log(error);
                navigate('/Management');
            }
        }

    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                // 토큰 핸들러 호출 (토큰 갱신이 필요하면 갱신)
                await tokenHandler();

                // 토큰 갱신 후에 데이터를 가져옴
                const response = await axiosInstance.get(`${apiEndpoint}/${pageCount}/${pageSize}`);
                setData(response.data);
                console.log(apiEndpoint);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // 비동기 함수 호출
    }, [pageCount, apiEndpoint, pageSize, reloadTrigger]); // 의존성 배열

    return (
        <>
            <Table striped bordered hover className={styles.userTable}>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data ? data.content.map((item, index) => renderRow(item, index)) : <tr><td colSpan={columns.length + 1}>Loading...</td></tr>}
                </tbody>
            </Table>
            {data && (
                <CustomPagination
                    data={data}
                    size="sm"
                    current={pageCount + 1}
                    onPageChange={(cur) => setPageCount(cur - 1)}
                />
            )}
        </>
    );
};

export default TableWithPagination;
