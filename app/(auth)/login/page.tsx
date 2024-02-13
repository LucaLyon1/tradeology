import Authform from "@/app/components/AuthComponents/Authform"

function page() {
    return (
        <div className="mt-24 flex justify-center">
            <div className="border px-8 py-4 w-1/2 rounded-md">
                <h1 className="text-2xl">Log In</h1>
                <Authform />
            </div>
        </div>
    )
}

export default page