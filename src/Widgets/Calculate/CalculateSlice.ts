import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {expenseCategories, incomeCategories} from './Calculate';

interface FinanceState {
    incomes: Transaction[];
    expenses: Transaction[];
    editingTransaction: Transaction | null;
    accounts?: Account[];
    groupBy?: tGroupBy
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

export type tGroupBy = "time" | "day" | "month" | "year";


const initialState: FinanceState = {
    incomes: [
        { id: "1", name: "Зарплата ноябрь", category: "salary", type: "Доход", date: "2023-11-15T18:00:43.057Z", amount: 4000, account: "1" },
        { id: "2", name: "Дивиденды по инвестициям", category: "dividends", type: "Доход", date: "2023-11-20T19:00:43.057Z", amount: 1500, account: "1" },
        { id: "3", name: "Арендная плата за декабрь", category: "rental", type: "Доход", date: "2023-12-05T20:00:43.057Z", amount: 2000, account: "1" },
        { id: "4", name: "Дивиденды по акциям", category: "investments", type: "Доход", date: "2023-12-10T21:00:43.057Z", amount: 2500, account: "1" },
        { id: "5", name: "Фриланс-работа", category: "freelance", type: "Доход", date: "2023-12-15T22:00:43.057Z", amount: 3000, account: "1" },
        { id: "6", name: "Работа по совместительству", category: "part-time", type: "Доход", date: "2023-12-20T23:00:43.057Z", amount: 3500, account: "1" },
        { id: "7", name: "Годовой бонус", category: "bonus", type: "Доход", date: "2023-12-25T00:00:43.057Z", amount: 5000, account: "1" },
        { id: "8", name: "Пенсионные накопления", category: "pension", type: "Доход", date: "2023-12-28T01:00:43.057Z", amount: 4500, account: "1" },
        { id: "9", name: "Подарок от родственников", category: "gift", type: "Доход", date: "2023-12-05T02:00:43.057Z", amount: 6000, account: "1" },
        { id: "10", name: "Дополнительная зарплата декабрь", category: "salary", type: "Доход", date: "2023-12-10T03:00:43.057Z", amount: 5500, account: "1" },
        { id: "11", name: "Бонус за результаты года", category: "bonus", type: "Доход", date: "2023-12-15T04:00:43.057Z", amount: 6000, account: "1" },
    ],
    expenses: [
        { id: "12", name: "Покупки в магазине", category: "groceries", type: "Расход", date: "2023-11-18T18:00:43.057Z", amount: 1200, account: "1" },
        { id: "13", name: "Посещение ресторана", category: "eating-out", type: "Расход", date: "2023-11-25T19:00:43.057Z", amount: 1100, account: "1" },
        { id: "14", name: "Аренда жилья за декабрь", category: "rent", type: "Расход", date: "2023-12-08T20:00:43.057Z", amount: 1000, account: "1" },
        { id: "15", name: "Ипотека", category: "mortgage", type: "Расход", date: "2023-12-15T21:00:43.057Z", amount: 900, account: "1" },
        { id: "16", name: "Коммунальные услуги", category: "utilities", type: "Расход", date: "2023-12-22T22:00:43.057Z", amount: 800, account: "1" },
        { id: "17", name: "Телефон", category: "phone", type: "Расход", date: "2023-12-29T23:00:43.057Z", amount: 700, account: "1" },
        { id: "18", name: "Подписка на интернет", category: "internet", type: "Расход", date: "2023-12-10T00:00:43.057Z", amount: 600, account: "1" },
        { id: "19", name: "Общественный транспорт", category: "transportation", type: "Расход", date: "2023-12-15T01:00:43.057Z", amount: 500, account: "1" },
        { id: "20", name: "Бензин", category: "gas", type: "Расход", date: "2023-12-20T02:00:43.057Z", amount: 400, account: "1" },
        { id: "21", name: "Платеж по автокредиту", category: "car-payment", type: "Расход", date: "2023-12-25T03:00:43.057Z", amount: 300, account: "1" },
        { id: "22", name: "Развлечения на новый год", category: "entertainment", type: "Расход", date: "2023-12-31T04:00:43.057Z", amount: 200, account: "1" },
    ],
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
    }],
    groupBy: "day"
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
        setGroup: (state, action: PayloadAction<tGroupBy | undefined>) => {
            state.groupBy = action.payload;
        },
    },
});

export const {
    addIncome,
    addExpense,
    deleteExpense,
    deleteIncome,
    setEditingTransaction,
    setGroup,
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
function groupByDay(incomes: Transaction[], groupBy: tGroupBy): Transaction[] {
    const periodLengths = {
        'day': 10,
        'month': 7,
        'year': 4,
        'time': 15,
    };
    const grouped = new Map<string, Transaction>();
    for (const income of incomes) {
        const date = income.date.substring(0, periodLengths[groupBy]);
        const amount = income.amount;
        if (grouped.has(date)) {
            const existingIncome = grouped.get(date)!;
            existingIncome.amount += amount;
        } else {
            grouped.set(date, { ...income });
        }
    }
    return Array.from(grouped.values());
}



export const selectIncomesByCategory = (state: { calculateSlice: { incomes: Transaction[] } }) => groupByCategory(state.calculateSlice.incomes).map((income) => ({x: income.category, y: income.amount}))

export const selectExpensePerGroup = (state: { calculateSlice: { expenses: Transaction[], groupBy: tGroupBy } }) => groupByDay(state.calculateSlice.expenses, state.calculateSlice.groupBy).map((expense) => ({x: expense.date, y: expense.amount}))
export const selectIncomePerGroup = (state: { calculateSlice: { incomes: Transaction[], groupBy: tGroupBy } }) => groupByDay(state.calculateSlice.incomes, state.calculateSlice.groupBy).map((income) => ({x: income.date, y: income.amount}))



export const selectExpense = (state: { calculateSlice: { expenses: Transaction[] } }) =>
  state.calculateSlice.expenses.map((expense) => ({ x: expense.date, y: expense.amount }));

export const selectExpenseByCategory = (state: { calculateSlice: { expenses: Transaction[] } }) => groupByCategory(state.calculateSlice.expenses).map((expense) => ({x: expense.date, y: expense.amount}))


export const selectAccounts = (state: { calculateSlice: { accounts: Account[] } }) => state.calculateSlice.accounts

export const selectGroupByValue = (state: { calculateSlice: FinanceState }) => state.calculateSlice.groupBy || "day"


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

      return result;
  }
);

export const editingTransaction = (state: { calculateSlice: { editingTransaction: Transaction | null } }) =>
  state.calculateSlice.editingTransaction;

export default financeSlice.reducer;
