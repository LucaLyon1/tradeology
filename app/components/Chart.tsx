'use client'
import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
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
            const chart = createChart(chartRef.current, { width: 800, height: 400 })
            const lineserie = chart.addCandlestickSeries({
                upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                wickUpColor: '#26a69a', wickDownColor: '#ef5350',
            });
            lineserie.setData(chartData);
            chart.timeScale().fitContent();
        }
    }, [chartData])
    return (
        <div>
            <div className="w-2/3" ref={chartRef}>Chart</div>
        </div>
    )
}

export default Chart