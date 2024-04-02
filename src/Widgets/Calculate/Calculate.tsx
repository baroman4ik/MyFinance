import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addExpense,
  addIncome,
  clearFields,
  selectFields,
  setActiveCard,
  setAmount,
  setCategory,
  setDate,
  setName,
  setType,
  Transaction,
  TransTypes
} from './CalculateSlice';
import {Button, SegmentedControl, Select, TextInput} from '@mantine/core';
import {nanoid} from '@reduxjs/toolkit'
import {DatePickerInput} from "@mantine/dates";
import './CalculateStyles.css'
import {selectAccountsForCalculate} from "../Accounts/AccountsSlice";

export const incomeCategories: { label: string; value: string }[] = [
  {label: 'Зарплата', value: 'salary'},
  {label: 'Дивиденды', value: 'dividends'},
  {label: 'Арендный доход', value: 'rental'},
  {label: 'Инвестиции', value: 'investments'},
  {label: 'Фриланс', value: 'freelance'},
  {label: 'Подработка', value: 'part-time'},
  {label: 'Бонус', value: 'bonus'},
  {label: 'Пенсия', value: 'pension'},
  {label: 'Подарок', value: 'gift'},
  {label: 'Другой доход', value: 'otherInc'},

];

export const expenseCategories: { label: string; value: string }[] = [
  {label: 'Продукты', value: 'groceries'},
  {label: 'Питание вне дома', value: 'eating-out'},
  {label: 'Аренда', value: 'rent'},
  {label: 'Ипотека', value: 'mortgage'},
  {label: 'Коммунальные услуги', value: 'utilities'},
  {label: 'Телефон', value: 'phone'},
  {label: 'Интернет', value: 'internet'},
  {label: 'Транспорт', value: 'transportation'},
  {label: 'Топливо', value: 'gas'},
  {label: 'Платеж по автокредиту', value: 'car-payment'},
  {label: 'Страховка', value: 'insurance'},
  {label: 'Развлечения', value: 'entertainment'},
  {label: 'Путешествия', value: 'travel'},
  {label: 'Одежда', value: 'clothing'},
  {label: 'Медицина', value: 'medical'},
  {label: 'Пожертвования', value: 'donations'},
  {label: 'Спорт', value: 'sports'},
  {label: 'Хобби', value: 'hobbies'},
  {label: 'Техника', value: 'electronics'},
  {label: 'Образование', value: 'education'},
  {label: 'Другой расход', value: 'otherExp'},
];

const FinanceForm: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    const localIncomes = localStorage.getItem("income")
    if (localIncomes) JSON.parse(localIncomes).forEach((el: Transaction) =>
      dispatch(addIncome(el))
    )
    const localExpenses = localStorage.getItem("expense")
    if (localExpenses) JSON.parse(localExpenses).forEach((el: Transaction) =>
      dispatch(addExpense(el))
    )

  }, []);

  const accounts = useSelector(selectAccountsForCalculate);
  const {type, activeCard, name, date, amount, category} = useSelector(selectFields);


  const activeCategories = type === "Доход" ? incomeCategories : expenseCategories;

  useEffect(() => {
    dispatch(setCategory(activeCategories[0].value))
  }, [type])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const financeItem: Transaction = {
      id: nanoid(),
      name,
      category,
      type,
      date: date?.toISOString() ?? '',
      amount: parseFloat(amount),
      account: activeCard
    };

    if (financeItem.type === "Доход") {
      dispatch(addIncome(financeItem));
    } else {
      dispatch(addExpense(financeItem));
    }
    dispatch(clearFields())
    dispatch(setCategory(activeCategories[0].value))
  };

  return (
    <form onSubmit={handleSubmit} className="calculate_form">


      <SegmentedControl
        aria-placeholder="Укажите тип операции"
        onChange={(event: TransTypes) => dispatch(setType(event))}
        defaultValue={'Доход'}
        data={['Доход', 'Расход']}
        radius="lg"
        size="sm"
      />

      <Select
        className="calculate_element"
        required
        label="Категория"
        placeholder="Укажите категорию операции"
        data={activeCategories}
        value={category}
        onChange={(value: any) => dispatch(setCategory(value))}
      />

      <Select
        className="calculate_element"
        required
        label="Счёт"
        placeholder="Выберите счёт"
        data={accounts}
        value={activeCard}
        onChange={(value: any) => dispatch(setActiveCard(value))}
      />

      <TextInput
        className="calculate_element"
        required
        label="Сумма"
        type="number"
        placeholder="Введите сумму операции"
        min={1}
        step={1}
        value={amount}
        defaultValue={0}
        onChange={(event) => dispatch(setAmount(event.currentTarget.value))}
      />

      <TextInput
        className="calculate_element"
        required
        label="Название"
        placeholder="Введите название операции"
        value={name}
        onChange={(event) => dispatch(setName(event.currentTarget.value))}
      />


      <DatePickerInput
        className="calculate_element"
        label="Дата операции"
        required
        aria-placeholder="Введите дату операции"
        contextMenu="Date"
        value={date}
        valueFormat="DD MMMM YYYY"
        onChange={(value: Date) => dispatch(setDate(value as Date))}
      />


      <Button
        className="base-button"
        type='submit'
        variant="filled"
        color="teal"
        disabled={!name || !category || !date || !amount}
      >
        Добавить операцию
      </Button>
    </form>
  );
};

export default FinanceForm;
