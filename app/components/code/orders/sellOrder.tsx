import Block from "../block";

export default function SellOrder() {
    const description = "Use this block to place a sell order in your algorithm"
    return (
        <>
            <Block text="Sell order" description={description} />
        </>
    )
}