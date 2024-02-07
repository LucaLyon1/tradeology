'use client'
import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

function Chart() {
    const chartRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!chartRef.current) {
            return
        }
        const chart = createChart(chartRef.current, { width: 800, height: 400 })
        const lineserie = chart.addCandlestickSeries({
            upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
            wickUpColor: '#26a69a', wickDownColor: '#ef5350',
        });
        lineserie.setData([
            { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
            { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
            { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
            { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
            { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
            { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
            { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
            { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
            { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
            { time: '2019-01-01', open: 97.12, high: 114.69, low: 85.66, close: 111.26 },
            { time: '2019-01-02', open: 112.01, high: 114.69, low: 103.12, close: 105.01 },
            { time: '2019-01-03', open: 104.56, high: 108.00, low: 85.66, close: 95.67 },
            { time: '2019-01-04', open: 96.00, high: 114.69, low: 93.12, close: 111.26 },
            { time: '2019-01-05', open: 130.12, high: 135.12, low: 123.45, close: 126.78 },
        ]);
        chart.timeScale().fitContent();
    }, [])
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-2/3" ref={chartRef}>Chart</div>
        </div>
    )
}

export default Chart