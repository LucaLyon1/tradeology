import { Edge, Node } from "@xyflow/react"

export interface apiInt {
    updateNodes: (nodeId: string | null, data: any) => void,
    getPosition: (nodeId: string | null) => { x: number, y: number } | undefined
}

export interface sideApi {
    addNode: (type: string) => void,
    algoGen: () => void,
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
    inventory: { [key: string]: InventoryItem },
    print: string,
    buy: () => void,
    sell: () => void,
    history: Array<number>,
    inventoryPrice: (arg0: CodeContext) => number
}

export interface Condition {
    left: string,
    operator: string,
    right: string,
}

export interface InventoryItem {
    qty: number,
    price: number,
}