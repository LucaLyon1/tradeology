'use client'

import { Handle, Position, useHandleConnections } from "@xyflow/react";

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
        <div className="h-24 p-1 border border-gray-700 flex justify-center items-center rounded-md bg-white">
            <p>For e of</p>
            {/*TODO: Loop should be an input taking an iterator*/}
            <select>
                <option value="iterator">iterator</option>
                <option value="iterator">iterator</option>
                <option value="iterator">iterator</option>
            </select>
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