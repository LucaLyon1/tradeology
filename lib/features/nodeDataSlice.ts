import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface nodeState {
    childs: string[]
}
const initialState: nodeState = {
    childs: []
}

export const nodeDataSlice = createSlice({
    name: 'nodeData',
    initialState,
    reducers: {
        addChild: (state, action: PayloadAction<string>) => {
            state.childs.push(action.payload)
        },
        removeChild: (state, action: PayloadAction<string>) => {
            const index = state.childs.indexOf(action.payload)
            state.childs.splice(index, 1)
        }
    }
});

export const { addChild, removeChild } = nodeDataSlice.actions;

export default nodeDataSlice.reducer