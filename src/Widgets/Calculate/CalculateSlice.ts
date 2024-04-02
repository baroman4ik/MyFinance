import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {expenseCategories, incomeCategories} from './Calculate';
import {SeriesType} from "../../Features/Expenses&IncomeChart/ExpensesChart";
import {Account, AccountsState} from "../Accounts/AccountsSlice";

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
  incomes: [],
  expenses: [],
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
      console.log(action)
      if (!state.incomes.find(el => el.id === action.payload.id)) {
        const newArr = [...state.incomes, action.payload]
        localStorage.setItem("income", JSON.stringify(newArr))
        state.incomes = newArr;

      }
    },
    addExpense: (state, action: PayloadAction<Transaction>) => {
      if (!state.expenses.find(el => el.id === action.payload.id)) {
        const newArr = [...state.expenses, action.payload]
        localStorage.setItem("expense", JSON.stringify(newArr))
        state.expenses = newArr;
      }
    },
    deleteIncome: (state, action: PayloadAction<string>) => {
      const newArr = state.incomes.filter((el) => el.id !== action.payload)
      localStorage.setItem("income", JSON.stringify(newArr))
      state.incomes = newArr;
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      const newArr = state.expenses.filter((el) => el.id !== action.payload)
      localStorage.setItem("expense", JSON.stringify(newArr))
      state.expenses = newArr;
    },
    deleteByAccount: (state, action: PayloadAction<Account>) => {
      const newExp = state.expenses.filter((el) => el.account !== action.payload.id)
      localStorage.setItem("expense", JSON.stringify(newExp))
      state.expenses = newExp;


      const newArr = state.incomes.filter((el) => el.account !== action.payload.id)
      localStorage.setItem("income", JSON.stringify(newArr))
      state.incomes = newArr;
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
      console.log(action.payload)
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
  editTransaction,
  deleteByAccount
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

    console.log(incomes)
    console.log(accounts)
    console.log(accountBalances)

    return accountBalances;
  }
);

//Не помню что это и надо ли это ещё
function filterByCategory(incomes: Transaction[], period: tPeriod): Transaction[] {
  // @ts-ignore
  if (period[1] > 1) {
    const periodLengths = {
      'day': 10,
      'month': 7,
      'year': 4,
      'time': 15,
    };
    const minPer = period[0]
    const maxPer = period[1]
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
