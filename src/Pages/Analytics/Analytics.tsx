import React, {useState} from 'react';
import {TransactionsList} from "../../Features/TransactionsList";
import Calculate from "../../Widgets/Calculate/Calculate";
import {Filters} from "../../Features/Filters";
import {ExpensesChart} from "../../Features/Expenses&IncomeChart";
import Accounts from "../../Widgets/Accounts/Accounts";
import CircularChart from "../../Features/CircularChart/CircularChart";
import CircularChartIncomes from "../../Features/CircularChartIncomes/CircularChartIncomes";
import CircularChartExpenses from "../../Features/CircularChartExpenses/CircularChartExpenses";
import {SeriesType} from "../../Features/Expenses&IncomeChart/ExpensesChart";
import {useSelector} from "react-redux";
import {selectDiff, selectExpense, selectIncomes} from "../../Widgets/Calculate/CalculateSlice";

const Analytics = () => {
  const diff = useSelector(selectDiff);
  const expensesData = useSelector(selectExpense);
  const incomeData = useSelector(selectIncomes);


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


  return (

    <div className="page-wrapper">

      <Filters/>

      <div className="main-block">
        <ExpensesChart seriesType={seriesType}/>
        <h2>{total()}</h2>
      </div>

      <div className="main-block">
        <Calculate/>
      </div>
      <div className="main-block">
        <TransactionsList/>

      </div>

      <div className="main-block">
        <Accounts/>

      </div>
      <div className="main-block">
        <CircularChart/>
      </div>
      <div className="main-block">
        <CircularChartIncomes/>
      </div>
      <div className="main-block">
        <CircularChartExpenses/>
      </div>
    </div>

  );
};


export default Analytics;