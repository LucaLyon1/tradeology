'use client'

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"

function SessionButtons({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient()
    const router = useRouter()

    const handleSignout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }
    return session ? (
        <>
            <Link href='/chart/AAPL'>Chart</Link>
            <Link href='/canvas'>Strategy Builder</Link>
            <Link href='/account'>Account</Link>
            <button onClick={handleSignout}>Log out</button>
        </>
    ) : (
        <>
            <Link href='/login'>Login</Link>
        </>
    )
}

export default SessionButtons