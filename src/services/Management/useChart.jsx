import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const useChart = (data, options) => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const chartInstance = new Chart(canvasRef.current, {
                type: 'line',
                data: data,
                options: options
            });
            chartRef.current = chartInstance;
        }
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data, options]);

    return canvasRef;
};

export default useChart;
