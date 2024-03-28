import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Modal, TextInput} from '@mantine/core';
import {
  addAccount,
  selectAccountFields,
  selectShowAddAccountModal,
  setAccountField,
  toggleAddAccountModal
} from "../../Widgets/Accounts/AccountsSlice";
import {AddItemIcon} from "../../Shared/Icons/AddItemIcon";

const AddAccountModal: React.FC = () => {
  const dispatch = useDispatch();
  const fields = useSelector(selectAccountFields);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const showAddAccountModal = useSelector(selectShowAddAccountModal);

  const handleClose = () => {
    dispatch(toggleAddAccountModal(false));
  };

  const handleAddAccount = () => {
    if (!validateFields()) {
      return;
    }

    // @ts-ignore
    dispatch(addAccount(fields));
    handleClose();
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!/^\d{4}$/.test(fields.number)) {
      newErrors.number = 'Введите последние четыре цифры номера карты';
    }

    if (!/^\d{2}\/\d{2}$/.test(fields.date)) {
      newErrors.date = 'Введите срок действия карты в формате MM/YY';
    }

    if (fields.prevBalance <= 0) {
      newErrors.prevBalance = 'Остаток баланса должен быть положительным числом';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  if (!showAddAccountModal) return <></>

  return (
    <Modal size={400} radius="xl" padding={30} opened={true} onClose={handleClose} title="Добавить новый счет" centered>
      <TextInput
        type="number"
        label="Последние четыре цифры номера карты"
        value={fields.number}
        onChange={(event) => event.target.value.length < 5 && dispatch(setAccountField({
          field: 'number',
          value: event.currentTarget.value
        }))}
        error={errors.number}
        max={4}
      />
      <TextInput
        label="Срок действия карты"
        value={fields.date}
        onChange={(event) => event.target.value.length < 6 && dispatch(setAccountField({
          field: 'date',
          value: event.currentTarget.value
        }))}
        error={errors.date}
      />
      <TextInput
        label="Название карты"
        value={fields.name}
        onChange={(event) => event.target.value.length < 30 && dispatch(setAccountField({
          field: 'name',
          value: event.currentTarget.value
        }))}
      />
      <TextInput
        label="Остаток баланса"
        type="number"
        value={fields.prevBalance}
        onChange={(event) => dispatch(setAccountField({
          field: 'prevBalance',
          value: parseFloat(event.currentTarget.value) || ''
        }))}
        error={errors.prevBalance}
      />
      <br/>
      <Button leftIcon={<AddItemIcon fill="white" size={16}/>} onClick={handleAddAccount}>Добавить счет</Button>
    </Modal>
  );
};

export default AddAccountModal;
