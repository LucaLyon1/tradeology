import { CandlestickData } from "lightweight-charts";

export async function fetchData(symbol: String) {
    const res = await fetch(`http://localhost:3000/api/data/${symbol}`);
    const { data } = await res.json();
    var arr: Array<CandlestickData> = [];
    const timeSeries = data["Time Series (Daily)"];
    for (var key in timeSeries) {
        arr.push({
            time: key,
            open: Number(timeSeries[key]["1. open"]),
            high: Number(timeSeries[key]["2. high"]),
            low: Number(timeSeries[key]["3. low"]),
            close: Number(timeSeries[key]["4. close"])
        })
    }
    return arr.reverse();
}