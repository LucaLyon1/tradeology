import { payload } from "@/types"

export default async function generateAlgo(data: payload) {
    try {
        const res = await fetch('http://localhost:3000/api/algorithm', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        if (res.ok) {
            const { result } = await res.json();
            console.log(result.print);
        } else {
            console.log("Oops! Something is wrong.")
        }
    } catch (error) {
        console.log(error)
    }
}