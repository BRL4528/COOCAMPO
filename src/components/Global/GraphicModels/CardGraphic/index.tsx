import React from 'react';

import { Line } from '@reactchartjs/react-chart.js';

import { Container, ItemGraphic } from './styles';

interface PropsValue {
  name: string;
  backcolor: string;
  border: string;
  data: number[];
  labels: string[];
}

const CardGraphic: React.FC<PropsValue> = ({
  name,
  backcolor,
  border,
  data,
  labels,
}: PropsValue) => {
  const date = {
    labels,

    datasets: [
      {
        data,
        // width: 400,

        borderColor: `${border}`,
        backgroundColor: `${backcolor}`,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: -20,
    },
    scaleLabel: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        tension: 0.33,
      },
    },
    scales: {
      xAxes: [
        {
          // position: 'top',
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],

      yAxes: [
        {
          // position: 'right',
          // padding: 0,

          ticks: {
            display: false,
            minor: {
              autoSkipPadding: 10,
            },
          },

          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  };

  return (
    <Container>
      <ItemGraphic color={border}>
        <p>{name}</p>
        <strong>2,5%</strong>
        <span>
          <Line
            type="line"
            // chartArea={area}
            redraw
            data={date}
            options={options}
          />
        </span>
      </ItemGraphic>
    </Container>
  );
};

export default CardGraphic;
