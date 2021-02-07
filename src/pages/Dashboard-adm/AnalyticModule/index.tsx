/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';

import Button from '../../../components/Button';
import ModalAddGoals from '../../../components/Modal/ModalAddAnalyticModule';
import api from '../../../services/api';

import { Container, CardeHeader, CardButton, TableContainer } from './styles';

interface IAnalyticModule {
  id: string;
  name: string;
  responsible: string;
  condition: string;
  observations: string;
}

const SelectorFolders: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataAnalytic, setDataAnalytic] = useState<IAnalyticModule>();

  const [dataAnalyticModule, setDataAnalyticModule] = useState<
    IAnalyticModule[]
  >([]);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  useEffect(() => {
    api.get('/analysis-module').then(response => {
      setDataAnalyticModule(response.data);
    });
  }, [dataAnalytic]);

  const handleAnalytic = useCallback(
    (analytic: Omit<IAnalyticModule, 'status'>) => {
      try {
        const temp = analytic;
        setDataAnalytic(temp);
      } catch (err) {
        console.log(err);
      }
    },
    [],
  );

  return (
    <>
      <ModalAddGoals
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAnalytic={handleAnalytic}
      />
      <Container>
        <CardeHeader>
          <div>
            <h2>Módulo de Análise</h2>
            <strong>Verifique as formas de inserção de dados manuais.</strong>
          </div>

          <CardButton>
            <div>
              <Button onClick={toggleModal} type="button">
                Criar novo módulo de análise
              </Button>
            </div>
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
              {dataAnalyticModule.map(analyticModule => (
                <tr key={analyticModule.id}>
                  <td>
                    <h3>{analyticModule.name}</h3>
                  </td>
                  <td>10%</td>
                  <td>Submetas</td>
                  <td>Dezembro 2021</td>
                  <td>On/Off</td>
                  <td>...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default SelectorFolders;
