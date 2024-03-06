import { fetchData } from "@/lib/fetchData";
import { payload, timeframe } from "@/types";
import { Edge, Node } from "@xyflow/react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const data: payload = await req.json();
    const { nodes, edges, symbol, timeframe, freq } = data;
    const code = generateCode(nodes, edges);
    const results = executeCode(code, symbol, timeframe, freq)
    return Response.json({ results })

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

        //code += `// Process node: ${currentNode.type}\n`;
        switch (currentNode.type) {
            case "input":
                code += "(function() {\n"
                code += "var data={print:'',mean:20};\n"
                break;
            case "forLoop":
                code += `for(let i=0;i<${currentNode.data.value};i++){\n`;
                break;
            case "endNode":
                code += '};\n';
                break;
            case "print":
                code += `data.print+='${currentNode.data.value}\\n';\n`;
                break;
            case "output":
                code += 'return data;'
                code += "})();"
                break;
        }

        // Find outgoing edges from current node
        const outgoingEdges = edges.filter(edge => edge.source === currentNode.id);

        // Recursively navigate connected nodes
        for (const edge of outgoingEdges) {
            const targetNode = nodes.find(n => n.id === edge.target);
            if (targetNode) navigateNode(targetNode);
        }
    }

    navigateNode(startNode);

    // Add finishing touches (e.g., closing brackets, return statements)
    return code;
}

function executeCode(code: string, symbol: string, timeframe: timeframe, freq: string) {
    //TODO: need to find the best way to apply the code to the dataset
    //need to enforce that result is a function
    //ideas: wrap user's code in a for loop, keep track of every indicator's value at every iteration
    const data = fetchData(symbol);
    const result = eval(code);

    return result;
}

const movingAverage = (dataSet, period) => {
  const output = Array(period).fill(0);
  for(i=period-1;i<dataSet.length;i++) {
    output.push(dataSet.slice(i-(period-1), i)
               .reduce((a,b) => a+b)/period)
  }
  return output
}
