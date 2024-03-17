import React from 'react';
import {rem, Select} from "@mantine/core";
import {SeriesType} from "../Expenses&IncomeChart/ExpensesChart";
import {DatePickerInput} from "@mantine/dates";
import {
  selectGroupByValue,
  selectPeriod,
  selectSeriesType,
  setGroup,
  setPeriod,
  setSeriesType,
  tGroupBy,
  tPeriod
} from "../../Widgets/Calculate/CalculateSlice";
import {useDispatch, useSelector} from "react-redux";
import "./FiltersStyles.css"
import {IconCalendar} from "@tabler/icons-react";

export default function Filters(props: any) {
  const dispatch = useDispatch()
  const groupBy: tGroupBy = useSelector(selectGroupByValue);
  const seriesType: SeriesType = useSelector(selectSeriesType);
  const period: tPeriod = useSelector(selectPeriod);

  const changeGroup = (per: tGroupBy) => dispatch(setGroup(per))
  const groupByVariants = [
    {value: 'time', label: 'По времени'},
    {value: 'day', label: 'По дате'},
    {value: 'month', label: 'По месяцу'},
    {value: 'year', label: 'По году'},
  ];

  const data = [
    {value: 'diff', label: 'Разница'},
    {value: 'expenses', label: 'Расход'},
    {value: 'income', label: 'Поступление'},
    {value: 'duo', label: 'Расход и Поступление'},
  ];

  const icon = <IconCalendar style={{width: rem(18), height: rem(18)}} stroke={1.5}/>

  return (
    <div className="filters" {...props}>

      <Select
        label='Что отобразить'
        value={seriesType}
        onChange={(value) => dispatch(setSeriesType(value as SeriesType))}
        data={data}
      />


      <DatePickerInput
        type="range"
        label="За какой период вывести"
        valueFormat="DD.MM.YYYY"
        clearable
        value={period}
        onChange={(value) => dispatch(setPeriod(value as tPeriod))}
      />

      {/*<MultiSelect*/}
      {/*  label='По категориям'*/}
      {/*  placeholder='Введите или выберите категорию'*/}
      {/*  // value={seriesType}*/}
      {/*  // onChange={(value) => setSeriesType(value as SeriesType)}*/}
      {/*  data={data}*/}
      {/*  clearable={false}*/}
      {/*  pb="200"*/}
      {/*  required*/}
      {/*  // leftSection={icon}*/}
      {/*  // leftSectionPointerEvents="none"*/}
      {/*/>*/}


      <Select
        label='Группировка'
        value={groupBy}
        onChange={(value) => changeGroup(value as tGroupBy)}
        data={groupByVariants}
      />
    </div>)
}

;

