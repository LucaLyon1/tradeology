'use client'

import Canvas from "@/components/canvas/Canvas"
import { ReactFlowProvider } from "@xyflow/react"

function Page() {

    return (
        <ReactFlowProvider>
            <Canvas />
        </ReactFlowProvider>
    )
}

export default Page
