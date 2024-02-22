'use client'

import { useState } from "react";
import { Handle, Position } from "reactflow";

const handleIf = { left: 25 + "%" }
const handleElse = { left: 75 + "%" }



export default function IfElseNode() {

    return (
        <div className="h-16 w-32 p-1 border border-gray-700 flex justify-center items-center rounded-md bg-white">
            <p>If Else Node</p>
            <Handle
                type="source"
                position={Position.Bottom}
                id="if"
                style={handleIf}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="else"
                style={handleElse}
            />
        </div>
    )
}