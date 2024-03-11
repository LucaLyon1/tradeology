'use client'

import React, { useCallback } from 'react'

import { ReactFlow, useNodesState, useEdgesState, addEdge, Edge, Connection, Controls, Background, MiniMap, EdgeChange, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ApiContext from '@/lib/apiContext';

import ForNode from '@/components/canvas/control/ForNode';
import IfElseNode from '@/components/canvas/control/IfElseNode';
import PrintNode from '@/components/canvas/control/PrintNode'
import generateAlgo from '@/lib/generateAlgo';
import EndNode from '@/components/canvas/control/EndNode';
import BuyNode from '@/components/canvas/order/BuyNode';
import sellNode from '@/components/canvas/order/SellNode';

const initialNodes = [
    { id: 'startnd', type: 'input', position: { x: 300, y: 100 }, data: { label: 'Start' } },
    { id: 'endnd', type: 'output', position: { x: 300, y: 250 }, data: { label: 'End' } },
];
const initialEdges: Edge[] = [];

const nodeTypes = {
    ifElse: IfElseNode,
    forLoop: ForNode,
    print: PrintNode,
    endNode: EndNode,
    buy: BuyNode,
    sell: sellNode,
}

let countId = 0;


function Canvas() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const updateNodes = (nodeId: string | null, data: any) => {
        setNodes(nodes.map((n) => {
            if (n.id == nodeId) {
                n.data = data;
            }
            return n
        }))
        console.log(nodes);
    }
    const getPosition = (nodeId: string | null) => {
        return nodes.find((node) => node.id == nodeId)?.position
    }

    let api = {
        updateNodes,
        getPosition
    };

    const onConnect = useCallback((params: Edge | Connection) =>
        setEdges((eds) =>
            addEdge(params, eds)),
        [setEdges],)


    const addNode = (type: string) => {
        setNodes([...nodes, { id: type + countId++, type: type, position: { x: 200, y: 200 }, data: { label: "1" } }]);
    }

    const algoGen = async () => {
        const data = {
            nodes: nodes,
            edges: edges,
            //TODO: add input fields
            symbol: 'AAPL',
            timeframe: { beg: new Date(2021, 1, 1), end: new Date() },
            freq: '1D'
        }
        await generateAlgo(data)
    }

    const onNodeDrag = (e: React.MouseEvent) => {
        console.log(e);
        let xpos = e.clientX + e.nativeEvent.offsetX;
        let ypos = e.clientY + e.nativeEvent.offsetY
        //TODO: check if xpos and ypos are intersecting with any other node
    }

    return (
        <div style={{ width: '100vw', height: '100vh', fontSize: '12px' }}>
            {/*TODO: externaliser dans un composant'*/}
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
            <ApiContext.Provider value={api}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDrag={(e) => onNodeDrag(e)}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                >
                    <Controls />
                    <MiniMap />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                </ReactFlow>
            </ApiContext.Provider>
        </div>
    )
}

export default Canvas