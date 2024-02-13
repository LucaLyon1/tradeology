import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import SessionButtons from "./session-buttons"

async function AuthButtons() {
    const supabase = createServerComponentClient({ cookies })

    const { data: { session } } = await supabase.auth.getSession()
    return (
        <SessionButtons session={session} />
    )
}

export default AuthButtons