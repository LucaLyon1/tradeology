'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

function Authform() {
    const supabase = createClientComponentClient();

    return (
        <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={['twitter', 'google']}
            redirectTo="http://localhost:3000/auth/callback"
        />
    )
}

export default Authform