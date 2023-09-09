import React, {useState} from 'react';
import {ExpensesChart} from "../Features/Expenses&IncomeChart";
import Calculate from "../Widgets/Calculate/Calculate";
import {TransactionsList} from "../Features/TransactionsList";
import {Select} from "@mantine/core";
import {SeriesType, TimePeriod} from "../Features/Expenses&IncomeChart/ExpensesChart";
import CircularChart from "../Features/CircularChart/CircularChart";
import {useSelector} from "react-redux";
import {selectDiff, selectExpense, selectIncomes} from "../Widgets/Calculate/CalculateSlice";

function App() {
  const diff = useSelector(selectDiff);
  const expensesData = useSelector(selectExpense);
  const incomeData = useSelector(selectIncomes);


  const expensesSumValue = expensesData.reduce((prev, curr) =>
    prev += curr.y
  , 0)

  const incomeSumValue = incomeData.reduce((prev, curr) =>
    prev += curr.y
  , 0)


  console.log(incomeData)


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

    const [timePeriod, setTimePeriod] = useState('day' as TimePeriod)
    const periods = [
        {value: 'day', label: 'day'},
        {value: 'month', label: 'month'},
        {value: 'year', label: 'year'},
    ];
    return (
        <div className="App " style={{display: 'flex', flexWrap: "wrap"}}>
            <div className="chart-wrapper">
              <div style={{display: "flex", justifyContent: "space-between", width: "90%"}}> <Select
                label='Что отобразить'
                value={seriesType}
                onChange={(value) => setSeriesType(value as SeriesType)}
                data={data}
              />
                <Select
                  label='Промежуток времени'
                  value={timePeriod}
                  onChange={(value) => setTimePeriod(value as TimePeriod)}
                  data={periods}
                /></div>

                <ExpensesChart seriesType={seriesType} timePeriod={timePeriod}/>
              <h2>{total()}</h2>
            </div>
            <div className="chart-wrapper">
                <Calculate/>
            </div>
            <div className="chart-wrapper">
                <TransactionsList/>

            </div>
          <div className="chart-wrapper">
                <CircularChart/>
          </div>


        </div>
    );
}

export default App;
