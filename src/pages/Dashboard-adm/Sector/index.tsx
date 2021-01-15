/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useState } from 'react';

import { FiEdit, FiPrinter, FiMaximize } from 'react-icons/fi';

import Button from '../../../components/Button';
import ModalAddGoals from '../../../components/ModalAddGoals';

import {
  Container,
  CardeHeader,
  CardButton,
  CardGraphic,
  CardGraphicText,
  GraphicTitle,
} from './styles';

const SelectorFolders: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

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

        <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Financeiro</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>
          <div>
            <span>Uso de epi</span>
            <span>Uso de epi</span>
            <span>Uso de epi</span>
            <span>Uso de epi</span>
          </div>
        </CardGraphic>

        <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Contabilidade</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>
          {/* <GraphicBar /> */}
        </CardGraphic>

        <CardGraphic>
          <CardGraphicText>
            <GraphicTitle>Tecnologia da informação</GraphicTitle>
            <span>
              <FiEdit />
              <FiPrinter />
              <FiMaximize />
            </span>
          </CardGraphicText>
          {/* <GraphicBar /> */}
        </CardGraphic>
      </Container>
    </>
  );
};

export default SelectorFolders;
