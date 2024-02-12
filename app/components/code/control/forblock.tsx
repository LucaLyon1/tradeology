import Block from "../block"

export default function ForBlock() {
    const text = 'For loop'
    const description = 'Will loop over an expression with the following pattern : for ... in ...'
    return (
        <>
            <Block text={text} description={description} />
        </>
    )
}