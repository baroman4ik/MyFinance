import React from 'react';
import {ExpensesChart} from "../../Features/Expenses&IncomeChart";
import CircularChart from "../../Features/CircularChart/CircularChart";
import {SeriesType} from "../../Features/Expenses&IncomeChart/ExpensesChart";
import {useSelector} from "react-redux";
import {selectDiff, selectExpense, selectIncomes, selectSeriesType} from "../../Widgets/Calculate/CalculateSlice";
import {TransactionsList} from "../../Features/TransactionsList";
import CircularChartExpenses from "../../Features/CircularChartExpenses/CircularChartExpenses";
import {Filters} from "../../Features/Filters";
import CircularChartIncomes from "../../Features/CircularChartIncomes/CircularChartIncomes";
import AccountModal from "../../Features/AccountModal/AccountModal";
import AsideBlock from "../../Widgets/AsideBlock/AsideBlock";

const MainPanel = () => {
  const diff = useSelector(selectDiff);
  const expensesData = useSelector(selectExpense);
  const incomeData = useSelector(selectIncomes);
  const seriesType: SeriesType = useSelector(selectSeriesType);


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

  return (

    <div className="page-wrapper">
      <AccountModal/>
      <main>
        <Filters/>

        <div className="main_container">
          <div className="main-block_double gen_chart">
            <ExpensesChart seriesType={seriesType}/>
            <h2>{total()}</h2>
          </div>
          <div className="main-block_small circular">
            <CircularChart/>
          </div>
          <div className="main-block_small circular_expenses">
            {
              seriesType === "income"
                ? <CircularChartIncomes/>
                : <CircularChartExpenses/>
            }
          </div>
          {/*<div className=" main-block_small circular_incomes">*/}
          {/*  <CircularChartIncomes/>*/}
          {/*</div>*/}
          <div className="main-block_full transactions_t">
            <h3>Последние операции</h3>
            <TransactionsList/>
          </div>

          {/*<div className="main-block">*/}
          {/*  <CircularChartIncomes/>*/}
          {/*</div>*/}
        </div>
      </main>
      <AsideBlock/>

    </div>

  );
};


export default MainPanel;