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

const handleLoop = {
    left: 50 + "%",
    width: "32px",
    height: "20px",
    borderRadius: "5px",
    backgroundColor: '#784be8',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: '12px'
};

function ForNode() {
    const api = useContext<apiInt>(ApiContext);
    const id = useNodeId();
    const [qty, setQty] = useState(1)

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setQty(Number(newValue))
        api.updateNodes(id, {
            value: newValue
        })
    }

    return (
        <>
            <p>Repeat</p>
            <input
                className="ml-2 w-16"
                type="number"
                name="number"
                id="number"
                min={0}
                onChange={handleChange}
                value={qty}
            />
            <p> times</p>
            <Handle
                type="target"
                position={Position.Top}
                style={handle}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="loop"
                style={handleLoop}>
                Do
            </Handle>
        </>
    )
}

export default memo(ForNode)