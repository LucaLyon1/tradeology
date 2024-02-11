'use client'
import { useEffect, useRef, useState } from "react";
import { CrosshairMode, createChart } from "lightweight-charts";
import { CandlestickData } from "lightweight-charts";
import { fetchData } from "@/lib/fetchData";

function Chart({ symbol }: { symbol: String }) {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartData, setChartData] = useState<Array<CandlestickData>>([])
    useEffect(() => {
        if (!chartRef.current) return

        const getData = async () => {
            setChartData(await fetchData(symbol))
        }
        if (chartData.length == 0) {
            getData();
        } else {
            const chart = createChart(chartRef.current, {
                width: chartRef.current.clientWidth,
                height: chartRef.current.clientHeight,
            })
            const lineserie = chart.addCandlestickSeries({
                upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                wickUpColor: '#26a69a', wickDownColor: '#ef5350',
            });
            lineserie.setData(chartData);
            chart.timeScale().fitContent();
            window.addEventListener('resize', () =>
                chart.resize(window.innerWidth, window.innerHeight))
        }
    }, [chartData])
    return (
        <div className="w-full h-full">
            <div className="w-full h-full" ref={chartRef}></div>
        </div>
    )
}

export default Chart