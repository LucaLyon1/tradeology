import ApiContext from "@/lib/apiContext";
import { Handle, Position, useNodeId } from "@xyflow/react";
import { memo, useContext, useState } from "react"

const handle = {
    width: "24px",
    height: "16px",
    borderRadius: "5px",
    backgroundColor: '#784be8',
};


function PrintNode() {
    const [value, setValue] = useState('');
    const id = useNodeId();
    const api = useContext(ApiContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        api.updateNodes(id, {
            value: newValue
        })
    }

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                style={handle}
            />
            Print
            <input className="border border-gray-700" type="text" name="print" id="print" onChange={handleChange} />
            <Handle
                type="source"
                position={Position.Bottom}
                style={handle}
            />
        </>
    )
}

export default memo(PrintNode)