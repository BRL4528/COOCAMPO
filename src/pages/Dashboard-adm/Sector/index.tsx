/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useState, useRef } from 'react';
// import { Pie } from '@reactchartjs/react-chart.js';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { useReactToPrint } from 'react-to-print';

import {
  FiEdit,
  FiPrinter,
  FiMaximize,
  // FiTrendingDown,
  // FiTrendingUp,
} from 'react-icons/fi';
import GraphicBar from '../../../components/GraphicModels/GraphicBar';
import GraphicLine from '../../../components/GraphicModels/GraphicLine';
import GraphicSpeedometer from '../../../components/GraphicModels/GraphicSpeedometer';
import Table from '../../../components/DataTable';

import Button from '../../../components/Button';
import ModalAddGoals from '../../../components/ModalAddGoals';

import {
  Container,
  CardeHeader,
  CardButton,
  CardGraphic,
  GraphicTitle,
  // CardGoalsTrends,
  // TrendsTitle,
  // GoalItem,
  // Info,
  GraphicSpeed,
  CardBodyGoals,
  CardGraphicText,
  CardGraphicItem,
} from './styles';

const SelectorFolders: React.FC = () => {
  const handle = useFullScreenHandle();

  const componentRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <ModalAddGoals isOpen={modalOpen} setIsOpen={toggleModal} />
      <Container>
        <CardeHeader>
          <div>
            <h2>Setores</h2>
            <strong>Análise os setores da cooperativa.</strong>
          </div>

          <CardButton>
            <div>
              <Button onClick={toggleModal} type="button">
                Adicionar novo setor
              </Button>
            </div>
          </CardButton>
        </CardeHeader>

        <FullScreen handle={handle}>
          <CardGraphic className="fullscreen-item" ref={componentRef}>
            <CardGraphicText>
              <GraphicTitle>Financeiro</GraphicTitle>
              <span>
                <FiEdit />
                <FiPrinter onClick={handlePrint} />
                <FiMaximize onClick={handle.enter} />
              </span>
            </CardGraphicText>
            <CardBodyGoals>
              <CardGraphicItem>
                <CardGraphicText>
                  <GraphicTitle>Desempenho mensal</GraphicTitle>
                </CardGraphicText>
                <GraphicBar />
              </CardGraphicItem>
              <CardGraphicItem>
                <CardGraphicText>
                  <GraphicTitle>Desempenho mensal</GraphicTitle>
                </CardGraphicText>
                <GraphicLine />
              </CardGraphicItem>
            </CardBodyGoals>
            <CardBodyGoals>
              {/* <CardGoalsTrends>
                <TrendsTitle>
                  <h4>Metas trends - Janeiro a Fevereiro</h4>
                </TrendsTitle>
                <GoalItem trendUp>
                  <Info title="Uso de epi">
                    <p>Uso de epi</p>
                  </Info>
                  <strong>2,5%</strong>
                  <FiTrendingUp />
                </GoalItem>

                <GoalItem trendUp>
                  <Info title="Fechamentos">
                    <p>Fechamentos</p>
                  </Info>
                  <strong>1,5%</strong>
                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Horarios">
                    <p>Horarios</p>
                  </Info>
                  <strong>3%</strong>
                  <FiTrendingDown />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendUp>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
                <GoalItem trendDown>
                  <Info title="Cumprimento de orçamentos">
                    <p>Cumprimento de orçamentos</p>
                  </Info>
                  <strong>3%</strong>

                  <FiTrendingUp />
                </GoalItem>
              </CardGoalsTrends> */}

              <GraphicSpeed>
                <CardGraphicText>
                  <GraphicTitle>Meta 01</GraphicTitle>
                </CardGraphicText>
                <GraphicSpeedometer dataValue={150} />
              </GraphicSpeed>
              <GraphicSpeed>
                <CardGraphicText>
                  <GraphicTitle>Meta 02</GraphicTitle>
                </CardGraphicText>
                <GraphicSpeedometer dataValue={250} />
              </GraphicSpeed>
              <GraphicSpeed>
                <CardGraphicText>
                  <GraphicTitle>Meta 03</GraphicTitle>
                </CardGraphicText>
                <GraphicSpeedometer dataValue={450} />
              </GraphicSpeed>
            </CardBodyGoals>
            <Table />
          </CardGraphic>
        </FullScreen>
      </Container>
    </>
  );
};

export default SelectorFolders;
