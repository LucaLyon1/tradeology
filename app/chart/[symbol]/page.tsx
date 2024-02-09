'use client'

import Chart from "@/app/components/Chart";

export default function ChartSymbol({ params }: { params: { symbol: String } }) {
    const { symbol } = params;
    return (
        <>
            <Chart symbol={symbol} />
        </>
    )
}