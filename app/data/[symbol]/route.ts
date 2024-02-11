import { NextRequest } from "next/server";

const apiKey: String = process.env.NEXT_PUBLIC_ALPHA_KEY || "";

export async function GET(req: NextRequest, { params }: { params: { symbol: String } }) {
    const symbol = params.symbol
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    const res = await fetch(url);

    const data = await res.json();

    return Response.json({ data })

}

