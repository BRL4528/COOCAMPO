/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';

import { Container, CardContainer } from './styles';

import CheckboxInput from '../../../components/InputRadio';
import Button from '../../../components/Button';

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

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

const PainelAnalyticModule: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const parsed = window.location.search;

  const [dataGoalsAnalytic, setDataGoalsAnalytic] = useState<IGoalsAnalytics[]>(
    [],
  );

  const handleSubmit = useCallback((data: CheckboxOption) => {
    const result = Object.values(data).map(dataItem => dataItem[0].split('#'));

    const value = result.map(res => ({
      id_sector: res[0],
      id_result: res[1],
      id_subGoal: res[2],
      id_goal: res[3],
    }));

    console.log(value);
  }, []);

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

            <Form ref={formRef} onSubmit={handleSubmit}>
              {dataAnalytic.goals.sub_goals_of_goals.map(dataSubGoal => (
                <div key={dataSubGoal.id}>
                  <div>
                    <strong>{dataSubGoal.sub_goals.name}</strong>
                  </div>

                  <CheckboxInput
                    name={`sim-${dataSubGoal.id}`}
                    options={[
                      {
                        id: dataSubGoal.sub_goals.id,
                        value: `${dataAnalytic.sector.id}#yes#${dataAnalytic.goals.id}#${dataSubGoal.sub_goals.id}`,
                        label: 'Sim',
                      },
                    ]}
                  />
                  <CheckboxInput
                    name={`nao-${dataSubGoal.id}`}
                    options={[
                      {
                        id: dataSubGoal.sub_goals.id,
                        value: `${dataAnalytic.sector.id}#no#${dataAnalytic.goals.id}#${dataSubGoal.sub_goals.id}`,
                        label: 'Não',
                      },
                    ]}
                  />
                </div>
              ))}
              <Button type="submit">Salvar</Button>
            </Form>
          </div>
        </CardContainer>
      ))}
    </Container>
  );
};

export default PainelAnalyticModule;
