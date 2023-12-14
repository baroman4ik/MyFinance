import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {addExpense, addIncome, Transaction, TransTypes} from './CalculateSlice';
import {Select, TextInput, Button} from '@mantine/core';
import { nanoid } from '@reduxjs/toolkit'
import {DatePicker} from "@mantine/dates";
import './CalculateStyles.css'

export const incomeCategories: { label: string; value: string }[] = [
    { label: 'Зарплата', value: 'salary' },
    { label: 'Дивиденды', value: 'dividends' },
    { label: 'Арендный доход', value: 'rental' },
    { label: 'Инвестиции', value: 'investments' },
    { label: 'Фриланс', value: 'freelance' },
    { label: 'Подработка', value: 'part-time' },
    { label: 'Бонус', value: 'bonus' },
    { label: 'Пенсия', value: 'pension' },
    { label: 'Подарок', value: 'gift' },
];

export const expenseCategories: { label: string; value: string }[] = [
    { label: 'Продукты', value: 'groceries' },
    { label: 'Питание вне дома', value: 'eating-out' },
    { label: 'Аренда', value: 'rent' },
    { label: 'Ипотека', value: 'mortgage' },
    { label: 'Коммунальные услуги', value: 'utilities' },
    { label: 'Телефон', value: 'phone' },
    { label: 'Интернет', value: 'internet' },
    { label: 'Транспорт', value: 'transportation' },
    { label: 'Топливо', value: 'gas' },
    { label: 'Платеж по автокредиту', value: 'car-payment' },
    { label: 'Страховка', value: 'insurance' },
    { label: 'Развлечения', value: 'entertainment' },
    { label: 'Путешествия', value: 'travel' },
    { label: 'Одежда', value: 'clothing' },
    { label: 'Медицина', value: 'medical' },
    { label: 'Пожертвования', value: 'donations' },
    { label: 'Спорт', value: 'sports' },
    { label: 'Хобби', value: 'hobbies' },
    { label: 'Техника', value: 'electronics' },
    { label: 'Образование', value: 'education' },
];

const FinanceForm: React.FC = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState<TransTypes>("Доход");
    const [name, setName] = useState('');
    const [date, setDate] = useState<Date | null>(new Date());
    const [amount, setAmount] = useState('');

    const activeCategories = type === "Доход" ? incomeCategories : expenseCategories;
    const [category, setCategory] = useState(activeCategories[0].value);
useEffect(() => {
    setCategory(activeCategories[0].value)
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
        };

        if (financeItem.type === "Доход") {
            dispatch(addIncome(financeItem));
        } else {
            dispatch(addExpense(financeItem));
        }

        setName('');
        setCategory(activeCategories[0].value);
        setDate(new Date());
        setAmount('');
    };

    return (
    <form onSubmit={handleSubmit} className="calculate_form">
        <div className="base-box">
            <TextInput
              required
              label="Название"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />

            <Select
              label="Доход/Расход"

              placeholder="Enter Type"
              onChange={(event: "Расход" | "Доход") => setType(event)}

              data={['Доход', 'Расход']}
            />
            <Select
              required
              label="Категория"
              placeholder="Select category"
              data={activeCategories}
              value={category}
              onChange={(value: any) => setCategory(value)}
            />
            <TextInput
              required
              label="Сумма"
              type="number"
              min={0}
              step={0.01}
              value={amount}
              onChange={(event) => setAmount(event.currentTarget.value)}
            />
        </div>

        <DatePicker
          className="base-box"
          contextMenu="Date"
          placeholder="Select date"
          value={date}
          onChange={(value) => setDate(value as Date)}
        />


        <Button
          className="base-button"
          type='submit'
          variant="filled"
          color="teal"
          disabled={!name || !category || !date || !amount}
        >
            Добавить
        </Button>
    </form>
    );
};

export default FinanceForm;
