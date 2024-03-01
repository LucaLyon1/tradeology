'use client'

import ApiContext from "@/lib/apiContext";
import { apiInt } from "@/types";
import { Handle, Position, useHandleConnections, useNodeId } from "@xyflow/react";
import { useContext, useState } from "react";

const handle = {
    width: "32px",
    height: "20px",
    borderRadius: "5px",
    backgroundColor: '#784be8',
};

const handleLoop = {
    left: 25 + "%",
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

const handleOut = {
    left: 75 + "%",
    width: "38px",
    height: "20px",
    borderRadius: "5px",
    backgroundColor: '#784be8',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: '12px'
};

export default function ForNode() {
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
        <div className="h-20 p-1 border border-gray-700 flex justify-center items-center rounded-md bg-white">
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
            <Handle
                type="source"
                id="then"
                position={Position.Bottom}
                style={handleOut}>
                Then
            </Handle>
        </div>
    )
}