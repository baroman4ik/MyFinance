import React from 'react';
import ReactApexChart from 'react-apexcharts';

type ExpensesChartProps = {
    series:  ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
};

export type ChartData = {
    x: Date;
    y: number;
    category?: string
};

const ExpensesChart: React.FC<ExpensesChartProps> = ({ series }) => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'pie',
            height: 100,
            stacked: true,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM',
                    day: 'dd',
                    hour: 'HH:mm',
                },
                formatter: function(value, timestamp) {
                    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
                    const date = timestamp !== undefined ? new Date(timestamp) : new Date();
                    return months[date.getMonth()];
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (value: number) => `$${value.toFixed(2)}`
            }
        }
    };



    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="line" height={200} />
        </div>
    );
};

export default ExpensesChart;
