/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { FiMaximize, FiPrinter, FiEdit } from 'react-icons/fi';
import Carousel from '@brainhubeu/react-carousel';

import CardGraphic from '../../components/GraphicModels/CardGraphic';

// import GraphicBar from '../../components/GraphicModels/GraphicBar';
// import GraphicPie from '../../components/GraphicModels/GraphicPie';
import GraphicLine from '../../components/GraphicModels/GraphicLine';
import GraphicPie from '../../components/GraphicModels/GraphicChartPie';
// import GraphicBump from '../../components/GraphicModels/GraphicBump';

import {
  Conatiner,
  CardItem,
  GraphicTitle,
  CardGraphicText,
  CardGraphicItem,
  CardBodyGoals,
} from './styles';

// interface PropsArray {
//   name: string;
// }

const Dashboard: React.FC = (onRequest, ref) => {
  const array = [];
  const temp1 = {
    name: 'Matriz',
    valor: '2',
    border: '#7fdaea',
    backcolor: '#f1fafc',
    data: [2.5, 2, 3, 2.5, 2, 3.5, 1],
    labels: ['12', '10', '15', '12', '10', '15'],
  };
  const temp2 = {
    name: 'UPL I',
    valor: '3',
    border: '#fed87e',
    backcolor: '#fdfaf1',
    data: [12, 19, 15, 14, 12, 9, 5],
    labels: ['12', '10', '15', '12', '10', '15'],
  };
  const temp3 = {
    name: 'Crechario',
    valor: '4',
    border: '#8ae0b7',
    backcolor: '#f1fbf7',
    data: [2.5, 2.0, 1, 2],
    labels: ['12', '19', '8', '10'],
  };
  const temp4 = {
    name: 'Confinamento',
    valor: '5',
    border: '#fea8ba',
    backcolor: '#fdf3f5',
    data: [12, 13, 10, 10],
    labels: ['12', '19', '30', '10'],
  };
  const temp5 = {
    name: 'Veterinaria',
    valor: '6',
    border: '#fea8ba',
    backcolor: '#fdf3f5',
    data: [10, 11, 15, 10],
    labels: ['12', '19', '30', '10'],
  };
  array.push(temp1);
  array.push(temp2);
  array.push(temp3);
  array.push(temp4);
  array.push(temp5);

  return (
    <>
      <Conatiner>
        <Carousel>
          <CardItem>
            {array.map(ar => (
              <CardGraphic
                key={ar.valor}
                backcolor={ar.backcolor}
                border={ar.border}
                name={ar.name}
                data={ar.data}
                labels={ar.labels}
              />
            ))}
          </CardItem>
        </Carousel>

        <CardBodyGoals>
          <CardGraphicItem>
            <CardGraphicText>
              <GraphicTitle>Desempenho mensal</GraphicTitle>
              <span>
                <FiEdit />
                <FiPrinter />
                <FiMaximize />
              </span>
            </CardGraphicText>
            <GraphicLine />
          </CardGraphicItem>

          <CardGraphicItem>
            <CardGraphicText>
              <GraphicTitle>Desempenho mensal</GraphicTitle>
              <span>
                <FiEdit />
                <FiPrinter />
                <FiMaximize />
              </span>
            </CardGraphicText>
            <GraphicPie />
          </CardGraphicItem>
        </CardBodyGoals>
      </Conatiner>
    </>
  );
};

export default Dashboard;
