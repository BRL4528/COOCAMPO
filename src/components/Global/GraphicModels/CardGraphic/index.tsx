import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ColorStyles {
  color?: string;
  title: string;
  width: number;
  height: number;
  result: {
    month_text: string;
    month_number: number;
    goal: number;
    result: number;
  }[];
}

const CardGraphic: React.FC<ColorStyles> = ({
  title,
  width,
  height,
  result,
}) => {
  const filterGoal = useMemo(() => {
    return result.map(el => el.goal);
  }, [result]);

  const filterResult = useMemo(() => {
    return result.map(el => el.result);
  }, [result]);

  const filterMonth = useMemo(() => {
    return result.map(el => {
      return el.month_text;
    });
  }, [result]);
  console.log('filterMonth', filterMonth);
  console.log('filterGoal', filterGoal);
  console.log('filterResult', filterResult);
  const dataGraphic = {
    labels: filterMonth,
    datasets: [
      {
        label: 'Metas',
        data: filterGoal,
        backgroundColor: '#118DFF',
        borderColor: '#118DFF',
        borderRadius: 6,
        datalabels: {
          backgroundColor: '#0657a3',
          padding: 10,
          borderRadius: 6,
          color: 'white',
          // labels: {
          //   anchor: 'top',
          // },
        },
      },
      {
        label: 'Resultados',
        data: filterResult,
        backgroundColor: '#E2C90A',
        borderColor: '#E2C90A',
        borderRadius: 6,
        datalabels: {
          backgroundColor: '#caa605',
          padding: 10,
          borderRadius: 6,
          color: 'white',
        },
      },
    ],
  };

  const option = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },

    plugins: {
      dataLabels: {
        display: true,
        anchor: 'start',
      },
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h2>{title}</h2>
      <Bar
        options={option}
        plugins={[ChartDataLabels]}
        data={dataGraphic}
        width={width}
        height={height}
      />
    </div>
  );
};

export default CardGraphic;
