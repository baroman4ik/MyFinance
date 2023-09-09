import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

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
    type: TransTypes
}

export type TransTypes = 'income' | 'expense'

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

        deleteIncome(state, action: PayloadAction<string>) {
            state.incomes = state.incomes.filter(el => el.id !== action.payload);
        },
        deleteExpense(state, action: PayloadAction<string>) {
            state.expenses = state.expenses.filter(el => el.id !== action.payload);

        },
        setEditingTransaction(state, action: PayloadAction<Transaction | null>) {
            state.editingTransaction = action.payload;
        },

    },
});

export const { addIncome, addExpense, deleteExpense, deleteIncome, setEditingTransaction } = financeSlice.actions;

export const selectTransactions = createSelector(
    (state: { calculateSlice: FinanceState }) => state.calculateSlice.incomes.concat(state.calculateSlice.expenses),
    (transactions: Transaction[]) =>
        transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);

export const selectIncomes = (state: { calculateSlice: { incomes: Transaction[]; }; }) => state.calculateSlice.incomes.map((income) => ({
    x: income.date,
    y: income.amount
}))
export const selectExpense = (state: { calculateSlice: { expenses: Transaction[]; }; }) => state.calculateSlice.expenses.map((income) => ({
    x: income.date,
    y: income.amount
}))

export const selectDiff = createSelector(
  (state: { calculateSlice: FinanceState }) => state.calculateSlice.incomes.concat(state.calculateSlice.expenses),
  (transactions: Transaction[]) => {
      transactions.sort(function(a, b) {
          return Date.parse(a.date) - Date.parse(b.date);
      });

      let balance = 0;
      let result: any = [];

// Расчет баланса и формирование результата
      transactions.forEach(function(transaction) {
          if (transaction.type === 'income') {
              balance += parseFloat(transaction.name);
          } else if (transaction.type === 'expense') {
              balance -= parseFloat(transaction.name);
          }

          let transactionResult = {
              x: transaction.date,
              y: balance
          };

          result.push(transactionResult);
      });
      console.log(result)
      return result
  }

);
export const editingTransaction = (state: { calculateSlice: { editingTransaction: Transaction | null; }; }) => state.calculateSlice.editingTransaction;

export default financeSlice.reducer;



