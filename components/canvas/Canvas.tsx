'use client'

import { Background, BackgroundVariant, Connection, Controls, Edge, MiniMap, ReactFlow, addEdge, useEdgesState, useNodesState, useReactFlow, Node } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";

import ApiContext from "@/lib/apiContext";
import generateAlgo from "@/lib/generateAlgo";

import Sidebar from "../sidebar";
import EndNode from "./control/EndNode";
import ForNode from "./control/ForNode";
import IfElseNode from "./control/IfElseNode";
import PrintNode from "./control/PrintNode";
import sellNode from '@/components/canvas/order/SellNode';
import BuyNode from "./order/BuyNode";
import Indicators from "./Indicators";

import '@xyflow/react/dist/style.css';
import { sideApi } from "@/types";
import StoreProvider from "@/app/storeProvider";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/features/hooks";
import { addChild } from "../../lib/features/nodeDataSlice";


const initialNodes: Node[] = [
    { id: 'startnd', type: 'input', position: { x: 300, y: 100 }, data: { label: 'Start', acceptChildren: true }, style: {}, zIndex: 1 },
    { id: 'endnd', type: 'output', position: { x: 300, y: 400 }, data: { label: 'End', acceptChildren: false }, style: {}, zIndex: 2 },
];
const initialEdges: Edge[] = [];

const nodeTypes = {
    ifElse: IfElseNode,
    forLoop: ForNode,
    print: PrintNode,
    endNode: EndNode,
    buy: BuyNode,
    sell: sellNode,
    indicator: Indicators,
}
const parentNode: { [key: string]: boolean } = {
    ifElse: true,
    forLoop: true,
}

const nodeStyles: { [key: string]: {} } = {
    ifElse: { border: '1px solid #777', padding: 10, backgroundColor: '#FFF', borderRadius: '5px', width: 300, height: 75, display: 'flex' },
    forLoop: { border: '1px solid #777', padding: 10, backgroundColor: '#FFF', borderRadius: '5px', width: 200, height: 75, display: 'flex' },
    print: { border: '1px solid #777', padding: 10, backgroundColor: '#FFF', borderRadius: '5px', width: 200, height: 75, display: 'flex' },
    endNode: { border: '1px solid #777', padding: 10, backgroundColor: '#FFF', borderRadius: '5px', width: 200, height: 75, display: 'flex' },
    buy: { border: '1px solid #777', padding: 10, backgroundColor: '#FFF', borderRadius: '5px', width: 100, height: 50, display: 'flex' },
    sell: { border: '1px solid #777', padding: 10, backgroundColor: '#FFF', borderRadius: '5px', width: 100, height: 50, display: 'flex' },
    indicator: { border: '1px solid #777', padding: 10, backgroundColor: '#FFF', borderRadius: '5px', width: 170, height: 50, display: 'flex' },

}

let countId = 0;



function Canvas() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selected, setSelected] = useState<Node | null>(null);
    const { getIntersectingNodes } = useReactFlow();
    const store = useAppStore();
    const childs = useAppSelector(state => state.nodeData.childs);
    const dispatch = useAppDispatch();

    const updateNodes = (nodeId: string | null, data: any) => {
        setNodes(nodes.map((n) => {
            if (n.id == nodeId) {
                n.data = data;
            }
            return n
        }))
    }
    useEffect(() => {
        console.log(store);
    }, [store])

    const getPosition = (nodeId: string | null) => {
        return nodes.find((node) => node.id == nodeId)?.position
    }


    const onConnect = useCallback((params: Edge | Connection) =>
        setEdges((eds) =>
            addEdge(params, eds)),
        [setEdges],)


    const addNode = (type: string) => {
        setNodes([...nodes, {
            id: type + countId++,
            type: type,
            position: { x: 200, y: 200 },
            data: { label: "1", acceptChildren: parentNode[type] },
            style: nodeStyles[type],
        }]);
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

    const onNodeDrag = useCallback((e: React.MouseEvent<Element, MouseEvent>, node: Node) => {
        const intersections = getIntersectingNodes(node).map((n) => n.id);
        setNodes((nodes) => nodes.map((n) => ({
            ...n,
            //style: intersections.includes(n.id) ? { ...n.style, backgroundColor: '#f00c50' } : nodeStyles[n.type],
        })));
    }, [])

    const onNodeDragStop = useCallback((e: React.MouseEvent<Element, MouseEvent>, node: Node) => {
        const intersections = getIntersectingNodes(node);
        //if there is no intersections, return
        if (intersections.length == 0) return;

        const parent = intersections[0];
        //if parent does not accept children, return
        if (!parent.data.acceptChildren) return;

        dispatch(addChild(node.id));
        const height = parent.style?.height as number;
        setNodes((nodes) => nodes.map((n) => ({
            ...n,
            data: n.id == parent.id ? { ...n.data, child: { left: node.data.indicator } } : n.data,
            parentNode: !n.parentNode && n.id == node.id ? parent.id : n.parentNode,
            extent: n.id == node.id ? 'parent' : n.extent,
            position: n.id == node.id ? { x: 0, y: 0 } : n.position,
            draggable: n.id == node.id ? false : n.draggable,
            //style: n.id == parent.id ? { ...nodeStyles[n.type], width: n.style?.width + nodeStyles[node.type].width, height: n.style.height + nodeStyles[node.type].height } : nodeStyles[n.type],
            zIndex: n.id == node.id ? Number.MAX_SAFE_INTEGER : 0,
        })));
    }, [])

    let api = {
        updateNodes,
        getPosition
    };
    let sideApi: sideApi = {
        addNode,
        algoGen,
    }

    return (
        <div style={{ width: '100vw', height: '100vh', fontSize: '12px' }}>
            <Sidebar api={sideApi} />
            <ApiContext.Provider value={api}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDrag={(e, n) => onNodeDrag(e, n)}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    onNodeDragStop={(e, n) => onNodeDragStop(e, n)}
                >
                    <Controls />
                    <MiniMap />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                </ReactFlow>
            </ApiContext.Provider>
        </div>
    )
}

export default Canvas;