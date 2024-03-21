import ApiContext from "@/lib/apiContext";
import { NodeProps, useNodeId } from "@xyflow/react";
import { memo, useContext, useEffect, useState } from "react"

function Indicators({ data }: NodeProps) {
    const api = useContext(ApiContext);
    const id = useNodeId();
    const [indicator, setIndicator] = useState('moving-avg');
    const [period, setPeriod] = useState(14);


    useEffect(() => {
        api.updateNodes(id, {
            ...data,
            indicator: indicator + ' ' + period,
        });
    }, [period, indicator])

    const changeIndicator = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let value = e.target.value;
        setIndicator(value);
    }
    const changePeriod = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value);
        setPeriod(value);

    }
    return (
        <>
            <select onChange={changeIndicator} name="indicator" id="indicator">
                <option value="moving-avg">Moving Average</option>
                <option value="rsi">RSI</option>
                <option value="macd">MACD</option>
            </select>
            <input
                className="w-10"
                type="number"
                name="period"
                id="period"
                onChange={(e) => changePeriod(e)} value={period} />
        </>
    )
}

export default memo(Indicators);