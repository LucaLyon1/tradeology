import { payload } from "@/types";
import { Edge, Node } from "@xyflow/react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const data: payload = await req.json();
    const { nodes, edges } = data;
    const code = generateCode(nodes, edges)
    console.log(eval(code));
    return Response.json({ data })

}

function generateCode(nodes: Node[], edges: Edge[]) {
    let code = "";
    const visitedNodes = new Set(); // Track visited nodes to avoid infinite loops

    // Start node (assuming the first node is the starting point)
    const startNode = nodes[0];

    function navigateNode(currentNode: Node) {
        if (visitedNodes.has(currentNode.id)) {
            return; // Avoid infinite loops if encountering a visited node
        }
        visitedNodes.add(currentNode.id);

        code += `// Process node: ${currentNode.type}\n`;
        switch (currentNode.type) {
            case "input":
                break;
            case "forLoop":
                code += `for(let i=0;i<${currentNode.data.value};i++){\n`;
                break;
            case "print":
                code += `console.log('${currentNode.data.value}');\n`
            case "output":
                break;
        }

        // Find outgoing edges from current node
        const outgoingEdges = edges.filter(edge => edge.source === currentNode.id);

        // Recursively navigate connected nodes
        for (const edge of outgoingEdges) {
            const targetNode = nodes.find(n => n.id === edge.target);
            if (targetNode) navigateNode(targetNode);
        }

        if (currentNode.type === "forLoop") {
            code += `};\n`; // Close the "if" block from the condition node
        }
    }

    navigateNode(startNode);

    // Add finishing touches (e.g., closing brackets, return statements)
    return code;
}