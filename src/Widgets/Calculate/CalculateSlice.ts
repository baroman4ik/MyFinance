import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {expenseCategories, incomeCategories} from './Calculate';

interface FinanceState {
    incomes: Transaction[];
    expenses: Transaction[];
    editingTransaction: Transaction | null;
    accounts?: Account[]
}

export interface Transaction {
    amount: number;
    category: string;
    date: string;
    id: string;
    name: string;
    type: TransTypes;
    account?: string
}

export interface Account {
    id: string;
    name: string;
    number: string;
    date: string;
}

export type TransTypes = "Расход" | "Доход";

const initialState: FinanceState = {
    incomes: [],
    expenses: [],
    editingTransaction: null,
    accounts: [{
        id: "1",
        name: "Наличка",
        number: '',
        date: ''
    }, {
        id: "2",
        name: "Карта Настарт",
        number: '1234 4531 5433 2634',
        date: '10.12.2036'
    }]
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
function groupByCategory(incomes: Transaction[]): Transaction[] {
    const grouped = new Map<string, Transaction>();
    for (const income of incomes) {
        const category = income.category;
        const amount = income.amount;
        if (grouped.has(category)) {
            const existingIncome = grouped.get(category)!;
            existingIncome.amount += amount;
        } else {
            grouped.set(category, { ...income });
        }
    }
    return Array.from(grouped.values());
}

export const selectIncomesByCategory = (state: { calculateSlice: { incomes: Transaction[] } }) => groupByCategory(state.calculateSlice.incomes).map((income) => ({x: income.date, y: income.amount}))


export const selectExpense = (state: { calculateSlice: { expenses: Transaction[] } }) =>
  state.calculateSlice.expenses.map((expense) => ({ x: expense.date, y: expense.amount }));

export const selectExpenseByCategory = (state: { calculateSlice: { expenses: Transaction[] } }) => groupByCategory(state.calculateSlice.expenses).map((expense) => ({x: expense.date, y: expense.amount}))


export const selectAccounts = (state: { calculateSlice: { accounts: Account[] } }) => state.calculateSlice.accounts


export const selectAccountsForCalculate = (state: { calculateSlice: { accounts: Account[] } }) => state.calculateSlice.accounts.map(card =>( {label: card.name, value: card.id}))


export const selectIncomesNamesForCircular = (state: { calculateSlice: { incomes: Transaction[] } }) =>
  state.calculateSlice.incomes.map((income) => incomeCategories.find((cat) => cat.value === income.category)?.label || '').filter((value, index, self) => {
      return self.indexOf(value) === index;
  });

export const selectExpenseNamesForCircular = (state: { calculateSlice: { expenses: Transaction[] } }) =>
  state.calculateSlice.expenses.map((expense) => expenseCategories.find((cat) => cat.value === expense.category)?.label || '').filter((value, index, self) => {
    return self.indexOf(value) === index;
});

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
