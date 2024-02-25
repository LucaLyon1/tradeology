'use client'

import { Connection, Handle, Position, useHandleConnections } from "@xyflow/react";
import { useCallback, useEffect } from "react";

const handleIf = { left: 25 + "%" }
const handleElse = { left: 75 + "%" }



export default function IfElseNode() {
    const onConnect = () => {
        console.log("connect");
    }

    const onDisconnect = () => {
        console.log("disconnect");
    }

    const connections = useHandleConnections({
        type: 'source',
        id: 'if',
        onConnect,
        onDisconnect
    });

    return (
        <div className="h-16 w-32 p-1 border border-gray-700 flex justify-center items-center rounded-md bg-white">
            <p>If Else Node</p>
            <Handle
                type="source"
                position={Position.Bottom}
                id="if"
                style={handleIf}
                isConnectable={connections.length === 0}
            />
        </div>
    )
}