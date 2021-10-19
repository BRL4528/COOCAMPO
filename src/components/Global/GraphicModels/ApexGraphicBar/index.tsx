import React, { useMemo } from 'react';

import Chart from 'react-apexcharts';

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

const GraphicBarApex: React.FC<ColorStyles> = ({
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

  console.log('mese', filterMonth);
  const options = {
    series: [
      {
        name: 'Metas',
        data: filterGoal,
        color: '#118DFF',
      },
      {
        name: 'Resultados',
        data: filterResult,
        color: '#E2C90A',
      },
    ],
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },

    xaxis: {
      categories: filterMonth,
    },
    // chart: {
    //   height: 350,
    //   type: 'line',
    // },
    // stroke: {
    //   width: [0, 4],
    // },

    // dataLabels: {
    //   enabled: true,
    //   enabledOnSeries: [1],
    // },
  };

  // const Item = chart.render();
  // console.log(Chart);
  return (
    <div>
      <h2>{title}</h2>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        width={width}
        height={height}
      />
    </div>
  );
};

export default GraphicBarApex;
