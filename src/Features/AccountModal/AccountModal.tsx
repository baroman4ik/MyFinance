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

const AddAccountModal: React.FC = () => {
  const dispatch = useDispatch();
  const fields = useSelector(selectAccountFields);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const showAddAccountModal = useSelector(selectShowAddAccountModal);

  const handleClose = () => {
    dispatch(toggleAddAccountModal(false));
  };

  const handleAddAccount = () => {
    // Проверка на ошибки перед добавлением счета
    if (!validateFields()) {
      // Если есть ошибки, выходим из функции
      return;
    }

    // Отправляем данные нового счета в хранилище
    // @ts-ignore
    dispatch(addAccount(fields));
    handleClose();
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    // Валидация последних четырех цифр номера карты
    if (!/^\d{4}$/.test(fields.number)) {
      newErrors.number = 'Введите последние четыре цифры номера карты';
    }

    // Валидация срока действия карты в формате MM/YY
    if (!/^\d{2}\/\d{2}$/.test(fields.date)) {
      newErrors.date = 'Введите срок действия карты в формате MM/YY';
    }

    // Валидация остатка баланса (может быть только положительным числом)
    if (fields.prevBalance <= 0) {
      newErrors.prevBalance = 'Остаток баланса должен быть положительным числом';
    }

    // Обновляем состояние ошибок
    setErrors(newErrors);

    // Возвращаем true, если ошибок нет
    return Object.keys(newErrors).length === 0;
  };
  if (!showAddAccountModal) return <></>

  return (
    <Modal opened={true} onClose={handleClose} title="Добавить новый счет">
      <TextInput
        label="Последние четыре цифры номера карты"
        value={fields.number}
        onChange={(event) => dispatch(setAccountField({field: 'number', value: event.currentTarget.value}))}
        error={errors.number}
      />
      <TextInput
        label="Срок действия карты"
        value={fields.date}
        onChange={(event) => dispatch(setAccountField({field: 'date', value: event.currentTarget.value}))}
        error={errors.date}
      />
      <TextInput
        label="Название карты"
        value={fields.name}
        onChange={(event) => dispatch(setAccountField({field: 'name', value: event.currentTarget.value}))}
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
      <Button onClick={handleAddAccount}>Добавить счет</Button>
    </Modal>
  );
};

export default AddAccountModal;
