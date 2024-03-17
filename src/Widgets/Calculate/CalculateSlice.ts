import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {expenseCategories, incomeCategories} from './Calculate';
import {SeriesType} from "../../Features/Expenses&IncomeChart/ExpensesChart";
import {AccountsState} from "../Accounts/AccountsSlice";

interface FinanceState {
  incomes: Transaction[];
  expenses: Transaction[];
  editingTransaction: Transaction | null;
  groupBy: tGroupBy;
  period: tPeriod;
  seriesType: SeriesType;
  filterableCategories: { label: string; value: string }[],
  fields: Fields

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

export interface Fields {
  type: TransTypes,
  activeCard: string | undefined,
  name: string,
  date: Date | null,
  amount: string,
  category: string
}


export type TransTypes = "Расход" | "Доход";

export type tGroupBy = "time" | "day" | "month" | "year";

export type tPeriod = [Date | null, Date | null];

const initialFields = (): Fields => ({
  type: "Доход",
  activeCard: '1',
  name: '',
  date: new Date(),
  amount: '',
  category: ''
})
const initialState: FinanceState = {
  incomes: [
    {
      id: "1",
      name: "Зарплата ноябрь",
      category: "salary",
      type: "Доход",
      date: "2023-11-15T18:00:43.057Z",
      amount: 4000,
      account: "2"
    },
    {
      id: "2",
      name: "Дивиденды по инвестициям",
      category: "dividends",
      type: "Доход",
      date: "2024-03-20T19:00:43.057Z",
      amount: 1500,
      account: "1"
    },
    {
      id: "3",
      name: "Арендная плата за декабрь",
      category: "rental",
      type: "Доход",
      date: "2023-12-05T20:00:43.057Z",
      amount: 2000,
      account: "1"
    },
    {
      id: "4",
      name: "Дивиденды по акциям",
      category: "investments",
      type: "Доход",
      date: "2023-12-10T21:00:43.057Z",
      amount: 2500,
      account: "1"
    },
    {
      id: "5",
      name: "Фриланс-работа",
      category: "freelance",
      type: "Доход",
      date: "2023-12-15T22:00:43.057Z",
      amount: 3000,
      account: "1"
    },
    {
      id: "6",
      name: "Работа по совместительству",
      category: "part-time",
      type: "Доход",
      date: "2023-12-20T23:00:43.057Z",
      amount: 3500,
      account: "2"
    },
    {
      id: "7",
      name: "Годовой бонус",
      category: "bonus",
      type: "Доход",
      date: "2023-12-25T00:00:43.057Z",
      amount: 5000,
      account: "1"
    },
    {
      id: "8",
      name: "Пенсионные накопления",
      category: "pension",
      type: "Доход",
      date: "2023-12-28T01:00:43.057Z",
      amount: 4500,
      account: "1"
    },
    {
      id: "9",
      name: "Подарок от родственников",
      category: "gift",
      type: "Доход",
      date: "2023-12-05T02:00:43.057Z",
      amount: 6000,
      account: "1"
    },
    {
      id: "10",
      name: "Дополнительная зарплата декабрь",
      category: "salary",
      type: "Доход",
      date: "2023-12-10T03:00:43.057Z",
      amount: 5500,
      account: "1"
    },
    {
      id: "11",
      name: "Бонус за результаты года",
      category: "bonus",
      type: "Доход",
      date: "2023-12-15T04:00:43.057Z",
      amount: 6000,
      account: "1"
    },
  ],
  expenses: [
    {
      id: "12",
      name: "Покупки в магазине",
      category: "groceries",
      type: "Расход",
      date: "2023-11-18T18:00:43.057Z",
      amount: 1200,
      account: "1"
    },
    {
      id: "13",
      name: "Посещение ресторана",
      category: "eating-out",
      type: "Расход",
      date: "2023-11-25T19:00:43.057Z",
      amount: 1100,
      account: "1"
    },
    {
      id: "14",
      name: "Аренда жилья за декабрь",
      category: "rent",
      type: "Расход",
      date: "2023-12-08T20:00:43.057Z",
      amount: 1000,
      account: "2"
    },
    {
      id: "15",
      name: "Ипотека",
      category: "mortgage",
      type: "Расход",
      date: "2023-12-15T21:00:43.057Z",
      amount: 900,
      account: "1"
    },
    {
      id: "16",
      name: "Коммунальные услуги",
      category: "utilities",
      type: "Расход",
      date: "2023-12-22T22:00:43.057Z",
      amount: 800,
      account: "1"
    },
    {
      id: "17",
      name: "Телефон",
      category: "phone",
      type: "Расход",
      date: "2023-12-29T23:00:43.057Z",
      amount: 700,
      account: "1"
    },
    {
      id: "18",
      name: "Подписка на интернет",
      category: "internet",
      type: "Расход",
      date: "2023-12-10T00:00:43.057Z",
      amount: 600,
      account: "1"
    },
    {
      id: "19",
      name: "Общественный транспорт",
      category: "transportation",
      type: "Расход",
      date: "2023-12-15T01:00:43.057Z",
      amount: 500,
      account: "1"
    },
    {
      id: "20",
      name: "Бензин",
      category: "gas",
      type: "Расход",
      date: "2024-03-20T02:00:43.057Z",
      amount: 400,
      account: "1"
    },
    {
      id: "21",
      name: "Платеж по автокредиту",
      category: "car-payment",
      type: "Расход",
      date: "2023-12-25T03:00:43.057Z",
      amount: 300,
      account: "1"
    },
    {
      id: "22",
      name: "Развлечения на новый год",
      category: "entertainment",
      type: "Расход",
      date: "2023-12-31T04:00:43.057Z",
      amount: 200,
      account: "1"
    },
  ],
  editingTransaction: null,
  groupBy: "day",
  period: [null, null],
  seriesType: "income",
  filterableCategories: [],
  fields: initialFields()
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
    setGroup: (state, action: PayloadAction<tGroupBy>) => {
      state.groupBy = action.payload;
    },
    setSeriesType: (state, action: PayloadAction<SeriesType>) => {
      state.seriesType = action.payload;
    },
    setPeriod: (state, action: PayloadAction<tPeriod>) => {
      state.period = action.payload;
    },

    setAmount: (state, action: PayloadAction<string>) => {
      state.fields.amount = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.fields.name = action.payload;
    },
    setActiveCard: (state, action: PayloadAction<string>) => {
      state.fields.activeCard = action.payload;
    },
    setType: (state, action: PayloadAction<TransTypes>) => {
      state.fields.type = action.payload;
    },
    setDate: (state, action: PayloadAction<Date | null>) => {
      state.fields.date = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.fields.category = action.payload;
    },
    clearFields: (state) => {
      state.fields = initialFields()
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      state.fields = {
        ...state.fields,
        name: action.payload.name,
        type: action.payload.type,
        date: new Date(action.payload.date),
        amount: action.payload.amount.toString(),
        activeCard: action.payload.account,
        category: action.payload.category
      }

    },
  },
});

export const {
  addIncome,
  addExpense,
  deleteExpense,
  deleteIncome,
  setGroup,
  setSeriesType,
  setPeriod,
  setAmount,
  setDate,
  setName,
  setActiveCard,
  setType,
  setCategory,
  clearFields,
  editTransaction
} = financeSlice.actions;

// Оптимизация selectTransactions с использованием деструктуризации
export const selectTransactions = createSelector(
  (state: { calculateSlice: FinanceState }) => [...state.calculateSlice.incomes, ...state.calculateSlice.expenses],
  (transactions: Transaction[]) =>
    transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);

// Базовый селектор для вывода всех отфильтрованных доходов
export const selectIncomes = (state: { calculateSlice: { incomes: Transaction[], period: tPeriod } }) =>
  filterByPeriod(state.calculateSlice.incomes, state.calculateSlice.period)
    .map((income) => ({
      x: income.date,
      y: income.amount
    }));

// Базовый селектор для вывода всех отфильтрованных Расходов
export const selectExpense = (state: { calculateSlice: { expenses: Transaction[], period: tPeriod } }) =>
  filterByPeriod(state.calculateSlice.expenses, state.calculateSlice.period)
    .map((expense) => ({
      x: expense.date,
      y: expense.amount
    }));

// Функция фильтрации Транзакций по категориям
function groupByCategory(incomes: Transaction[]): Transaction[] {
  const grouped = new Map<string, Transaction>();
  for (const income of incomes) {
    const category = income.category;
    const amount = income.amount;
    if (grouped.has(category)) {
      const existingIncome = grouped.get(category)!;
      existingIncome.amount += amount;
    } else {
      grouped.set(category, {...income});
    }
  }
  return Array.from(grouped.values());
}

// Функция фильтрации По дням Месяцам Годам И времени

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
      grouped.set(date, {...income});
    }
  }
  return Array.from(grouped.values());
}

// Селектор Который возвращает объект где ключ это ID Счёта А значение Это сумма расходов и доходов связанных с со счётом
export const AccountsBalanceSelector = createSelector(
  (state: { calculateSlice: FinanceState; accounts: AccountsState }) => state,
  ({calculateSlice, accounts}) => {
    const {incomes, expenses} = calculateSlice;
    const accountBalances: { [accountId: string]: number } = {};

    incomes.forEach(income => {
      if (income.account) {
        const account = accounts.accounts.find(acc => acc.id === income.account);
        if (account) {
          accountBalances[income.account] = (accountBalances[income.account] || 0) + income.amount;
        }
      }
    });

    expenses.forEach(expense => {
      if (expense.account) {
        const account = accounts.accounts.find(acc => acc.id === expense.account);
        if (account) {
          accountBalances[expense.account] = (accountBalances[expense.account] || 0) - expense.amount;
        }
      }
    });

    return accountBalances;
  }
);

//Не помню что это и надо ли это ещё
function filterByCategory(incomes: Transaction[], period: tPeriod): Transaction[] {
  // @ts-ignore
  if (period[1] > 1) {
    console.log()
    const periodLengths = {
      'day': 10,
      'month': 7,
      'year': 4,
      'time': 15,
    };
    const minPer = period[0]
    const maxPer = period[1]
    console.log()
    // @ts-ignore

    const newArr = incomes.filter((i) => minPer?.getTime() < Date.parse(i.date) && Date.parse(i.date) < maxPer?.getTime())
    return newArr

  }
  return incomes

}

//Селектор доходов по категориям
export const selectIncomesByCategory = createSelector(
  (state: { calculateSlice: FinanceState }) => state.calculateSlice,
  (financeState: FinanceState) => {
    const filteredIncomes = filterByPeriod(financeState.incomes, financeState.period);
    return groupByCategory(filteredIncomes).map((income) => ({x: income.category, y: income.amount}));
  }
);

const filterByPeriod = (transactions: Transaction[], period: tPeriod): Transaction[] => {
  const [startDate, endDate] = period;
  if (!startDate || !endDate) return transactions;
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};

// Селектор для расходов с учетом Фильтра периода для основного графика
export const selectExpensePerGroup = createSelector(
  (state: { calculateSlice: FinanceState }) => state.calculateSlice,
  (financeState: FinanceState) => {
    const filteredExpenses = filterByPeriod(financeState.expenses, financeState.period);
    // Оставшаяся часть селектора
    return groupByDay(filteredExpenses, financeState.groupBy).map(expense => ({
      x: expense.date,
      y: expense.amount
    }));
  }
);

// Селектор для доходов с учетом Фильтра периода для основного графика
export const selectIncomePerGroup = createSelector(
  (state: { calculateSlice: FinanceState }) => state.calculateSlice,
  (financeState: FinanceState) => {
    const filteredIncomes = filterByPeriod(financeState.incomes, financeState.period);
    return groupByDay(filteredIncomes, financeState.groupBy).map(income => ({
      x: income.date,
      y: income.amount
    }));
  }
);

//Селектор Расходов по категориям
export const selectExpenseByCategory = createSelector(
  (state: { calculateSlice: FinanceState }) => state.calculateSlice,
  (financeState: FinanceState) => {
    const filteredExpenses = filterByPeriod(financeState.expenses, financeState.period);
    return groupByCategory(filteredExpenses).map(expense => ({x: expense.date, y: expense.amount}));
  }
);

export const selectGroupByValue = (state: { calculateSlice: FinanceState }) => state.calculateSlice.groupBy || "day"
export const selectSeriesType = (state: { calculateSlice: FinanceState }) => state.calculateSlice.seriesType
export const selectPeriod = (state: { calculateSlice: FinanceState }) => state.calculateSlice.period


//Селектор всех Полей для формы
export const selectFields = (state: {
  calculateSlice: {
    fields: Fields
  }
}) => state.calculateSlice.fields

//Селектор всех Наименований Категорий доходов. Нужно переделать!!!
export const selectIncomesNamesForCircular = createSelector(
  (state: { calculateSlice: FinanceState }) => state.calculateSlice,
  (financeState: FinanceState) => {
    const filteredIncomes = filterByPeriod(financeState.incomes, financeState.period);
    return filteredIncomes
      .map((income) => incomeCategories.find((cat) => cat.value === income.category)?.label || '')
      .filter((value, index, self) => self.indexOf(value) === index);
  }
);


//Селектор всех Наименований Категорий Расходов. Нужно переделать!!!
export const selectExpenseNamesForCircular = createSelector(
  (state: { calculateSlice: FinanceState }) => state.calculateSlice,
  (financeState: FinanceState) => {
    const filteredExpenses = filterByPeriod(financeState.expenses, financeState.period);
    return filteredExpenses
      .map((expense) => expenseCategories.find((cat) => cat.value === expense.category)?.label || '')
      .filter((value, index, self) => self.indexOf(value) === index);
  }
);


//Селектор Разница доходов и расходов.
// TODO: Неправильно берет остаток

export const selectDiff = createSelector(
  (state: { calculateSlice: FinanceState }) => state.calculateSlice,
  (financeState: FinanceState) => {
    const transactions = filterByPeriod([...financeState.incomes, ...financeState.expenses], financeState.period);
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


export default financeSlice.reducer;
