'use client'

import React, { useCallback, useState } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge, Edge, Connection, Controls, Background, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
];
const initialEdges: Edge[] = [];


function Canvas() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [count, setCount] = useState(2);

    const onConnect = useCallback((params: Edge | Connection) =>
        setEdges((eds) =>
            addEdge(params, eds)),
        [setEdges],)

    const addNode = () => {
        setNodes([...nodes, { id: count + "", position: { x: 0, y: 100 }, data: { label: count + "" } }]);
        setCount(count + 1);
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <button onClick={addNode}>Add node</button>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}

export default Canvas