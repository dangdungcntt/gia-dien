<script setup>
import {CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement, Tooltip,} from 'chart.js';
import {Line} from 'vue-chartjs';
import {roundNumber} from "./utils";
import {GetPrice, Price5Levels, Price6Levels} from "./price";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);
const greenColor = 'rgba(0, 200, 150, 0.9)';
const redColor = 'rgba(255, 0, 0, 0.9)';

let currentKWh = -20;
const rawData = Array(501).fill(0).map(() => {
  currentKWh += 20;
  const base = GetPrice(Price6Levels, currentKWh);
  const current = GetPrice(Price5Levels, currentKWh);
  return {
    x: currentKWh,
    y: base == 0 ? 0 : roundNumber(((current / base) - 1) * 100, 100)
  };
});

const chartData = {
  labels: rawData.map((item) => item.x),
  datasets: [
    {
      label: '% thay đổi',
      data: rawData,
      fill: false,
      // tension: 0.4,
      segment: {
        borderColor: ctx => {
          const v = ctx.p0.parsed.y;
          return v <= 0 ? greenColor : redColor;
        },
      },
    },
  ],
};

const chartOptions = {
  responsive: true,
  scales: {
    x: {
      type: 'category',
      title: {
        display: true,
        text: 'Số kWh',
      },
    },
    y: {
      min: -5,
      max: 15,
      title: {
        display: true,
        text: '% thay đổi',
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        labelColor: function (context) {
          const value = context.parsed.y;
          if (value == 0) {
            return {};
          }
          return {
            borderColor: value < 0 ? greenColor : redColor,
            backgroundColor: value < 0 ? greenColor : redColor,
            borderWidth: 2,
            borderDash: [2, 2],
            borderRadius: 2,
          };
        },
        label: function (context) {
          const value = context.parsed.y;
          if (value == 0) {
            return 'Không thay đổi';
          }
          return value < 0 ? `Giảm: ${Math.abs(value)}%` : `Tăng: ${value}%`;
        }
      }
    },
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      pointStyle: 'solid',
      radius: 0,
      hitRadius: 5,
      borderWidth: 0,
    }
  }
};
</script>

<template>
  <Line :data="chartData" :options="chartOptions"/>
</template>
