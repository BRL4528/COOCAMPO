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
import api from '../../../services/api';

interface ITableSector {
  idSector: string;
  isOpen: boolean;
  month: string;
  setIsOpen: () => void;
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
    // "sub_goals_of_goals": []
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
  // resut: string;
  // "sub_goals_of_goals": []
}

// interface MonthData {
//   january?: number;
//   february?: number;
//   march?: number;
//   april?: number;
//   may?: number;
//   june?: number;
//   july?: number;
//   august?: number;
//   september?: number;
//   october?: number;
//   november?: number;
//   december?: number;
// }
interface ReturnFilterData {
  status: boolean;
  result: number;
}

const Table: React.FC<ITableSector> = ({ idSector, isOpen, month }) => {
  const tableRef = useRef(null);
  const [dataTableSector, setDataTableSector] = useState<ISectorFormated[]>([]);

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
            date: string;
          }[] = [];

          // const { januar } = month.split('/')[0];

          response.data.forEach(function (goaldata) {
            function filterResults() {
              if (goaldata.goals.result_of_goal.length) {
                const resultFiltered = goaldata.goals.result_of_goal.filter(
                  searchResult => {
                    return searchResult.sector_id === idSector;
                  },
                );
                // console.log(resultFiltered[0].april);

                switch (month.split('/')[1]) {
                  case 'january': {
                    const responseData = {
                      status: !!resultFiltered[0].january,
                      result:
                        Number(resultFiltered[0].january) === null
                          ? 0
                          : Number(resultFiltered[0].january),
                    };
                    return { responseData };
                  }
                  case 'february': {
                    const responseData = {
                      status: !!resultFiltered[0].february,
                      result:
                        Number(resultFiltered[0].february) === null
                          ? 0
                          : Number(resultFiltered[0].february),
                    };
                    return { responseData };
                  }
                  case 'march': {
                    const responseData = {
                      status: !!resultFiltered[0].march,
                      result:
                        Number(resultFiltered[0].march) === null
                          ? 0
                          : Number(resultFiltered[0].march),
                    };
                    return { responseData };
                  }
                  case 'april': {
                    const responseData = {
                      status: !!resultFiltered[0].april,
                      result:
                        Number(resultFiltered[0].april) === null
                          ? 0
                          : Number(resultFiltered[0].april),
                    };
                    return { responseData };
                  }
                  case 'may': {
                    const responseData = {
                      status: !!resultFiltered[0].may,
                      result:
                        Number(resultFiltered[0].may) === null
                          ? 0
                          : Number(resultFiltered[0].may),
                    };
                    return { responseData };
                  }
                  case 'june': {
                    const responseData = {
                      status: !!resultFiltered[0].june,
                      result:
                        Number(resultFiltered[0].june) === null
                          ? 0
                          : Number(resultFiltered[0].june),
                    };
                    return { responseData };
                  }
                  case 'july': {
                    const responseData = {
                      status: !!resultFiltered[0].july,
                      result:
                        Number(resultFiltered[0].july) === null
                          ? 0
                          : Number(resultFiltered[0].july),
                    };
                    return { responseData };
                  }
                  case 'august': {
                    const responseData = {
                      status: !!resultFiltered[0].august,
                      result:
                        Number(resultFiltered[0].august) === null
                          ? 0
                          : Number(resultFiltered[0].august),
                    };
                    return { responseData };
                  }
                  case 'september': {
                    const responseData = {
                      status: !!resultFiltered[0].september,
                      result:
                        Number(resultFiltered[0].september) === null
                          ? 0
                          : Number(resultFiltered[0].september),
                    };
                    return { responseData };
                  }
                  case 'october': {
                    const responseData = {
                      status: !!resultFiltered[0].october,
                      result:
                        Number(resultFiltered[0].october) === null
                          ? 0
                          : Number(resultFiltered[0].october),
                    };
                    return { responseData };
                  }
                  case 'november': {
                    const responseData = {
                      status: !!resultFiltered[0].november,
                      result:
                        Number(resultFiltered[0].november) === null
                          ? 0
                          : Number(resultFiltered[0].november),
                    };
                    return { responseData };
                  }
                  case 'december': {
                    const responseData = {
                      status: !!resultFiltered[0].december,
                      result:
                        Number(resultFiltered[0].december) === null
                          ? 0
                          : Number(resultFiltered[0].december),
                    };
                    return { responseData };
                  }
                  default: {
                    return;
                  }
                }
                // return resultFiltered.length
                //   ? Number(resultFiltered[0].result).toFixed(0)
                //   : 0;
              }
            }
            // eslint-disable-next-line no-undef

            console.log();
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
              date: format(new Date(month), "MMMM 'de' yyy", {
                locale: ptBR,
              }),
            };

            formatedInfoSector.push(goalUnit);
            // console.log(goalUnit);
          });
          setDataTableSector(formatedInfoSector);
        });
    }
  }, [idSector, isOpen, month]);

  const columns = [
    { title: 'Nome', field: 'name', width: 300 },
    { title: 'Peso', field: 'weight', hozAlign: 'center' },
    { title: 'Resultado', field: 'result', hozAlign: 'center' },
    {
      title: 'Volume',
      field: 'age',
      hozAlign: 'left',
      formatter: 'progress',
    },
    { title: 'Periodo', field: 'date', hozAlign: 'center' },
    {
      title: 'Avaliação',
      field: 'rating',
      hozAlign: 'center',
      formatter: 'star',
    },
    {
      title: 'Realizado',
      field: 'status',
      hozAlign: 'center',
      formatter: 'tickCross',
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
    groupStartOpen: false,
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
