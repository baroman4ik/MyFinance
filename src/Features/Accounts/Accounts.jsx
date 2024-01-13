import React from 'react';
import {Button, Group, Text} from "@mantine/core";
import {useSelector} from "react-redux";
import {selectAccounts} from "../../Widgets/Calculate/CalculateSlice";
import "./AccountsStyles.css"

const Accounts = () => {
  const accounts = useSelector(selectAccounts);

  return (
    <div className='accounts_block'>
      <h3>Операции на счёте</h3>
      <div className="accounts_container">
        {accounts.map((account) => (
          <div className='account' key={account.id}>
            <Text align={"center"} size={"xl"}>{account.name}</Text>
            {account.number && <Text>Номер карты: {account.number}</Text>}
            {account.date && <Text>Дата: {account.date}</Text>}
            <Group>
              <Button
                variant="outline"
                // onClick={() => onClickEdit(account)}
              >
                Изменить
              </Button>
              <Button
                color="red"
                variant="outline"
                // onClick={() => handleDelete(account)}
              >
                Удалить
              </Button>
            </Group>
          </div>
        ))}
      </div>
    </div>
  );

}

export default Accounts;