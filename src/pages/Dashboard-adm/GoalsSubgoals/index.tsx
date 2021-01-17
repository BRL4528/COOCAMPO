/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useState } from 'react';

import Button from '../../../components/Button';
import ModalAddGoals from '../../../components/ModalAddGoals';

import { Container, CardeHeader, CardButton, TableContainer } from './styles';

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
            <h2>Metas e Submetas</h2>
            <strong>Cadastre novas metas ou edite metas existentes</strong>
          </div>

          <CardButton>
            <div>
              <Button onClick={toggleModal} type="button">
                Criar nova meta
              </Button>
            </div>
            {/* <div>
              <Button groud type="button">
                Criar Submeta
              </Button>
            </div> */}
          </CardButton>
        </CardeHeader>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th />
                <th>Peso</th>
                <th>Resultado previsto</th>
                <th>Prazo</th>
                <th>Variação</th>
                <th />
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <h3>Cumprimentos de orçamento</h3>
                </td>
                <td>10%</td>
                <td>Submetas</td>
                <td>Dezembro 2021</td>
                <td>On/Off</td>
                <td>...</td>
              </tr>

              <tr>
                <td>
                  <h3>Mortalidade de leitoes</h3>
                </td>
                <td>10%</td>
                <td>Submetas</td>
                <td>Dezembro 2021</td>
                <td>On/Off</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>

        {/* <CardSelector>
        <CardTitle>
          Metas e Submetas
        </CardTitle>
        <CardTitle>
          Setor
        </CardTitle>
        <CardTitle>
          Colaborador
        </CardTitle>
        <CardTitle>
          Módulos de
        </CardTitle>
      </CardSelector> */}
      </Container>
    </>
  );
};

export default SelectorFolders;
