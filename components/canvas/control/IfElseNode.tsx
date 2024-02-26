'use client'

import { Handle, Position, useHandleConnections } from "@xyflow/react";

const handle = {
    width: "32px",
    height: "20px",
    borderRadius: "5px",
    backgroundColor: '#784be8',
};

const handleIf = {
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

const handleElse = {
    left: 75 + "%",
    width: "36px",
    height: "20px",
    borderRadius: "5px",
    backgroundColor: '#784be8',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: '12px'
};

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
        <div className="h-24 p-1 border border-gray-700 flex justify-center items-center rounded-md bg-white">
            <p>If</p>
            {/*TODO: select options should be defined by the parent*/}
            <select name="statement" className="border">
                <option value="MA">Moving Average</option>
                <option value="MA">Moving Average</option>
                <option value="MA">Moving Average</option>
            </select>
            <Handle
                type="target"
                position={Position.Top}
                id="iftgt"
                style={handle}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="if"
                style={handleIf}
                isConnectable={connections.length === 0}>
                Do
            </Handle>
            <Handle
                type="source"
                position={Position.Bottom}
                id="else"
                style={handleElse}>
                Else
            </Handle>
        </div>
    )
}