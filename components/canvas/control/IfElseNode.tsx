'use client'

import ApiContext from "@/lib/apiContext";
import { Handle, Position, useHandleConnections, useNodeId } from "@xyflow/react";
import { useContext, useEffect, useState } from "react";

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
    const id = useNodeId();
    const api = useContext(ApiContext);
    const [premise, setPremise] = useState('ma7');
    const [oper, setOper] = useState('>');
    const [last, setLast] = useState('ma21');

    useEffect(() => {
        api.updateNodes(id, {
            condition: premise + oper + last
        });
    }, [premise, oper, last])

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

    const handleChange = (e: React.FormEvent<HTMLSelectElement>, choice: string) => {
        const value = e.currentTarget.value;
        switch (choice) {
            case "pre":
                setPremise(value);
                break;
            case "oper":
                setOper(value);
                break;
            case "last":
                setLast(value);
                break;
        }
    }

    return (
        <div className="h-24 p-1 border border-gray-700 flex justify-center items-center rounded-md bg-white">
            <p>If</p>
            {/*TODO: select options should be defined by the parent*/}
            {/*TODO: find a way to handle duration of moving average*/}
            <select onChange={(e) => handleChange(e, "pre")} value={premise} className="border">
                <option value="ma">Moving Average</option>
                <option value="rsi">RSI</option>
            </select>
            {/*TODO: create json file with operators and indicators*/}
            <select onChange={(e) => handleChange(e, "oper")} value={oper} className="border">
                <option value=">">{">"}</option>
                <option value="<">{"<"}</option>
            </select>
            <select onChange={(e) => handleChange(e, "last")} value={last} className="border">
                <option value="ma">Moving Average</option>
                <option value="rsi">RSI</option>
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