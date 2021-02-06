import React, { useCallback, useState, useRef } from 'react';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import { useReactToPrint } from 'react-to-print';

import { FiEdit, FiPrinter, FiMaximize } from 'react-icons/fi';

import GraphicSpeedometer from '../../../components/GraphicModels/GraphicSpeedometer';

import Button from '../../../components/Button';
import ModalAddGoals from '../../../components/Modal/ModalAddGoals';

import {
  Container,
  CardeHeader,
  CardButton,
  CardGraphic,
  GraphicTitle,
  GraphicSpeed,
  CardBodyGoals,
  CardGraphicText,
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
          </CardGraphic>
        </FullScreen>
      </Container>
    </>
  );
};

export default SelectorFolders;
