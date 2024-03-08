import { fetchData } from "@/lib/fetchData";
import { CodeContext, payload, timeframe } from "@/types";
import { Edge, Node } from "@xyflow/react";
import { CandlestickData, Time } from "lightweight-charts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const data: payload = await req.json();
    const { nodes, edges, symbol, timeframe, freq } = data;
    const code = generateCode(nodes, edges);
    console.log(code);
    const results = await executeCode(code, symbol, timeframe, freq);
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

        code += `// Process node: ${currentNode.type}\n`;
        //How to access variables and decide if a node needs it ??
        switch (currentNode.type) {
            case "input":
                code += "(function() {\n"
                break;
            case "forLoop":
                code += `for(let i=0;i<${currentNode.data.value};i++){\n`;
                break;
            case "endNode":
                code += '};\n';
                break;
            case "print":
                code += `context.print+='${currentNode.data.value}\\n';\n`;
                break;
            case "buy":
                code += `context.buy(context, data, 1);\n`;
                break;
            case "output":
                code += 'return context;\n'
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

async function executeCode(code: string, symbol: string, timeframe: timeframe, freq: string) {
    //TODO: need to find the best way to apply the code to the dataset
    //need to enforce that result is a function
    //ideas: wrap user's code in a for loop, keep track of every indicator's value at every iteration
    const buyStock = (context: CodeContext, data: CandlestickData<Time>[], n: number) => {
        context.balance -= data[n].close;
        context.inventory[symbol] ? context.inventory[symbol] += 1 : context.inventory[symbol] = 1;
    }
    const data = await fetchData(symbol);
    const ma21 = movingAverage(data, 21);
    const ma7 = movingAverage(data, 7);
    const context = { balance: 1000, inventory: {}, print: '', buy: buyStock }
    const result = eval(code);
    console.log(result);

    return result;
}

const movingAverage = (dataSet: Array<CandlestickData>, period: number) => {
    const output: number[] = Array(period).fill(0);
    for (let i = period - 1; i < dataSet.length; i++) {
        output.push(dataSet.slice(i - (period - 1), i).reduce((a, b) => a + b.close, 0) / period)
    }
    return output
}
