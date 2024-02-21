import Link from "next/link"
import AuthButtons from "./AuthComponents/auth-buttons"

function Navbar() {

    return (
        <div className="flex gap-10">
            <Link href='/'>Home</Link>
            <AuthButtons />
        </div>
    )
}

export default Navbar