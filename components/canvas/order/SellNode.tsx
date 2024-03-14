'use client'

import ApiContext from "@/lib/apiContext";
import { apiInt } from "@/types";
import { Handle, Position, useHandleConnections, useNodeId } from "@xyflow/react";
import { memo, useContext, useState } from "react";

const handle = {
    width: "32px",
    height: "20px",
    borderRadius: "5px",
    backgroundColor: '#784be8',
};

function sellNode() {
    const api = useContext<apiInt>(ApiContext);
    const id = useNodeId();

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
        <>
            <Handle
                type="target"
                position={Position.Top}
                style={handle}
            />
            <p>Sell 1 AAPL</p>
            <Handle
                type="source"
                id="then"
                position={Position.Bottom}
                style={handle}>
            </Handle>
        </>
    )
}
export default memo(sellNode)