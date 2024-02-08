'use client'
import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

function Chart() {
    const chartRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!chartRef.current) {
            return
        }
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/data');
            const { data } = await res.json();
            var arr = [];
            const timeSeries = data["Time Series (Daily)"];
            for (var key in timeSeries) {
                arr.push({ time: key, open: timeSeries[key]["1. open"] })
            }
            console.log(arr);
            return data;
        }
        fetchData();
        const chart = createChart(chartRef.current, { width: 800, height: 400 })
        const lineserie = chart.addCandlestickSeries({
            upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
            wickUpColor: '#26a69a', wickDownColor: '#ef5350',
        });
        lineserie.setData([]);
        chart.timeScale().fitContent();
    }, [])
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-2/3" ref={chartRef}>Chart</div>
        </div>
    )
}

export default Chart