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