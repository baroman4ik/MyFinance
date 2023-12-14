import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { expenseCategories, incomeCategories} from './Calculate';

interface FinanceState {
    incomes: Transaction[];
    expenses: Transaction[];
    editingTransaction: Transaction | null;
}

export interface Transaction {
    amount: number;
    category: string;
    date: string;
    id: string;
    name: string;
    type: TransTypes;
}

export type TransTypes = "Расход" | "Доход";

const initialState: FinanceState = {
    incomes: [],
    expenses: [],
    editingTransaction: null,
};

const financeSlice = createSlice({
    name: 'finance',
    initialState,
    reducers: {
        addIncome: (state, action: PayloadAction<Transaction>) => {
            state.incomes = [...state.incomes, action.payload];
        },
        addExpense: (state, action: PayloadAction<Transaction>) => {
            state.expenses = [...state.expenses, action.payload];
        },
        deleteIncome: (state, action: PayloadAction<string>) => {
            state.incomes = state.incomes.filter((el) => el.id !== action.payload);
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            state.expenses = state.expenses.filter((el) => el.id !== action.payload);
        },
        setEditingTransaction: (state, action: PayloadAction<Transaction | null>) => {
            state.editingTransaction = action.payload;
        },
    },
});

export const {
    addIncome,
    addExpense,
    deleteExpense,
    deleteIncome,
    setEditingTransaction,
} = financeSlice.actions;

// Оптимизация selectTransactions с использованием деструктуризации
export const selectTransactions = createSelector(
  (state: { calculateSlice: FinanceState }) => [...state.calculateSlice.incomes, ...state.calculateSlice.expenses],
  (transactions: Transaction[]) =>
    transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);

export const selectIncomes = (state: { calculateSlice: { incomes: Transaction[] } }) =>
  state.calculateSlice.incomes.map((income) => ({ x: income.date, y: income.amount }));

export const selectExpense = (state: { calculateSlice: { expenses: Transaction[] } }) =>
  state.calculateSlice.expenses.map((expense) => ({ x: expense.date, y: expense.amount }));

export const selectIncomesNamesForCircular = (state: { calculateSlice: { incomes: Transaction[] } }) =>
  state.calculateSlice.incomes.map((income) => incomeCategories.find((cat) => cat.value === income.category)?.label || '');

export const selectExpenseNamesForCircular = (state: { calculateSlice: { expenses: Transaction[] } }) =>
  state.calculateSlice.expenses.map((expense) => expenseCategories.find((cat) => cat.value === expense.category)?.label || '');

// Улучшение типов в selectDiff
export const selectDiff = createSelector(
  (state: { calculateSlice: FinanceState }) => [...state.calculateSlice.incomes, ...state.calculateSlice.expenses],
  (transactions: Transaction[]) => {
      transactions.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

      let balance = 0;
      let result: { x: string; y: number }[] = [];

      transactions.forEach((transaction) => {
          if (transaction.type === "Доход") {
              balance += transaction.amount;
          } else if (transaction.type === 'Расход') {
              balance -= transaction.amount;
          }

          let transactionResult = {
              x: transaction.date,
              y: balance,
          };

          result.push(transactionResult);
      });

      console.log(result);
      return result;
  }
);

export const editingTransaction = (state: { calculateSlice: { editingTransaction: Transaction | null } }) =>
  state.calculateSlice.editingTransaction;

export default financeSlice.reducer;
