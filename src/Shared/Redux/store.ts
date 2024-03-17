import {configureStore} from "@reduxjs/toolkit";
import calculateReducer from "../../Widgets/Calculate/CalculateSlice";
import {accountsSlice} from "../../Widgets/Accounts/AccountsSlice";

const store = configureStore({
  reducer: {
    calculateSlice: calculateReducer,
    accounts: accountsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;

export default store;
