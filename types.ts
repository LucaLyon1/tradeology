import { Edge, Node } from "@xyflow/react"

export enum Blocks {
    IfElse = 1,
    ForLoop,
    WhileLoop,
    BuyOrder,
    SellOrder
}

export interface apiInt {
    updateNodes: (nodeId: string | null, data: any) => void
}

export interface payload {
    nodes: Node[],
    edges: Edge[],
    symbol: string,
    timeframe: timeframe,
    freq: string
}

export interface timeframe {
    beg: Date,
    end: Date
}