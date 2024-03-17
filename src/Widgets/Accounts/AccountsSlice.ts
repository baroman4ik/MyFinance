import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../../Shared/Redux/store";


export interface Account {
  id: string;
  name: string;
  number: string;
  date: string;
  prevBalance: number
}

export interface AccountsState {
  accounts: Account[];
  fields: {
    number: string;
    date: string;
    name: string;
    prevBalance: number;
  };
  showAddAccountModal: boolean;
}

const initialFields = () => (
  {
    number: '',
    date: '',
    name: '',
    prevBalance: 0
  }
)

const initialState: AccountsState = {
  accounts: [
    {
      id: "1",
      name: "Наличка",
      number: '',
      date: 'infinity',
      prevBalance: 200
    },
    {
      id: "2",
      name: "Карта Настарт",
      number: '1234 4531 5433 2634',
      date: '10.12.2036',
      prevBalance: 1000
    }
  ],
  fields: initialFields(),
  showAddAccountModal: false
};


export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccountField: (state, action: PayloadAction<{ field: string; value: string | number }>) => {
      state.fields = {...state.fields, [action.payload.field]: action.payload.value};
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    toggleAddAccountModal: (state, action: PayloadAction<boolean>) => {
      state.showAddAccountModal = action.payload;
    },
    clearFields: (state) => {
      state.fields = initialFields();
    },
  }
});


//Селектор счетов Для селекта В форме добавления
export const selectAccountsForCalculate = (state: {
  accounts: { accounts: Account[] }
}) => state.accounts.accounts.map(card => ({label: card.name, value: card.id}))


export const {setAccountField, addAccount, toggleAddAccountModal} = accountsSlice.actions;

export const selectAccountFields = (state: RootState) => state.accounts.fields;

export const selectAccounts = (state: RootState) => state.accounts.accounts;

export const selectShowAddAccountModal = (state: RootState) => state.accounts.showAddAccountModal;

export default accountsSlice.reducer;
