import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../Shared/Redux/store';

export interface Account {
  id: string;
  name: string;
  number: string;
  date: string;
  prevBalance: number;
}

export interface AccountsState {
  accounts: Account[];
  fields: Account
  showAddAccountModal: boolean;
}

const initialFields = () => ({
  number: '',
  date: '',
  name: '',
  prevBalance: 0,
  id: nanoid()
});

const initialState: AccountsState = {
  accounts: [
    {
      id: "1",
      name: "Наличка",
      number: '',
      date: 'infinity',
      prevBalance: 200
    }
  ],
  fields: initialFields(),
  showAddAccountModal: false,
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccountField: (state, action: PayloadAction<{ field: string; value: string | number }>) => {
      state.fields = {...state.fields, [action.payload.field]: action.payload.value};
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      if (!state.accounts.find(el => el.id === action.payload.id)) {
        const newArr = [...state.accounts, action.payload]
        localStorage.setItem("account", JSON.stringify(newArr))
        state.accounts = newArr
      }
    },
    removeAccount: (state, action: PayloadAction<Account>) => {
      if (action.payload.id === "1") return state
      const newArr = state.accounts.filter((el: Account) => el.id !== action.payload.id)
      localStorage.setItem("account", JSON.stringify(newArr))
      state.accounts = newArr;
    },
    toggleAddAccountModal: (state, action: PayloadAction<boolean>) => {
      state.showAddAccountModal = action.payload;
    },
    clearFields: (state) => {
      state.fields = initialFields();
    },
  },
});


//Селектор счетов Для селекта В форме добавления
export const selectAccountsForCalculate = (state: {
  accounts: { accounts: Account[] }
}) => state.accounts.accounts.map(card => ({label: card.name, value: card.id}))


export const {setAccountField, removeAccount, addAccount, toggleAddAccountModal} = accountsSlice.actions;

export const selectAccountFields = (state: RootState) => state.accounts.fields;

export const selectAccounts = (state: RootState) => state.accounts.accounts;

export const selectShowAddAccountModal = (state: RootState) => state.accounts.showAddAccountModal;

export default accountsSlice.reducer;
