import Block from "../block";

export default function WhileBlock() {
    const text = 'While loop'
    const description = 'This block will loop over an expression while a condition is met'
    return (
        <>
            <Block text={text} description={description} />
        </>
    )
}