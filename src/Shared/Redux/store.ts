import { configureStore } from "@reduxjs/toolkit";
import calculateReducer from "../../Widgets/Calculate/CalculateSlice";

const store = configureStore({
    reducer: {
        calculateSlice: calculateReducer
    },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;

export default store;
