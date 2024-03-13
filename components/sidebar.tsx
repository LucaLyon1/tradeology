import { sideApi } from "@/types";

export default function Sidebar({ api }: { api: sideApi }) {
    const { addNode, algoGen } = api;

    return (
        <div className="mx-2 my-2">
            <button
                className='text-white mx-2 rounded-md px-2 py-2 bg-green-500'
                onClick={() => addNode('ifElse')}>
                Add if else node
            </button>
            <button
                className='text-white mx-2 rounded-md px-2 py-2 bg-green-500'
                onClick={() => addNode('forLoop')}>
                Add for node
            </button>
            <button
                className='text-white mx-2 rounded-md px-2 py-2 bg-green-500'
                onClick={() => addNode('endNode')}>
                Add End Of Block node
            </button>
            <button
                className='text-white mx-2 rounded-md px-2 py-2 bg-green-500'
                onClick={() => addNode('print')}>
                Add print node
            </button>
            <button
                className='text-white mx-2 rounded-md px-2 py-2 bg-green-500'
                onClick={() => addNode('buy')}>
                Add Buy node
            </button>
            <button
                className='text-white mx-2 rounded-md px-2 py-2 bg-green-500'
                onClick={() => addNode('sell')}>
                Add Sell node
            </button>
            <button
                className='text-white mx-2 rounded-md px-2 py-2 bg-green-500'
                onClick={algoGen}>
                Generate algorithm
            </button>
        </div>
    )
}