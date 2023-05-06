import React from 'react';
import {ExpensesChart} from "../Features/Expenses&IncomeChart";
import Calculate from "../Widgets/Calculate/Calculate";
import {useSelector} from "react-redux";
import {TransactionsList} from "../Features/TransactionsList";
import { selectExpense, selectIncomes} from "../Widgets/Calculate/CalculateSlice";

function App() {

  const expensesData = useSelector(selectExpense)
  const incomeData = useSelector(selectIncomes)

  const series: ApexCharts.ApexOptions['series'] = [
    {
      name: 'Расход',
      data: expensesData,
    },
    {
      name: 'Доход',
      data: incomeData,
    },
  ];

  return (

        <div className="App">
          <ExpensesChart series={series} />
          <Calculate/>
          <TransactionsList/>

        </div>


  );
}

export default App;
