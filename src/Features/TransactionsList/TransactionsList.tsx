import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectTransactions,
    Transaction,
    setEditingTransaction, deleteExpense, deleteIncome
} from '../../Widgets/Calculate/CalculateSlice';
import { Button, Text, Group } from '@mantine/core';
import './TransactionsStyles.css'

const TransactionsList: React.FC = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(selectTransactions);
    console.log(transactions)
    const handleDelete = (transaction: Transaction) => {
        console.log(transaction)
        transaction.type === 'income' ?
        dispatch(deleteIncome(transaction.id)) :
        dispatch(deleteExpense(transaction.id))
    };

    function onClickEdit(transaction: Transaction) {
        dispatch(setEditingTransaction(transaction));
    }

    return (
        <div className='transactions_block'>
            <h3>Операции на счёте</h3>
            <div className="transactions_container">
                {transactions.map((transaction) => (
                  <div className={`transaction ${transaction.type === "income" ? 'green' : 'red'}`} key={transaction.id}>
                      <Text align={"center"} size={"xl"}>{transaction.name}</Text>
                      <Text>Категория: {transaction.category}</Text>
                      <Text>Дата: {transaction.date}</Text>
                      <Text style={{marginBottom: "10px"}}>Сумма: {transaction.amount}</Text>
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
                            onClick={() => handleDelete(transaction)}
                          >
                              Delete
                          </Button>
                      </Group>
                  </div>
                ))}
            </div>
        </div>

    );
};

export default TransactionsList;
