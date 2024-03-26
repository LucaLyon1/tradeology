import { configureStore } from "@reduxjs/toolkit";
import nodeReducer from "@/lib/features/nodeDataSlice";
import { useDispatch, useSelector } from "react-redux";

export const makeStore = () => {
    return configureStore({
        reducer: {
            nodeData: nodeReducer
        }
    })
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
