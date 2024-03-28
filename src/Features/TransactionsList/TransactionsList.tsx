import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteExpense,
  deleteIncome,
  editTransaction,
  selectExpenseByCategory,
  selectTransactions,
  Transaction
} from '../../Widgets/Calculate/CalculateSlice';
import {ActionIcon, Group, Image, Text, Tooltip} from '@mantine/core';
import './TransactionsStyles.css'
import {EditItemIcon} from "../../Shared/Icons/EditItemIcon";
import {RemoveItemIcon} from "../../Shared/Icons/RemoveItemIcon";
// @ts-ignore
import CalendarIcon from '../../Shared/Icons/calendar-svgrepo-com.svg';
// @ts-ignore
import CategoryIcon from '../../Shared/Icons/category-2-svgrepo-com (1).svg';
// @ts-ignore
import TicketIcon from '../../Shared/Icons/ticket-svgrepo-com.svg';
// @ts-ignore
import CardIcon from '../../Shared/Icons/card-svgrepo-com.svg';
// @ts-ignore
import MoneyInIcon from '../../Shared/Icons/money-recive-svgrepo-com.svg';
// @ts-ignore
import MoneyOutIcon from '../../Shared/Icons/money-send-svgrepo-com.svg';
import {expenseCategories, incomeCategories} from "../../Widgets/Calculate/Calculate";
import {selectAccounts} from "../../Widgets/Accounts/AccountsSlice";


export function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
}

const TransactionsList: React.FC = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const accounts = useSelector(selectAccounts);
  const expenseCategory = useSelector(selectExpenseByCategory);

  console.log(transactions)


  const handleDelete = (transaction: Transaction) => {
    transaction.type === "Доход" ?
      dispatch(deleteIncome(transaction.id)) :
      dispatch(deleteExpense(transaction.id))
  };

  function onClickEdit(transaction: Transaction) {
    dispatch(editTransaction(transaction));
    transaction.type === "Доход" ?
      dispatch(deleteIncome(transaction.id)) :
      dispatch(deleteExpense(transaction.id))
  }


  return (
    <div className='transactions_block'>
      <div className="transactions_container">
        {transactions.reverse().map((transaction) => (
          <div className={`transaction ${transaction.type === "Доход" ? 'green' : 'red'}`} key={transaction.id}>
            <div className="columns">
              <Text className='col_name col' align={"center"}>
                <Tooltip label={transaction.type === "Доход" ? "Пополнение счета" : "Списание со счета"} color="gray">

                  <Image
                    width={24}
                    height={24}
                    alt="asd"
                    src={transaction.type === "Доход" ? MoneyInIcon : MoneyOutIcon}/>
                </Tooltip>

                {transaction.name}

              </Text>
              <Text className='col_cat col'>
                <Tooltip label="Категория операции" color="gray">
                  <Image
                    width={24}
                    height={24}
                    alt="asd"
                    src={CategoryIcon}/>
                </Tooltip>

                {transaction.type === "Доход" ? incomeCategories.find(cat => cat.value === transaction.category)?.label : expenseCategories.find(cat => cat.value === transaction.category)?.label}
              </Text>
              <Text className='col_date col'>
                <Tooltip label="Дата операции" color="gray">
                  <Image
                    width={24}
                    height={24}
                    alt="asd"
                    src={CalendarIcon}/>
                </Tooltip>

                {formatDate(new Date(transaction.date))}
              </Text>
              <Text className='col_acc col'>
                <>
                  <Tooltip label="Счет" color="gray">
                    <Image
                      width={24}
                      height={24}
                      alt="asd"
                      src={CardIcon}/>
                  </Tooltip>

                  {accounts.find(acc => acc.id === transaction.account)?.name}
                </>
              </Text>
              <Text className='col_amount col'>
                <Tooltip label="Сумма операции" color="gray">
                  <Image
                    width={24}
                    height={24}
                    alt="asd"
                    src={TicketIcon}/>
                </Tooltip>
                {transaction.amount} BYN
              </Text>

            </div>
            <Group className="trans_actions">
              <Tooltip label="Изменить операцию" color="teal">
                <ActionIcon
                  color="white"
                  variant="light"
                  onClick={() => onClickEdit(transaction)}
                >
                  <EditItemIcon size={16}/>
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Удалить операцию" color="red">
                <ActionIcon
                  color="white"
                  variant="light"
                  onClick={() => handleDelete(transaction)}

                >
                  <RemoveItemIcon size={16}/>
                </ActionIcon>
              </Tooltip>
            </Group>
          </div>
        ))}
      </div>
    </div>

  );
};

export default TransactionsList;
