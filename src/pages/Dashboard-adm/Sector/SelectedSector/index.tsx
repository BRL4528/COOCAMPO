/* eslint-disable import/no-duplicates */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import ListGoalsOfSector from '../ListGoalsOfSector';

import { api, apiGeninfo } from '../../../../services/api';
import { CardeHeader, Navigation } from './styles';

interface SectorSelected {
  branch: string;
  codccu: string;
  email: string;
  leader: string;
  name: string;
  observations: string;
}

interface ISectorData {
  id: string;
  status_of_conclusion: boolean;

  goals: {
    id: string;
    name: string;
    status: string;
    weight: string;
    source: string;
    observations: string;
    type: string;

    result: string;
    date: string;
    sector_id: string;
    january?: number;
    february?: number;
    march?: number;
    april?: number;
    may?: number;
    june?: number;
    july?: number;
    august?: number;
    september?: number;
    october?: number;
    november?: number;
    december?: number;
    result_of_goal: [
      {
        id: string;
        result: string;
        date: string;
        sector_id: string;
        january?: number;
        february?: number;
        march?: number;
        april?: number;
        may?: number;
        june?: number;
        july?: number;
        august?: number;
        september?: number;
        october?: number;
        november?: number;
        december?: number;
      },
    ];
  };
}

interface ISectorFormated {
  id: string;
  name: string;
  status: boolean;
  weight: string;
  source: string;
  observations: string;
  type: string;
  status_of_conclusion: boolean;
  result: string;
  date: string;
  weightGoal: string;
}

const SelectedSector: React.FC = () => {
  const parsed = window.location.search;

  const [sectorSelected, setSectorSelected] = useState<SectorSelected>();
  const [dataSector, setDataTableSector] = useState<ISectorFormated[]>([]);

  useEffect(() => {
    try {
      apiGeninfo.get('/paineis').then(response => {
        console.log('Geninfo', response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      api
        .get(`sectors/show?sector_id=${parsed.substring(1)}`)
        .then(response => {
          console.log('setor', response.data);
          setSectorSelected(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [parsed]);

  useEffect(() => {
    api
      .get<ISectorData[]>(`/goals-of-sectors?sector_id=${parsed.substring(1)}`)
      .then(response => {
        console.log('antes de formatar', response.data);
        const formatedInfoSector: {
          id: string;
          name: string;
          status: boolean;
          weight: string;
          source: string;
          observations: string;
          type: string;
          status_of_conclusion: boolean;
          weightGoal: string;
          result: string;
          date: string;
        }[] = [];

        response.data.forEach(function (goaldata) {
          function calcResult(result: number, budgeted: number) {
            const value = result / budgeted - 1;
            if (value < 0) {
              const calcValue = value * -1;

              if (calcValue <= 0.15) {
                return goaldata.goals.weight;
              }

              if (calcValue >= 0.16) {
                return 0;
              }
            }
            if (value > 0 && value <= 0.15) {
              return goaldata.goals.weight;
            }
            return 0;
          }

          function filterResults() {
            if (goaldata.goals.result_of_goal.length) {
              const resultFiltered = goaldata.goals.result_of_goal.filter(
                searchResult => {
                  return searchResult.sector_id === parsed.substring(1);
                },
              );

              // console.log(resultFiltered[0].april);
              const month = format(new Date(), 'MMMM', {
                locale: ptBR,
              });

              const monthFormated = month;
              switch (monthFormated) {
                case 'january': {
                  const responseData = {
                    status: String(resultFiltered[0].january) !== 'NaN',
                    result:
                      String(resultFiltered[0].january) === 'NaN'
                        ? 0
                        : calcResult(
                            Number(resultFiltered[0].january),
                            Number(goaldata.goals.january),
                          ),
                  };
                  return { responseData };
                }
                case 'february': {
                  const responseData = {
                    status: String(resultFiltered[0].february) !== 'NaN',
                    result:
                      String(resultFiltered[0].february) === 'NaN'
                        ? 0
                        : calcResult(
                            Number(resultFiltered[0].february),
                            Number(goaldata.goals.february),
                          ),
                  };
                  return { responseData };
                }
                case 'march': {
                  const responseData = {
                    status: String(resultFiltered[0].march) !== 'NaN',
                    result:
                      String(resultFiltered[0].march) === 'NaN'
                        ? 0
                        : calcResult(
                            Number(resultFiltered[0].march),
                            Number(goaldata.goals.march),
                          ),
                  };
                  return { responseData };
                }
                case 'april': {
                  const responseData = {
                    status: String(resultFiltered[0].april) !== 'NaN',
                    result:
                      String(resultFiltered[0].april) === 'NaN'
                        ? 0
                        : calcResult(
                            Number(resultFiltered[0].april),
                            Number(goaldata.goals.april),
                          ),
                  };
                  return { responseData };
                }
                case 'may': {
                  const responseData = {
                    status: String(resultFiltered[0].may) !== 'NaN',
                    result:
                      String(resultFiltered[0].may) === 'NaN'
                        ? 0
                        : calcResult(
                            Number(resultFiltered[0].may),
                            Number(goaldata.goals.may),
                          ),
                  };
                  return { responseData };
                }
                case 'june': {
                  const responseData = {
                    status: String(resultFiltered[0].june) !== 'NaN',
                    result:
                      String(resultFiltered[0].june) === 'NaN'
                        ? 0
                        : calcResult(
                            Number(resultFiltered[0].june),
                            Number(goaldata.goals.june),
                          ),
                  };
                  return { responseData };
                }
                case 'july': {
                  const responseData = {
                    status: String(resultFiltered[0].july) !== 'NaN',
                    result:
                      String(resultFiltered[0].july) === 'NaN'
                        ? 0
                        : calcResult(
                            Number(resultFiltered[0].july),
                            Number(goaldata.goals.july),
                          ),
                  };
                  return { responseData };
                }
                case 'august': {
                  const responseData = {
                    status: String(resultFiltered[0].august) !== 'NaN',
                    result:
                      String(resultFiltered[0].august) === 'NaN'
                        ? 0
                        : calcResult(
                            Number(resultFiltered[0].august),
                            Number(goaldata.goals.august),
                          ),
                  };
                  return { responseData };
                }
                case 'september': {
                  const responseData = {
                    status: String(resultFiltered[0].september) !== 'NaN',
                    result:
                      String(resultFiltered[0].september) === 'NaN'
                        ? 0
                        : calcResult(
                            Number(resultFiltered[0].september),
                            Number(goaldata.goals.september),
                          ),
                  };
                  return { responseData };
                }
                case 'october': {
                  const responseData = {
                    status: String(resultFiltered[0].october) !== 'NaN',
                    result:
                      String(resultFiltered[0].october) === 'NaN'
                        ? 0
                        : calcResult(
                            Number(resultFiltered[0].october),
                            Number(goaldata.goals.october),
                          ),
                  };
                  return { responseData };
                }
                case 'november': {
                  const responseData = {
                    status: String(resultFiltered[0].november) !== 'NaN',
                    result:
                      String(resultFiltered[0].november) === 'NaN'
                        ? 0
                        : calcResult(
                            Number(resultFiltered[0].november),
                            Number(goaldata.goals.november),
                          ),
                  };
                  return { responseData };
                }
                case 'december': {
                  const responseData = {
                    status: String(resultFiltered[0].december) !== 'NaN',
                    result:
                      String(resultFiltered[0].december) === 'NaN'
                        ? 0
                        : calcResult(
                            Number(resultFiltered[0].december),
                            Number(goaldata.goals.december),
                          ),
                  };
                  return { responseData };
                }
                default: {
                  break;
                }
              }
              // return resultFiltered.length
              //   ? Number(resultFiltered[0].result).toFixed(0)
              //   : 0;
            }
          }
          // eslint-disable-next-line no-undef

          const goalUnit = {
            id: goaldata.goals.id,
            name: goaldata.goals.name,
            status: filterResults()?.responseData.status || false,

            weight: `${goaldata.goals.weight}%`,
            source: `${goaldata.goals.source}%`,
            observations: goaldata.goals.observations,
            type: goaldata.goals.type,
            status_of_conclusion: goaldata.status_of_conclusion,
            weightGoal: goaldata.goals.type === 'Meta global' ? '80%' : '10%',
            age: goaldata.goals.weight,
            rating: goaldata.goals.weight,
            // result: `${filterResults() && 0}%`,
            result: `${filterResults()?.responseData.result || 0}%`,
            date: format(new Date(), "MMMM 'de' yyy", {
              locale: ptBR,
            }),
          };

          formatedInfoSector.push(goalUnit);
          // console.log(goalUnit);
        });
        console.log('farmatado', formatedInfoSector);
        setDataTableSector(formatedInfoSector);
      });
  }, [parsed]);

  return (
    <>
      <CardeHeader className="iconPrint">
        <div>
          <h2>{sectorSelected?.name}</h2>
        </div>
      </CardeHeader>
      <Navigation>
        <div>
          <p>Metas</p>

          <p>Resultado</p>
        </div>
      </Navigation>

      {dataSector.map(infoSector => (
        <ListGoalsOfSector
          key={infoSector.id}
          titleText={infoSector.name}
          subtitle={infoSector.type}
        />
      ))}
    </>
  );
};

export default SelectedSector;
