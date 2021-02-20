/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';

import { FiChevronRight } from 'react-icons/fi';

import Button from '../../../components/Global/Button';
import ModalAddGoals from '../../../components/Admin/Modal/ModalAddAnalyticModule';
import api from '../../../services/api';

import {
  Container,
  CardeHeader,
  CardButton,
  TableContainerList,
} from './styles';

interface IAnalyticModule {
  id: string;
  url?: string;
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
        <iframe
          src="https://open.spotify.com/embed/track/54OBgO0Xwu20Jak9TMXbR7"
          width="250"
          height="80"
          frameBorder="0"
          // allowtransparency="true"
          allow="encrypted-media"
        />
        <iframe
          src="https://open.spotify.com/embed/track/3FAJ6O0NOHQV8Mc5Ri6ENp"
          width="250"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
        />
        <iframe
          src="https://open.spotify.com/embed/track/5GRf6zSrCi8gErdN6CyRJT"
          width="250"
          height="80"
          frameBorder="0"
          // allowtransparency="true"
          allow="encrypted-media"
        />

        <iframe
          src="https://open.spotify.com/embed/track/3QdYdYTLk3fL3f9CJ4ZS59"
          width="250"
          height="80"
          frameBorder="0"
          // allowtransparency="true"
          allow="encrypted-media"
        />

        <iframe
          src="https://open.spotify.com/embed/track/08E0TIudwefGjA27W4zrnf"
          width="250"
          height="80"
          frameBorder="0"
          // allowtransparency="true"
          allow="encrypted-media"
        />

        <iframe
          src="https://open.spotify.com/embed/track/08fDeQNLTu0bZnT6tRcXUP"
          width="250"
          height="80"
          frameBorder="0"
          // allowtransparency="true"
          allow="encrypted-media"
        />
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

        {/* <TableContainer>
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
        </TableContainer> */}

        <TableContainerList>
          {dataAnalyticModule.map(analyticModule => (
            <span key={analyticModule.id}>
              <div>
                <strong>{analyticModule.name}</strong>
                <p>{analyticModule.observations}</p>
                <a href={analyticModule.url}>Painel módulo de ánalise</a>
              </div>

              <FiChevronRight size={20} />
            </span>
          ))}
        </TableContainerList>
        {/* <TableInfo>
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
          </TableInfo> */}
      </Container>
    </>
  );
};

export default SelectorFolders;
