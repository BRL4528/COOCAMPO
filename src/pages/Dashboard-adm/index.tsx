import React from 'react';

// import { FiMaximize, FiPrinter, FiEdit } from 'react-icons/fi';
import { Line } from '@reactchartjs/react-chart.js';

// import GraphicBar from '../../components/GraphicModels/GraphicBar';
// import GraphicPie from '../../components/GraphicModels/GraphicPie';
// import GraphicLine from '../../components/GraphicModels/GraphicLine';
// import GraphicBump from '../../components/GraphicModels/GraphicBump';

import {
  Conatiner,
  CardGraphic,
  // GraphicTitle,
  // CardGraphicText,
} from './styles';

const Dashboard: React.FC = () => {
  const data = {
    labels: ['1', '2', '3', '4'],

    datasets: [
      {
        // width: 400,

        data: [12, 19, 3, 50],

        borderColor: '#7fdaea',
        backgroundColor: '#f1fafc',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,

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
          ticks: { display: false },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            display: false,
            isplay: false,
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
    <>
      <Conatiner>
        <CardGraphic>
          <h2>Matriz</h2>
          <strong>2,5%</strong>
          <span>
            <Line
              type="line"
              // chartArea={area}
              redraw
              data={data}
              options={options}
            />
          </span>
        </CardGraphic>
        {/* <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Desempenho mensal</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>
          <GraphicBar />
        </CardGraphic> */}

        {/* <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Desempenho metas gerais</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>
          <GraphicPie />
        </CardGraphic>

        <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Análise critica</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>

          <GraphicLine />
        </CardGraphic>

        <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Rotina interna</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>

          <GraphicBump />
        </CardGraphic> */}
      </Conatiner>
    </>
  );
};

export default Dashboard;
