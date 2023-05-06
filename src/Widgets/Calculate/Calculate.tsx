import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense, addIncome } from './CalculateSlice';
import {Select, TextInput, Button, Autocomplete} from '@mantine/core';
import { nanoid } from '@reduxjs/toolkit'
// import { useMantineTheme } from '@mantine/core';
import {DatePicker} from "@mantine/dates";

const categories = [
    { label: 'Salary', value: 'salary', type: 'income' },
    { label: 'Dividends', value: 'dividends', type: 'income' },
    { label: 'Rental Income', value: 'rental', type: 'income' },
    { label: 'Investments', value: 'investments', type: 'income' },
    { label: 'Groceries', value: 'groceries', type: 'expense' },
    { label: 'Eating Out', value: 'eating-out', type: 'expense' },
    { label: 'Rent', value: 'rent', type: 'expense' },
    { label: 'Mortgage', value: 'mortgage', type: 'expense' },
    { label: 'Utilities', value: 'utilities', type: 'expense' },
    { label: 'Phone', value: 'phone', type: 'expense' },
    { label: 'Internet', value: 'internet', type: 'expense' },
    { label: 'Transportation', value: 'transportation', type: 'expense' },
    { label: 'Gas', value: 'gas', type: 'expense' },
    { label: 'Car Payment', value: 'car-payment', type: 'expense' },
    { label: 'Insurance', value: 'insurance', type: 'expense' },
    { label: 'Entertainment', value: 'entertainment', type: 'expense' },
    { label: 'Travel', value: 'travel', type: 'expense' },
    { label: 'Clothing', value: 'clothing', type: 'expense' },
    { label: 'Medical', value: 'medical', type: 'expense' },
    { label: 'Donations', value: 'donations', type: 'expense' },
];

const FinanceForm: React.FC = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [category, setCategory] = useState(categories[0].value);
    const [date, setDate] = useState<Date | null>(new Date());
    const [amount, setAmount] = useState('');
    // const theme = useMantineTheme();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const financeItem = {
            id: nanoid(),
            name,
            category,
            type: categories.find(e => e.value === category)?.type,
            date: date?.toISOString() ?? '',
            amount: parseFloat(amount),
        };

        if (financeItem.type === 'income') {
            dispatch(addIncome(financeItem));
        } else {
            dispatch(addExpense(financeItem));
        }

        setName('');
        setCategory(categories[0].value);
        setDate(new Date());
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                required
                label="Name"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
            />
            <Select
                required
                label="Category"
                placeholder="Select category"
                data={categories}
                value={category}
                onChange={(value: any) => setCategory(value)}
            />
            <DatePicker
                contextMenu="Date"
                placeholder="Select date"
                value={date}
                onChange={(value) => setDate(value as Date)}
            />
            <TextInput
                required
                label="Amount"
                type="number"
                min={0}
                step={0.01}
                value={amount}
                onChange={(event) => setAmount(event.currentTarget.value)}
            />
            <Button
                type='submit'
                variant="outline"
                color="blue"
                disabled={!name || !category || !date || !amount}
            >
                Add
            </Button>
        </form>
    );
}

export default FinanceForm;

