import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {createSelector} from '@reduxjs/toolkit';
import {
  selectDiff,
  selectExpensePerGroup,
  selectGroupByValue,
  selectIncomePerGroup,
  selectPeriod,
  selectSeriesType,
  selectTransactions,
  tGroupBy,
  Transaction
} from '../../Widgets/Calculate/CalculateSlice';
import {useSelector} from 'react-redux';
import {formatDate} from "../TransactionsList/TransactionsList";

export type SeriesType = 'diff' | 'expenses' | 'income' | 'duo';

type ExpensesChartProps = {
  seriesType?: SeriesType;
  timeGroup?: tGroupBy;
};

export type ChartData = {
  x: Date | string;
  y: number;
  category?: string;
};

const ExpensesChart: React.FC<ExpensesChartProps> = () => {
  const expensesData = useSelector(selectExpensePerGroup);
  const incomeData = useSelector(selectIncomePerGroup);
  const transactions = useSelector(selectTransactions);
  const diff = useSelector(selectDiff);
  const timeGroup: tGroupBy = useSelector(selectGroupByValue);
  const period = useSelector(selectPeriod);
  const seriesType: SeriesType = useSelector(selectSeriesType);
  // const expensesDataPerDay = useSelector(selectExpensePerDay);


  // const currExpense =

  // console.log(expensesDataPerDay)

  const selectDataByTimePeriod = createSelector(
    (transactions: Transaction[], timePeriod: tGroupBy) => {
      const currentDate = new Date();
      const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        switch (timePeriod) {
          case 'day':
            return transactionDate.getDate() === currentDate.getDate() && transactionDate.getMonth() === currentDate.getMonth() && transactionDate.getFullYear() === currentDate.getFullYear();
          case 'month':
            return transactionDate.getMonth() === currentDate.getMonth() && transactionDate.getFullYear() === currentDate.getFullYear();
          case 'year':
            return transactionDate.getFullYear() === currentDate.getFullYear();
          default:
            return false;
        }
      });
      return filteredTransactions;
    },
    transactions => transactions.map((transaction) => {
      return {
        x: transaction.date,
        y: transaction.amount,
      };
    }),
  );

  const data = selectDataByTimePeriod(transactions, timeGroup);

  const getSeries = (): ApexAxisChartSeries => {
    switch (seriesType) {
      case 'expenses':
        return [
          {
            name: 'Расходы',
            data: expensesData,
            color: '#0000a2',

          },
        ];
      case 'income':
        return [
          {
            name: 'Доходы',
            data: incomeData,
            color: '#00ff00',
          },
        ];
      case 'duo':
        return [
          {
            name: 'Расходы',
            data: expensesData,
          },
          {
            name: 'Доходы',
            data: incomeData,
          },
        ];
      case 'diff':
      default:
        const data = diff;
        return [
          {
            name: 'Разница',
            data,
          },
        ];
    }
  };

  function calculateDifference(transactions: Transaction[]): ChartData[] {
    let tr = incomeData.concat(expensesData);

    tr.sort(function (a, b) {
      return Date.parse(a.x) - Date.parse(b.x);
    });

    var result = [];
    var balance = 0;

    for (var i = 0; i < tr.length; i++) {
      var transaction = tr[i];
      balance += transaction.y;
      var entry = {x: transaction.x, y: balance};
      result.push(entry);
    }

    return data;
  }


  const chartText = () => {
    console.log(period)
    if (seriesType === "diff")
      return `Разница за ${period[1] ? formatDate(period[0] || new Date()) + " - " + formatDate(period[1] || new Date()) : "всё время"}`
    else if (seriesType === "expenses") {
      return `Расходы за ${period[1] ? formatDate(period[0] || new Date()) + " - " + formatDate(period[1] || new Date()) : "всё время"}`
    } else if (seriesType === "income") {
      return `Доходы за ${period[1] ? formatDate(period[0] || new Date()) + " - " + formatDate(period[1] || new Date()) : "всё время"}`
    }
  }


  const getChartOptions = (): ApexCharts.ApexOptions => {
    return {

      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
        categories: data.map(item => item.x),
        title: {
          text: 'Даты', // X-axis label
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#001117',
          },
        },
        labels: {
          show: true,
          rotate: -45,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: true,
          minHeight: undefined,
          maxHeight: 120,
          style: {
            colors: ["white", "white", "white", "white", "white", "white"],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            cssClass: 'apexcharts-xaxis-label',
          },
          offsetX: 0,
          offsetY: 0,
          format: 'dd/MM/yyyy',
          formatter: undefined,
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm',
          },
        },

      },
      yaxis: {
        title: {
          text: 'Сумма', // X-axis label
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000f17',
          },
        },
        labels: {
          formatter: (val: number) => Math.abs(val).toString(),
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yyyy',
        },
        y: {
          formatter: function (val) {
            return Math.abs(val).toFixed(2);
          },
        },
      },
      title: {
        text: chartText(),
        align: 'left',
        style: {
          fontSize: window.innerWidth > 525 ? '20px' : '10px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#04243a',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.9,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },


    };
  };

  console.log(window.innerWidth)


  return (
    <ReactApexChart
      options={getChartOptions()}
      series={getSeries()}
      type="bar"
      className="main_chat"
    />
  );

};

export default ExpensesChart;

