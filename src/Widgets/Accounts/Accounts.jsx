import React, {useEffect, useRef, useState} from 'react';
import {ActionIcon, Button, Image, Text, Tooltip} from "@mantine/core";
import {useDispatch, useSelector} from "react-redux";
import {AccountsBalanceSelector} from "../Calculate/CalculateSlice";
import "./AccountsStyles.css"
import {AddItemIcon} from "../../Shared/Icons/AddItemIcon";
import {OperationsIcon} from "../../Shared/Icons/OperationsIcon";
import AddCardIcon from "../../Shared/Icons/card-add-svgrepo-com.svg"
import {selectAccounts, toggleAddAccountModal} from "./AccountsSlice";

const Accounts = () => {
  const accounts = useSelector(selectAccounts);
  const accountsBalance = useSelector(AccountsBalanceSelector);
  const accRef = useRef(null)
  const [accWidth, setAccWidth] = useState()
  const [score, setScore] = useState(0)
  const dispatch = useDispatch()
  console.log(accountsBalance)

  useEffect(() => {
    console.log(accWidth)
    console.log(-score * -accWidth)
    accRef.current && setAccWidth(accRef.current.clientWidth)
  }, [accRef])

  const handleOpen = () => {
    dispatch(toggleAddAccountModal(true));
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

      <div className="btns_container">
        {<button onClick={() => score > 0 && setScore(prev => prev - 1)} className="prev">ᐸ</button>}
        <button onClick={() => score < accounts.length - 1 && setScore(prev => prev + 1)} className="next">ᐳ</button>
      </div>

      <div className="accounts_slider" ref={accRef}>
        <div
          className="accounts_container"
          style={{transform: `translateX(${-score * accWidth}px)`}}
        >
          {accounts.map((account) => (
            <div className="account_wrapper">
              <div className='account' key={account.id}>
                <Text className="card-name" size={"xl"}>{account.name}</Text>
                <Text
                  className="card-number">{account.number ? (<>.... {account.number.substring(15)}</>) : "     "}</Text>
                <Text className='balance' align={"left"} size={"xl"}>{accountsBalance[account.id]} BYN</Text>
                {account.date && <Text>{account.date}</Text>}
                <div className="account_btns">
                  <Button
                    color="red"
                    className="account_btn"
                    variant="filled"
                    leftIcon={<OperationsIcon size={16}/>}
                    // onClick={() => onClickEdit(account)}
                  >
                    Операции
                  </Button>
                  <Button
                    className="account_btn"
                    leftIcon={<AddItemIcon size={16}/>}
                    variant="filled"
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