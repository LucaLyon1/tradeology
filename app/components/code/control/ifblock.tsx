import Block from "../block"

export default function IfBlock() {
    const text = 'If/Else block'
    const description = 'Will create two branches in your algorithm, depending on a criteria'

    return (
        <>
            <Block text={text} description={description} />
        </>
    )
}