import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { symbol: String } }) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data } = await supabase.auth.getUserIdentities()
    const user_id = data?.identities[0].user_id;
    const { status, statusText, error } = await supabase
        .from('stock_list')
        .insert({ user_id: user_id, ticker: params.symbol })
    if (error) {
        return Response.json({ error: error })
    }
    return Response.json({ status: status, message: statusText })
}

export async function DELETE(req: NextRequest, { params }: { params: { symbol: String } }) {
    console.log("received");
}

