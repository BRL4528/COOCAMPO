/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

import { Container, CardContainer } from './styles';

interface IGoalsAnalytics {
  id: string;
  sector: {
    id: string;
    name: string;
    leader: string;
  };
  goals: {
    id: string;
    name: string;
    status: string;
    weight: string;
    source: string;
    observations: string;
    type: string;
    sub_goals_of_goals: [
      {
        id: string;
        sub_goals: {
          id: string;
          name: string;
        };
      },
    ];
  };
}

const PainelAnalyticModule: React.FC = () => {
  const parsed = window.location.search;
  // console.log(parsed.slice(1));
  // console.log(parsed);'
  const [dataGoalsAnalytic, setDataGoalsAnalytic] = useState<IGoalsAnalytics[]>(
    [],
  );

  useEffect(() => {
    try {
      api.get(`goals-of-sectors?goal_id=${parsed.slice(1)}`).then(response => {
        setDataGoalsAnalytic(response.data);
        console.log(response.data, dataGoalsAnalytic);
      });
    } catch (err) {
      console.log(err);
    }
  }, [parsed]);

  return (
    <Container>
      <header>
        <h1>Painel Modulo de Analise</h1>
      </header>

      {dataGoalsAnalytic.map(dataAnalytic => (
        <CardContainer key={dataAnalytic.id}>
          <div>
            <h2>{dataAnalytic.sector.name}</h2>
            <h3>{dataAnalytic.goals.name}</h3>

            {dataAnalytic.goals.sub_goals_of_goals.map(dataSubGoal => (
              <div>
                <div>
                  <strong>{dataSubGoal.sub_goals.name}</strong>
                </div>

                <input id="teste1" type="radio" value="MALE" name="gender" />
                <label htmlFor="teste1">Sim</label>
                <input id="teste2" type="radio" value="FEMALE" name="gender" />
                <label htmlFor="teste2">Não</label>
              </div>
            ))}
          </div>
        </CardContainer>
      ))}
    </Container>
  );
};

export default PainelAnalyticModule;
