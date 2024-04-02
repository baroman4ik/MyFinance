import React from 'react';
import {useSelector} from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {selectExpenseByCategory, selectExpenseNamesForCircular,} from '../../Widgets/Calculate/CalculateSlice';

const CircularChartExpenses: React.FC = () => {
  const expenseData = useSelector(selectExpenseByCategory);
  const expenseDataNames = useSelector(selectExpenseNamesForCircular);

  const chartData = {
    series: expenseData.map(income => income.y),
    options: {
      labels: expenseDataNames
    },
  };

  return (
    <div>
      Расходы по категориям

      <ReactApexChart options={chartData.options} series={chartData.series} type="pie" className="circular-chart"
                      height="200"/>
    </div>
  );
};

export default CircularChartExpenses;
