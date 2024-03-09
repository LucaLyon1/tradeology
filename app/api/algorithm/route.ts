import { fetchData } from "@/lib/fetchData";
import { CodeContext, Condition, payload, timeframe } from "@/types";
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

//TODO: idea : create a queue of nodes to explore to generate codes in the orders intended
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
                break;
            case "forLoop":
                code += `for(let i=0;i<${currentNode.data.value};i++){\n`;
                break;
            case "endNode":
                code += '};\n';
                break;
            case "ifElse":
                let condition: Condition = currentNode.data.condition
                let conditionString = condition.left + '[i]' + condition.operator + condition.right + '[i]'
                let prevCandle = '(' + condition.left + '[i-1]' + condition.operator + condition.right + '[i-1])'
                code += `if(i>=1 && ${conditionString} && !${prevCandle}) {\n`;
                break;
            case "print":
                code += `context.print+='${currentNode.data.value}\\n';\n`;
                break;
            case "buy":
                code += `context.buy(context, data[i].close, 1);\n`;
                code += `console.log('bought at', data[i].close);\n`;
                break;
            case "sell":
                code += `context.sell(context,  data[i].close, 1);\n`;
                code += `console.log('sold at', data[i].close);\n`;
                break;
            case "output":
                code += 'if(context.inventory[symbol]) context.inventory[symbol].price = data[i].close;\n'
                code += 'context.history.push(context.balance + context.inventoryPrice(context));\n'
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
    //TODO: need to enforce that result is a function
    const buyStock = (context: CodeContext, price: number, n: number) => {
        if (context.balance >= price) {
            context.balance -= price;
            context.inventory[symbol] ? context.inventory[symbol].qty += 1 : context.inventory[symbol] = { qty: 1, price: price };
        }
    }
    const sellStock = (context: CodeContext, price: number, n: number) => {
        if (!context.inventory[symbol]) return;
        context.balance += price;
        context.inventory[symbol].qty--;
    }
    const inventoryPrice = (context: CodeContext) => {
        return context.inventory[symbol] ? context.inventory[symbol].qty * context.inventory[symbol].price : 0;
    }
    const data = await fetchData(symbol);
    const ma21 = movingAverage(data, 21);
    const ma7 = movingAverage(data, 7);
    let context = { balance: 1000, inventory: {}, print: '', buy: buyStock, sell: sellStock, history: [], inventoryPrice: inventoryPrice }
    for (let i = 0; i < data.length; i++) {
        eval(code)
    }

    return context;
}

const movingAverage = (dataSet: Array<CandlestickData>, period: number) => {
    const output: number[] = Array(period - 1).fill(undefined);
    for (let i = period; i <= dataSet.length; i++) {
        let average = dataSet.slice(i - period, i).reduce((a, b) => a + b.close, 0) / period;
        output.push(Math.round(average * 100) / 100)
    }
    return output
}
