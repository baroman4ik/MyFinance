import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FinanceState {
    incomes: Transaction[];
    expenses: Transaction[];
    editingTransaction: Transaction | null;
}


export interface Transaction {
    id: string;
    name: string;
    amount: number;
    category: string;
    date: string;
}

const initialState: FinanceState = {
    incomes: [],
    expenses: [],
    editingTransaction: null
};

const financeSlice = createSlice({
    name: 'finance',
    initialState,
    reducers: {
        addIncome({incomes}, action: PayloadAction<Transaction>) {
            incomes.push(action.payload);
        },
        addExpense({expenses}, action: PayloadAction<Transaction>) {
            expenses.push(action.payload);
        },
        deleteTransaction({expenses}, action: PayloadAction<string>) {
            // expenses.push(action.payload);
        },
        setEditingTransaction(state, action: PayloadAction<Transaction | null>) {
            state.editingTransaction = action.payload;
        },

    },
});

export const { addIncome, addExpense, deleteTransaction, setEditingTransaction } = financeSlice.actions;

export const selectTransactions = createSelector(
    (state: { calculateSlice: FinanceState }) => state.calculateSlice.incomes.concat(state.calculateSlice.expenses),
    (transactions: Transaction[]) =>
        transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);


export const selectIncomes = (state: { calculateSlice: { incomes: Transaction[]; }; }) => state.calculateSlice.incomes.map(el => ({x: el.date, y: el.amount}));
export const selectExpense = (state: { calculateSlice: { expenses: Transaction[]; }; }) => state.calculateSlice.expenses.map(el => ({x: el.date, y: el.amount}));
export const editingTransaction = (state: { calculateSlice: { editingTransaction: Transaction | null; }; }) => state.calculateSlice.editingTransaction;

export default financeSlice.reducer;
