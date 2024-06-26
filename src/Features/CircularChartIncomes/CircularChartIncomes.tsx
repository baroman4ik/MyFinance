import React from 'react';
import {useSelector} from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {selectIncomesByCategory, selectIncomesNamesForCircular} from '../../Widgets/Calculate/CalculateSlice';

const CircularChartIncomes: React.FC = () => {
  const incomesData = useSelector(selectIncomesByCategory);
  const incomesDataNames = useSelector(selectIncomesNamesForCircular);

  const chartData = {
    series: incomesData.map(income => income.y),
    options: {
      labels: incomesDataNames
    },
  };

  return (
    <div>
      Доходы по категориям
      <ReactApexChart options={chartData.options} series={chartData.series} type="pie" className="circular-chart"
                      height="200"/>
    </div>
  );
};

export default CircularChartIncomes;
