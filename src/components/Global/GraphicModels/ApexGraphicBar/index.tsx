import React, { useMemo } from 'react';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

import { Container } from './styles';

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

  const dataGraphic = {
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

    // stroke: {
    //   width: [0, 4],
    // },

    // dataLabels: {
    //   enabled: true,
    //   enabledOnSeries: [1],
    // },
  };

  const option: ApexOptions = {
    // options: {
    plotOptions: {
      bar: {
        borderRadius: [10, 10],
        horizontal: false,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    // },
    xaxis: {
      categories: filterMonth,
    },
  };

  // const Item = chart.render();
  // console.log(Chart);
  return (
    <Container>
      <h2>{title}</h2>
      <Chart
        options={option}
        series={dataGraphic.series}
        type="bar"
        width={width}
        height={height}
      />
    </Container>
  );
};

export default GraphicBarApex;
