import React, { useCallback, useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import Button from '../../../components/Global/Button';
import ModalAddGoals from '../../../components/Admin/Modal/ModalAddGoals';
import ModalAddSubGoals from '../../../components/Admin/Modal/ModalAddSubGoals';

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

  const [dataGoals, setDataGoals] = useState<IDataGoals[]>([]);
  const [dataTemp, setDataTemp] = useState({});

  const [itemSelected, setItemSelected] = useState('');

  const toggleModalGoals = useCallback(() => {
    setModalGoalsOpen(!modalOpenGoals);
  }, [modalOpenGoals]);

  const toggleModalSubgoals = useCallback(() => {
    setModalOpen(!modalOpenSubGoals);
  }, [modalOpenSubGoals]);

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
      />
      <ModalAddSubGoals
        isOpen={modalOpenSubGoals}
        setIsOpen={toggleModalSubgoals}
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
              {dataGoals.map(subgoal => (
                <button
                  type="button"
                  key={subgoal.id}
                  onClick={() => hanleSelectedItem(subgoal.id)}
                >
                  <div>
                    <strong>{subgoal.name}</strong>
                    <p>{subgoal.observations}</p>
                  </div>

                  <FiChevronRight size={20} />
                </button>
              ))}
            </TableContainer>
          </div>
          <div>
            <TableInfo>
              {dataGoals.map(subgoal => (
                <CadView
                  key={subgoal.id}
                  item={subgoal.id}
                  selected={itemSelected}
                >
                  <span key={subgoal.id}>
                    <div>
                      <strong>{subgoal.name}</strong>
                      <p>{subgoal.observations}</p>
                    </div>
                  </span>
                  <ViewSubGoals>
                    <h3>Composição</h3>
                    {subgoal.sub_goals_of_goals.map(sub => (
                      <span key={sub.sub_goals.id}>
                        <div>
                          <strong>{sub.sub_goals.name}</strong>
                          <p>{sub.sub_goals.observations}</p>
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
