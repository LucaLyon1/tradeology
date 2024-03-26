'use client'

import Canvas from "@/components/canvas/Canvas"
import { ReactFlowProvider } from "@xyflow/react"
import StoreProvider from "../storeProvider"

function Page() {

    return (
        <ReactFlowProvider>
            <StoreProvider>
                <Canvas />
            </StoreProvider>
        </ReactFlowProvider>
    )
}

export default Page
