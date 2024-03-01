import { Edge, Node } from "@xyflow/react"

export default async function generateAlgo(data: { nodes: Node[], edges: Edge[] }) {
    try {
        const res = await fetch('http://localhost:3000/api/algorithm', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        console.log(res)
        if (res.ok) {
            console.log("Yeai!")
        } else {
            console.log("Oops! Something is wrong.")
        }
    } catch (error) {
        console.log(error)
    }
}