import React, {useState} from 'react';
import {ExpensesChart} from "../Features/Expenses&IncomeChart";
import Calculate from "../Widgets/Calculate/Calculate";
import {TransactionsList} from "../Features/TransactionsList";
import {Select} from "@mantine/core";
import {SeriesType} from "../Features/Expenses&IncomeChart/ExpensesChart";
import CircularChart from "../Features/CircularChart/CircularChart";
import {useDispatch, useSelector} from "react-redux";
import {
  selectDiff,
  selectExpense,
  selectGroupByValue,
  selectIncomes,
  setGroup,
  tGroupBy
} from "../Widgets/Calculate/CalculateSlice";
import CircularChartIncomes from "../Features/CircularChartIncomes/CircularChartIncomes";
import CircularChartExpenses from "../Features/CircularChartExpenses/CircularChartExpenses";
import Accounts from "../Features/Accounts/Accounts";
import Navigation from "../Entities/Navigation/Navigation";
import {DatesProvider} from "@mantine/dates";
import 'dayjs/locale/ru';


function App() {
  const dispatch = useDispatch()
  const diff = useSelector(selectDiff);
  const expensesData = useSelector(selectExpense);
  const incomeData = useSelector(selectIncomes);
  const groupBy: tGroupBy = useSelector(selectGroupByValue);


  const expensesSumValue = expensesData.reduce((prev, curr) =>
      prev += curr.y
    , 0)

  const incomeSumValue = incomeData.reduce((prev, curr) =>
      prev += curr.y
    , 0)


  const total = () => {
    if (seriesType) {
      if (seriesType === 'diff')
        return `Остаток на балансе: ${incomeSumValue - expensesSumValue}`
      else if (seriesType === 'expenses')
        return `Сумма расходов: ${expensesSumValue}`
      else if (seriesType === 'income')
        return `Сумма доходов: ${incomeSumValue}`
      else if (seriesType === 'duo')
        return `Расходы: ${expensesSumValue} Доходы: ${incomeSumValue}`
    }
  }

  const [seriesType, setSeriesType] = useState('income' as SeriesType)
  const data = [
    {value: 'diff', label: 'Разница'},
    {value: 'expenses', label: 'Расход'},
    {value: 'income', label: 'Поступление'},
    {value: 'duo', label: 'Расход и Поступление'},
  ];

  const changeGroup = (per: tGroupBy) => dispatch(setGroup(per))
  const groupByVariants = [
    {value: 'time', label: 'По времени'},
    {value: 'day', label: 'По дате'},
    {value: 'month', label: 'По месяцу'},
    {value: 'year', label: 'По году'},
  ];

  
  return (
    <DatesProvider settings={{locale: 'ru'}}>
      <div className="App " style={{display: 'flex', flexWrap: "wrap"}}>
        <Navigation/>
        <div className="page-wrapper">
          <div className="chart-wrapper">
            <div style={{display: "flex", justifyContent: "space-between", width: "90%"}}>
              <Select
                label='Что отобразить'
                value={seriesType}
                onChange={(value) => setSeriesType(value as SeriesType)}
                data={data}
              />
              <Select
                label='Группировка'
                value={groupBy}
                onChange={(value) => changeGroup(value as tGroupBy)}
                data={groupByVariants}
              /></div>

            <ExpensesChart seriesType={seriesType}/>
            <h2>{total()}</h2>
          </div>
          <div className="chart-wrapper">
            <Calculate/>
          </div>
          <div className="chart-wrapper">
            <TransactionsList/>

          </div>

          <div className="chart-wrapper">
            <Accounts/>

          </div>
          <div className="chart-wrapper">
            <CircularChart/>
          </div>
          <div className="chart-wrapper">
            <CircularChartIncomes/>
          </div>
          <div className="chart-wrapper">
            <CircularChartExpenses/>
          </div>
        </div>


        {/*<CardForm/>*/}


      </div>

    </DatesProvider>
  );
}

export default App;
