import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectTransactions,
    deleteTransaction,
    Transaction,
    setEditingTransaction
} from '../../Widgets/Calculate/CalculateSlice';
import { Button, Card, Text, Group } from '@mantine/core';


const TransactionsList: React.FC = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(selectTransactions);

    const handleDelete = (id: string) => {
        dispatch(deleteTransaction(id));
    };

    function onClickEdit(transaction: Transaction) {
        dispatch(setEditingTransaction(transaction));
    }

    return (
        <>
            {transactions.map((transaction) => (
                <Card key={transaction.id}>
                    <Text>{transaction.name}</Text>
                    <Text>{transaction.category}</Text>
                    <Text>{transaction.date}</Text>
                    <Text>{transaction.amount}</Text>
                    <Group>
                        <Button
                            variant="outline"
                            onClick={() => onClickEdit(transaction)}
                        >
                            Edit
                        </Button>
                        <Button
                            color="red"
                            variant="outline"
                            onClick={() => handleDelete(transaction.id)}
                        >
                            Delete
                        </Button>
                    </Group>
                </Card>
            ))}
        </>
    );
};

export default TransactionsList;
