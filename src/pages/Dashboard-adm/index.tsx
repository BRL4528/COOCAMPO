import React from 'react';

import { FiMaximize, FiPrinter, FiEdit } from 'react-icons/fi';

import GraphicBar from '../../components/GraphicModels/GraphicBar';
import GraphicPie from '../../components/GraphicModels/GraphicPie';
import GraphicLine from '../../components/GraphicModels/GraphicLine';
import GraphicBump from '../../components/GraphicModels/GraphicBump';

import {
  Conatiner,
  CardGraphic,
  GraphicTitle,
  CardGraphicText,
} from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Conatiner>
        <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Desempenho mensal</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>
          <GraphicBar />
        </CardGraphic>

        <CardGraphic>
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
        </CardGraphic>
      </Conatiner>
    </>
  );
};

export default Dashboard;
