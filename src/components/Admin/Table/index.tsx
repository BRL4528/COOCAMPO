/* eslint-disable use-isnan */
/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-duplicates */
import React, { useEffect, useRef, useState } from 'react';
import { React15Tabulator } from 'react-tabulator';

// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css';
import { api, apiGeninfo } from '../../../services/api';

interface ITableSector {
  idSector: string;
  isOpen?: boolean;
  startOpen: boolean;
  month: string;
  setIsOpen?: () => void;
}

interface ISectorData {
  id: string;
  status_of_conclusion: boolean;
  sector: {
    name: string;
    observations: string;
  };
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
  // date: string;
  weightGoal: string;
}

interface ISectorInfo {
  name: string;
  observations: string;
}

interface IGeninfo {
  status: boolean;
  response: [
    {
      painel: string;
      indicador: string;
      ano: number;
      mes: number;
      orcado: number;
      realizado: number;
      variacao: number;
      percentual: number;
    },
  ];
}

const Table: React.FC<ITableSector> = ({
  idSector,
  isOpen,
  month,
  startOpen,
}) => {
  const tableRef = useRef(null);
  const [dataTableSector, setDataTableSector] = useState<ISectorFormated[]>([]);

  const [infoSector, setInfoSector] = useState<ISectorInfo>();

  // const [dataSectorGoals, setDataSectorGoals] = useState<ISectorData[]>([]);

  useEffect(() => {
    if (idSector && idSector) {
      api
        .get<ISectorData[]>(`/goals-of-sectors?sector_id=${idSector}`)
        .then(response => {
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
            goal: string;
            // date: string;
          }[] = [];

          if (response.data.length >= 0) {
            setInfoSector(response.data[0].sector);
          }

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
                    return searchResult.sector_id === idSector;
                  },
                );

                const monthFormated = month.split('/')[1];
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
                    return;
                  }
                }
              }
            }

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

              goal: `${goaldata.goals.source}`,
              result: `${filterResults()?.responseData.result || 0}%`,
            };

            if (goaldata.goals.status === '2') {
              formatedInfoSector.push(goalUnit);
            }
          });
          setDataTableSector(formatedInfoSector);
        });
    }
  }, [idSector, isOpen, month]);

  useEffect(() => {
    try {
      if (infoSector) {
        console.log(infoSector);
        apiGeninfo
          .post<IGeninfo>('/paineis', {
            ano: Number(
              format(new Date(month), 'Y', {
                locale: ptBR,
              }),
            ),
            mesFinal: Number(
              format(new Date(month), 'M', {
                locale: ptBR,
              }),
            ),
            mesInicial: Number(
              format(new Date(month), 'M', {
                locale: ptBR,
              }),
            ),
            painel: infoSector?.observations,
          })
          .then(res => {
            console.log('resposta Geinfo', res.data);
            const { response } = res.data;
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
              goal: string;
              // date: string;
            }[] = [];
            response.forEach(function (dataGoal) {
              const goalUnit = {
                id: dataGoal.painel,
                name: dataGoal.indicador,
                status: false,

                weight: '1%',
                source: '2%',
                observations: 'nada',
                type:
                  dataGoal.indicador === '(PPR) % RESULTADO FINANCEIRO'
                    ? 'Meta global'
                    : 'Meta do setor',
                status_of_conclusion: false,
                weightGoal:
                  dataGoal.indicador === '(PPR) % RESULTADO FINANCEIRO'
                    ? '80%'
                    : '10%',

                goal: String(dataGoal.orcado),
                result: String(dataGoal.realizado),
              };
              formatedInfoSector.push(goalUnit);
            });
            setDataTableSector(formatedInfoSector);
            // setDataTableSector([...dataTableSector, formatedInfoSector]);
          });
      }
      // });
    } catch (err) {
      console.log(err);
    }
  }, [infoSector, month]);
  // }, [dataTableSector, infoSector]);

  const columns = [
    { title: 'Nome', field: 'name' },
    { title: 'Peso', field: 'weight', hozAlign: 'center', width: 100 },
    { title: 'Meta', field: 'goal', hozAlign: 'center', width: 150 },
    { title: 'Resultado', field: 'result', hozAlign: 'center', width: 150 },
    // {
    //   title: 'Volume',
    //   field: 'age',
    //   hozAlign: 'left',
    //   formatter: 'progress',
    //   width: 100,
    // },
    // { title: 'Periodo', field: 'date', hozAlign: 'center', width: 120 },
    // {
    //   title: 'Avaliação',
    //   field: 'rating',
    //   hozAlign: 'center',
    //   formatter: 'star',
    //   width: 120,
    // },
    {
      title: 'Realizado',
      field: 'status',
      hozAlign: 'center',
      formatter: 'tickCross',
      width: 120,
    },
  ];

  // const data = [
  //   {
  //     id: 1,
  //     name: 'Resultado financeiro',
  //     age: '12',
  //     weight: '80%',
  //     result: '75%',
  //     dob: 'Janeiro',
  //     rating: 5,
  //     passed: false,
  //     goal: 'Meta global',
  //     // subgoal: 'Meta global',
  //   },
  //   {
  //     id: 2,
  //     name: 'Incorformidades dos orçamentos',
  //     age: '1',
  //     weight: '1%',
  //     result: '1%',
  //     dob: 'Janeiro',
  //     rating: 4,
  //     passed: true,
  //     goal: 'Metas do setor',
  //   },
  //   {
  //     id: 3,
  //     name: 'Avaliação do gestor',
  //     age: '42',
  //     weight: '10%',
  //     result: '7%',
  //     dob: 'Outubro',
  //     rating: 4,
  //     passed: false,
  //     goal: 'Meta Individual',
  //     // subgoal: 'Meta Individual',
  //   },
  //   {
  //     id: 4,
  //     name: 'Dispêndios/Despesas com Pessoal',
  //     age: '125',
  //     weight: '0.5%',
  //     result: '0.5%',
  //     dob: 'Janeiro',
  //     rating: 4.5,
  //     passed: true,
  //     goal: 'Metas do setor',
  //     // subgoal: 'Metas do setor',
  //   },
  //   {
  //     id: 5,
  //     name: 'Manutenção de Máquinas e equipamentos',
  //     age: '16',
  //     weight: '0.5%',
  //     result: '0.5%',
  //     dob: 'Janeiro',
  //     rating: 4,
  //     passed: false,
  //     goal: 'Metas do setor',
  //   },
  //   {
  //     id: 6,
  //     name: 'Manutenção de Edifícios e Construção',
  //     age: '37',
  //     weight: '0.5%',
  //     result: '0.5%',
  //     dob: 'Janeiro',
  //     rating: 4,
  //     passed: true,
  //     goal: 'Metas do setor',
  //   },
  //   {
  //     id: 7,
  //     name: 'Atendimento as normas do MAPA',
  //     age: '37',
  //     weight: '2.5%',
  //     result: '2%',
  //     dob: 'Janeiro',
  //     rating: 4,
  //     passed: true,
  //     goal: 'Metas do setor',
  //   },
  //   {
  //     id: 8,
  //     name: 'Atendimento as normas da SST',
  //     age: '37',
  //     weight: '2.5%',
  //     result: '1.5%',
  //     dob: 'Janeiro',
  //     rating: 4,
  //     passed: true,
  //     goal: 'Metas do setor',
  //   },
  // ];
  const options = {
    groupBy: ['type'],
    layout: 'fitColumns',
    movableRows: true,
    groupStartOpen: startOpen,
    groupHeader: [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function (value: any, count: any, data: any[], group: any) {
        // console.log(count);

        // console.log('data', data);
        // console.log('group', group);

        const res = data.reduce((acumulador, corrente): any => {
          if (corrente.result) {
            return (
              Number(acumulador) + Number(corrente.result.replace('%', ''))
            );
          }
        }, 0);

        if (res.result) {
          // return `${value}, ${res.result}`;
          return `${value}<span style=' color: var(--text-primary); margin-left:10px;'>(Em ${format(
            new Date(month),
            'MMMM',
            {
              locale: ptBR,
            },
          ).toLowerCase()} este setor atingiu ${res.result} de ${
            res.weightGoal
          })</span>`;
        }

        // if (value === 'Meta Global') {
        // const result = group.group.component.rows.reduce(
        //   (
        //     acumulador: { data: { result: any } },
        //     corrente: { data: { result: any } },
        //   ) => {
        //     corrente.data.result + acumulador.data.result;
        //   },
        // );
        // console.log('teste', result);

        return `${value}<span style=' color: var(--text-primary); margin-left:10px;'>(Em ${format(
          new Date(month),
          'MMMM',
          {
            locale: ptBR,
          },
        ).toLowerCase()} este setor atingiu ${res}% de ${
          data[0].weightGoal
        })</span>`;

        // }

        // return `${value}<span style=' color: var(--text-primary); margin-left:10px;'>(Em Janeiro atingiu 50% de 75%)</span>`;

        // generate header contents for gender groups
      },
    ],
  };

  return (
    <React15Tabulator
      ref={tableRef}
      columns={columns}
      data={dataTableSector}
      // rowClick={this.rowClick}
      options={options}
      data-custom-attr="test-custom-attribute"
      className="custom-css-class"
    />
  );
};

export default Table;
