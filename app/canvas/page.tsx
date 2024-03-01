'use client'

import IfElseNode from '@/components/canvas/control/IfElseNode';
import React, { useCallback, useState } from 'react'
import { ReactFlow, useNodesState, useEdgesState, addEdge, Edge, Connection, Controls, Background, MiniMap, EdgeChange, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ForNode from '@/components/canvas/control/ForNode';
import PrintNode from '@/components/canvas/control/PrintNode'
import ApiContext from '@/lib/apiContext';

const initialNodes = [
    { id: 'startnd', type: 'input', position: { x: 300, y: 100 }, data: { label: 'Start' } },
    { id: 'endnd', type: 'output', position: { x: 300, y: 250 }, data: { label: 'End' } },
];
const initialEdges: Edge[] = [];

const nodeTypes = {
    ifElse: IfElseNode,
    forLoop: ForNode,
    print: PrintNode,
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
        }),)
    }

    let api = {
        updateNodes
    };

    const onConnect = useCallback((params: Edge | Connection) =>
        setEdges((eds) =>
            addEdge(params, eds)),
        [setEdges],)


    const addNode = (type: string) => {
        setNodes([...nodes, { id: type + countId++, type: type, position: { x: 0, y: 100 }, data: { label: "1" } }]);
    }

    return (
        <div style={{ width: '100vw', height: '100vh', fontSize: '12px' }}>
            <button onClick={() => addNode('ifElse')}>Add if else node</button>
            <button onClick={() => addNode('forLoop')}>Add for node</button>
            <button onClick={() => addNode('print')}>Add print node</button>
            <ApiContext.Provider value={api}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
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