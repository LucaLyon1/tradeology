import { Blocks } from "@/types";
import Block from "./code/block";

interface BlockData {
    text: string,
    description: string
}

const data: { [key in Blocks]: BlockData } = {
    [Blocks.BuyOrder]: {
        text: 'Buy order',
        description: 'Use this block to place a sell order in your algorithm'
    },
    [Blocks.SellOrder]: {
        text: 'Sell order',
        description: 'Use this block to place a sell order in your algorithm'
    },
    [Blocks.ForLoop]: {
        text: 'For loop',
        description: 'Will loop over an expression with the following pattern : for ... in ...'
    },
    [Blocks.IfElse]: {
        text: 'If/Else block',
        description: 'Will create two branches in your algorithm, depending on a criteria'
    },
    [Blocks.WhileLoop]: {
        text: 'While loop',
        description: 'This block will loop over an expression while a condition is met'
    }

}

export default function Sidebar({ addBlock }: { addBlock: (newBlock: Blocks) => void }) {
    const handleClick = (block: Blocks) => {
        addBlock(block)
    }
    return (
        <div className="h-screen mx-2 my-2">
            {Object.entries(data).map(([key, value]) => {
                const block = Number(key) as Blocks
                return (
                    <div key={key} onClick={() => handleClick(block)}>
                        <Block text={value.text} description={value.description} />
                    </div>
                )
            })}
        </div>
    )
}