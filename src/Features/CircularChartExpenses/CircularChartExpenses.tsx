import React from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {
  selectExpense,
  selectExpenseNamesForCircular,
} from '../../Widgets/Calculate/CalculateSlice';

const CircularChartExpenses: React.FC = () => {
  const expenseData = useSelector(selectExpense);
  const expenseDataNames = useSelector(selectExpenseNamesForCircular);

  const chartData = {
    series: expenseData.map(income => income.y),
    options: {
      labels: expenseDataNames
    },
  };

  return (
    <div>
      Круговая диаграмма доходов по категориям

      <ReactApexChart className="asd" options={chartData.options} series={chartData.series} type="pie" width="300" />
    </div>
  );
};

export default CircularChartExpenses;
