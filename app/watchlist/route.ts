import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest } from "next/server";
import { cookies } from "next/headers"

export async function GET() {
    const supabase = createRouteHandlerClient({ cookies })
    const { data } = await supabase.auth.getUserIdentities()
    const user_id = data?.identities[0].user_id;
    const response = await supabase
        .from('stock_list')
        .select('ticker').eq('user_id', user_id)
    return Response.json(response.data)
}