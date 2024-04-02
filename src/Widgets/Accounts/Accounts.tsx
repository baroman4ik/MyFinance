import React, {useEffect, useRef, useState} from 'react';
import {ActionIcon, Button, Image, Text, Tooltip} from "@mantine/core";
import {useDispatch, useSelector} from "react-redux";
import {AccountsBalanceSelector, deleteByAccount} from "../Calculate/CalculateSlice";
import "./AccountsStyles.css"
import {AddItemIcon} from "../../Shared/Icons/AddItemIcon";
import {OperationsIcon} from "../../Shared/Icons/OperationsIcon";
// @ts-ignore
import AddCardIcon from "../../Shared/Icons/card-add-svgrepo-com.svg"
import {Account, addAccount, removeAccount, selectAccounts, toggleAddAccountModal} from "./AccountsSlice";
import {RemoveItemIcon} from "../../Shared/Icons/RemoveItemIcon";

const Accounts = ({className = ''}) => {
  const accounts = useSelector(selectAccounts);
  const accountsBalance = useSelector(AccountsBalanceSelector);
  const accRef = useRef(null)
  const [accWidth, setAccWidth] = useState()
  const [score, setScore] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    accRef.current && setAccWidth(accRef.current.clientWidth)
  }, [accRef])

  useEffect(() => {
    const localAccs = localStorage.getItem("account")
    if (localAccs) JSON.parse(localAccs).forEach((el: Account) => dispatch(addAccount(el)))
  }, []);

  const handleOpen = () => {
    dispatch(toggleAddAccountModal(true));
  };

  const handleDelete = (account: Account) => {
    dispatch(removeAccount(account))
    dispatch(deleteByAccount(account))
  };

  return (
    <div className='accounts_block'>
      <div className="accounts_block__head">
        <h3>Счета</h3>
        <Tooltip label="Добавить счет" color="gray">
          <ActionIcon
            color="white"
            variant="light"
            onClick={() => handleOpen()}
          >
            <Image
              width={24}
              height={24}
              alt="add card"
              src={AddCardIcon}/>
          </ActionIcon>
        </Tooltip>
      </div>

      <div className={"btns_container" + " " + className}>
        {<button onClick={() => score > 0 && setScore(prev => prev - 1)} className="prev">ᐸ</button>}
        <button onClick={() => score < accounts.length - 1 && setScore(prev => prev + 1)} className="next">ᐳ</button>
      </div>

      <div className={"accounts_slider" + " " + className} ref={accRef}>
        <div
          className="accounts_container"
          style={{transform: `translateX(${-score * (accWidth || 1)}px)`}}
        >
          {accounts.map((account) => (
            <div className="account_wrapper" key={account.id}>
              <div className='account'>
                <Text className="card-name" size={"xl"}>{account.name}</Text>
                <Tooltip label="Удалить счет" color="red">
                  <ActionIcon
                    className="removeBtn"
                    color="white"
                    variant="light"
                    size="xs"
                    onClick={() => handleDelete(account)}

                  >
                    <RemoveItemIcon size={12}/>
                  </ActionIcon>
                </Tooltip>
                <Text
                  className="card-number">{account.number ? (<>.... {account.number.substring(15)}</>) : "     "}</Text>
                <Text className='balance' align={"left"} size={"xl"}>{accountsBalance[account.id]} BYN</Text>
                {account.date && <Text>{account.date}</Text>}

                <div className="account_btns">
                  <Button
                    color="red"
                    className="account_btn"
                    variant="filled"
                    leftIcon={<OperationsIcon size={14}/>}
                    disabled
                    // onClick={() => onClickEdit(account)}
                  >
                    Операции
                  </Button>
                  <Button
                    className="account_btn"
                    leftIcon={<AddItemIcon size={14}/>}
                    variant="filled"
                    disabled

                    // onClick={() => handleDelete(account)}
                  >
                    Добавить
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );

}

export default Accounts;