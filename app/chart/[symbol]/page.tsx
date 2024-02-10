'use client'

import Chart from "@/app/components/Chart";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChartSymbol({ params }: { params: { symbol: String } }) {
    const [symbol, setSymbol] = useState<String>(params.symbol);
    const router = useRouter()

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSymbol(e.currentTarget.value)
    }
    const handleSubmit = () => {
        router.replace(`/chart/${symbol}`)
    }

    return (
        <div className="w-full flex flex-col items-left mt-12">
            <div className="mb-12 w-36 flex gap-4">
                <input className="border border-blue-300 rounded-md p-1"
                    placeholder="AAPL"
                    type="text"
                    onChange={handleChange} />
                <button
                    className="text-white bg-blue-300 rounded-md px-4 py-2 hover:bg-blue-400"
                    onClick={handleSubmit}>Find</button>
            </div>
            <Chart symbol={symbol} />
        </div>
    )
}