import React from 'react';
import {useSelector} from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {selectExpense, selectIncomes} from '../../Widgets/Calculate/CalculateSlice';

const CircularChart: React.FC = () => {
  const incomesData = useSelector(selectIncomes);
  const expensesData = useSelector(selectExpense);

  const exp = expensesData.reduce((sum, item) => sum + item.y, 0)
  const inc = incomesData.reduce((sum, item) => sum + item.y, 0)

  const chartData = {
    series: [inc - exp, exp],
    options: {
      labels: ['Доходы', 'Расходы'],
      colors: ['#00ff00', '#00bfff']
    },
  };

  return (
    <div>
      Соотношение суммы расходов к доходам
      <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width="300" height="200"/>
    </div>
  );
};

export default CircularChart;
