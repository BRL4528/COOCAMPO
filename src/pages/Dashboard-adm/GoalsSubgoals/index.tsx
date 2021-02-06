/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useState, useEffect } from 'react';

import Button from '../../../components/Button';
import ModalAddGoals from '../../../components/Modal/ModalAddGoals';
import ModalAddSubGoals from '../../../components/Modal/ModalAddSubGoals';

import api from '../../../services/api';

import { Container, CardeHeader, CardButton, TableContainer } from './styles';

interface IGoals {
  id: string;
  name: string;
  status: string;
  weight: string;
  observations: string;
}

const SelectorFolders: React.FC = () => {
  const [modalOpenGoals, setModalGoalsOpen] = useState(false);
  const [modalOpenSubGoals, setModalOpen] = useState(false);
  const [dataSubGoals, setDataSubGoals] = useState<IGoals[]>([]);
  const [dataTemp, setDataTemp] = useState({});

  const toggleModalGoals = useCallback(() => {
    setModalGoalsOpen(!modalOpenGoals);
  }, [modalOpenGoals]);

  const toggleModalSubgoals = useCallback(() => {
    setModalOpen(!modalOpenSubGoals);
  }, [modalOpenSubGoals]);

  useEffect(() => {
    api.get('/goals').then(response => {
      setDataSubGoals(response.data);
    });
  }, [dataTemp]);

  const handleGoals = useCallback((goal: Omit<IGoals, 'id'>) => {
    try {
      const temp = goal;
      setDataTemp(temp);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <ModalAddGoals
        isOpen={modalOpenGoals}
        setIsOpen={toggleModalGoals}
        handleGoals={handleGoals}
      />
      <ModalAddSubGoals
        isOpen={modalOpenSubGoals}
        setIsOpen={toggleModalSubgoals}
      />

      <Container>
        <CardeHeader>
          <div>
            <h2>Metas e Submetas</h2>
            <strong>Cadastre novas metas ou edite metas existentes</strong>
          </div>

          <CardButton>
            <div>
              <Button onClick={toggleModalGoals} type="button">
                Criar nova meta
              </Button>
            </div>
            <div>
              <Button onClick={toggleModalSubgoals} groud type="button">
                Criar Submeta
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
                <th>Situação</th>

                <th />
              </tr>
            </thead>

            <tbody>
              {dataSubGoals.map(subgoal => (
                <tr key={subgoal.id}>
                  <td>
                    <h3>{subgoal.name}</h3>
                  </td>
                  <td>{subgoal.weight}</td>
                  <td>{subgoal.status}</td>
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
