import { apiInt } from "@/types";
import { createContext } from "react";

const ApiContext = createContext<apiInt>({
    updateNodes: () => { }
});

export default ApiContext;