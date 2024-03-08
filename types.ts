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

export interface CodeContext {
    balance: number,
    inventory: { [key: string]: number },
    print: string,
    buy: () => void
}

export interface Condition {
    left: string,
    operator: string,
    right: string,
}