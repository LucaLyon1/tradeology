import Block from "../block"

export default function BuyOrder() {
    const text = 'Buy order'
    const description = 'Use this block to place a sell order in your algorithm'
    return (
        <>
            <Block text={text} description={description} />
        </>
    )
}