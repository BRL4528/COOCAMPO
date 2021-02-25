/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useCallback, useState, useEffect } from 'react';
import { FiChevronRight, FiEdit } from 'react-icons/fi';

import Button from '../../../components/Global/Button';
import ModalAddGoals from '../../../components/Admin/Modal/ModalAddGoals';
import ModalAddSubGoals from '../../../components/Admin/Modal/ModalAddSubGoals';
import ModalEditGoals from '../../../components/Admin/Modal/ModalEditGoal';

import api from '../../../services/api';

import {
  Container,
  CardeHeader,
  CardButton,
  TableContainer,
  ContainerInfo,
  TableInfo,
  CadView,
  ViewSubGoals,
} from './styles';

interface IGoals {
  id: string;
  name: string;
  status: string;
  weight: string;
  observations: string;
}

interface IDataGoals {
  id: string;
  name: string;
  status: string;
  weight: string;
  observations: string;
  sub_goals_of_goals: [
    {
      id: string;
      sub_goals: {
        id: string;
        name: string;
        status: string;
        observations: string;
      };
    },
  ];
}

const SelectorFolders: React.FC = () => {
  const [modalOpenGoals, setModalGoalsOpen] = useState(false);
  const [modalOpenSubGoals, setModalOpen] = useState(false);

  const [modalOpenEditGoals, setModalEditGoalsOpen] = useState(false);

  const [dataEditGoal, setDataEditGoal] = useState('');
  const [dataEditSubGoal, setDataEditSubGoal] = useState('');

  const [dataGoals, setDataGoals] = useState<IDataGoals[]>([]);
  const [dataTemp, setDataTemp] = useState({});

  const [itemSelected, setItemSelected] = useState('');

  const toggleModalGoals = useCallback(() => {
    setDataEditGoal('');
    setModalGoalsOpen(!modalOpenGoals);
  }, [modalOpenGoals]);

  const toggleModalEditGoals = useCallback(() => {
    setDataEditGoal('');
    setModalEditGoalsOpen(!modalOpenEditGoals);
  }, [modalOpenEditGoals]);

  const toggleModalSubgoals = useCallback(() => {
    setDataEditSubGoal('');
    setModalOpen(!modalOpenSubGoals);
  }, [modalOpenSubGoals]);

  const handleEditGoal = useCallback((idEditGoal: string) => {
    setModalEditGoalsOpen(true);
    setDataEditGoal(idEditGoal);
  }, []);

  const handleEditSubGoal = useCallback((idEditGoal: string) => {
    setModalOpen(true);
    setDataEditSubGoal(idEditGoal);
  }, []);

  useEffect(() => {
    api.get('/goals').then(response => {
      setDataGoals(response.data);
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

  const hanleSelectedItem = useCallback(
    id => {
      if (itemSelected === id) {
        setItemSelected('');
        return;
      }
      setItemSelected(id);
    },
    [itemSelected],
  );

  return (
    <>
      <ModalAddGoals
        isOpen={modalOpenGoals}
        setIsOpen={toggleModalGoals}
        handleGoals={handleGoals}
        dataEditGoal={dataEditGoal}
      />
      <ModalEditGoals
        isOpen={modalOpenEditGoals}
        setIsOpen={toggleModalEditGoals}
        handleGoals={handleGoals}
        dataEditGoal={dataEditGoal}
      />
      <ModalAddSubGoals
        isOpen={modalOpenSubGoals}
        setIsOpen={toggleModalSubgoals}
        dataEditSubGoal={dataEditSubGoal}
      />

      <Container>
        {/* Primeiro elemento */}
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

        <ContainerInfo>
          <div>
            <span>
              <input name="seach" />
            </span>
            <TableContainer>
              {dataGoals.map(dataGoal => (
                <button
                  type="button"
                  key={dataGoal.id}
                  onClick={() => hanleSelectedItem(dataGoal.id)}
                >
                  <div>
                    <strong>{dataGoal.name}</strong>
                    <p>{dataGoal.observations}</p>
                  </div>

                  <FiChevronRight size={20} />
                </button>
              ))}
            </TableContainer>
          </div>
          <div>
            <TableInfo>
              {dataGoals.map(itemGoal => (
                <CadView
                  key={itemGoal.id}
                  item={itemGoal.id}
                  selected={itemSelected}
                >
                  <span key={itemGoal.id}>
                    <div>
                      <strong>{itemGoal.name}</strong>
                      <p>{itemGoal.observations}</p>
                    </div>
                    <FiEdit onClick={() => handleEditGoal(itemGoal.id)} />
                  </span>
                  <ViewSubGoals>
                    <h3>Composição</h3>
                    {itemGoal.sub_goals_of_goals.map(sub => (
                      <span key={sub.id}>
                        <div>
                          <div>
                            <strong>{sub.sub_goals.name}</strong>
                            <p>{sub.sub_goals.observations}</p>
                          </div>
                          <FiEdit
                            size={20}
                            onClick={() => handleEditSubGoal(sub.sub_goals.id)}
                          />
                        </div>
                      </span>
                    ))}
                  </ViewSubGoals>
                </CadView>
              ))}
            </TableInfo>
          </div>
        </ContainerInfo>
      </Container>
    </>
  );
};

export default SelectorFolders;
