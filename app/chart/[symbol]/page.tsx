'use client'

import Chart from "@/components/Chart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react"

export default function ChartSymbol({ params }: { params: { symbol: String } }) {
    const [symbol, setSymbol] = useState<String>(params.symbol);
    const [stocks, setStocks] = useState<Array<String>>();
    const router = useRouter()

    useEffect(() => {
        const fetchWatchlist = async () => {
            const res = await fetch("http://localhost:3000/watchlist")
            const data = await res.json()
            setStocks(data.map((stock: { ticker: String }) => {
                return (stock.ticker)
            }))
        }
        fetchWatchlist()

    }, [stocks])

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSymbol(e.currentTarget.value)
    }
    const handleSubmit = () => {
        router.replace(`/chart/${symbol}`)
    }
    const addToWatchList = () => {
        fetch(`http://localhost:3000/watchlist/${params.symbol}`, {
            method: "POST",
        })
    }
    const deleteStock = (stock: String) => {
        fetch(`http://localhost:3000/watchlist/${stock}`, {
            method: "DELETE",
        })
    }

    return (
        <div className="w-screen h-screen">
            <div className="w-36 flex gap-4">
                <input className="border border-blue-300 rounded-md p-1"
                    placeholder="AAPL"
                    type="text"
                    onChange={handleChange} />
                <button
                    className="text-white bg-blue-300 rounded-md px-4 py-2 hover:bg-blue-400"
                    onClick={handleSubmit}>Find</button>
            </div>
            <div className="w-full h-3/4 flex">
                <div className="basis-4/5">
                    <Chart symbol={symbol} />
                </div>
                <div className="basis-1/5">
                    {stocks?.map((stock, i) => {
                        return (
                            <Link href={`/chart/${stock}`} key={i}>
                                <div className="flex justify-between border-1 px-4 py-2 bg-blue-200 rounded-md hover:bg-blue-400 mb-2">
                                    {stock}
                                    <button className="hover:bg-red-500" onClick={() => deleteStock(stock)}><X /></button>
                                </div>
                            </Link>
                        )
                    })}
                    <button onClick={addToWatchList} className="mt-6 bg-blue-300 hover:bg-blue-400 text-white rounded-sm px-4 py-2">
                        Add to watchlist !
                    </button>
                </div>
            </div>
        </div>
    )
}