import Card from "react-bootstrap/Card";
import useChart from "../../../services/Management/useChart";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";

const Visit = () => {

    const [visitList,setVisitList] = useState([0,0,0,0,0,0,0]);
    let accessToken = useSelector(state => state.token.value);
    useEffect(() => {
        axios.get(
            "http://localhost:8080/management/visit/week", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}` // auth 설정
                },
            }
        ).then(res => {
            console.log(res.data)
            setVisitList(res.data);

        })
            .catch(console.error)



    }, []);

    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Dataset',
                data: visitList,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointStyle: 'rectRounded',
                pointRadius: 10,
                pointHoverRadius: 15
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Weekly Visitors'
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value) {
                        return Number(value).toFixed(0); // 소수점 제거
                    }
                }
            }
        }
    };

    const canvasRef = useChart(data, options);
    return(
        <Card border="light">
            {/*<Card.Title>*/}
            {/*    주간 방문자*/}
            {/*</Card.Title>*/}
            <Card.Body style={{ position: 'relative' }}>
                <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>
            </Card.Body>
        </Card>
    )
}

export default Visit;