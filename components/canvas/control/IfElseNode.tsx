'use client'

import ApiContext from "@/lib/apiContext";
import { Condition } from "@/types";
import { Handle, NodeProps, Position, useHandleConnections, useNodeId } from "@xyflow/react";
import { memo, useContext, useEffect, useRef, useState } from "react";

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

const initialCondition: Condition = {
    left: "ma7",
    operator: ">",
    right: "ma21",
}

function IfElseNode({ data, targetPosition, sourcePosition }: NodeProps) {
    const id = useNodeId();
    const api = useContext(ApiContext);
    const [condition, setCondition] = useState<Condition>(initialCondition);
    const child = data.child;


    useEffect(() => {
        api.updateNodes(id, {
            condition: condition,
        });
    }, [condition.left, condition.operator, condition.right])

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
        console.log(api.getPosition(id));
        switch (choice) {
            case "pre":
                setCondition({ ...condition, left: value });
                break;
            case "oper":
                setCondition({ ...condition, operator: value });
                break;
            case "last":
                setCondition({ ...condition, right: value });
                break;
        }
    }
    return (
        <>
            <p>If</p>
            {/*TODO: select options should be defined by the parent*/}
            {/*TODO: find a way to handle duration of moving average*/}
            {child || <select onChange={(e) => handleChange(e, "pre")} value={condition.left} className="border">
                <option value="ma">Moving Average</option>
                <option value="rsi">RSI</option>
            </select>}
            {/*TODO: create json file with operators and indicators*/}
            <select onChange={(e) => handleChange(e, "oper")} value={condition.operator} className="border">
                <option value=">">{">"}</option>
                <option value="<">{"<"}</option>
            </select>
            <select onChange={(e) => handleChange(e, "last")} value={condition.right} className="border">
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
        </>
    )
}

export default memo(IfElseNode)