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
      },
    ];
    // "sub_goals_of_goals": []
  };
}

interface ISectorFormated {
  id: string;
  name: string;
  status: string;
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

// interface IGroup {
//   group: {
//     elementContents: string;
//     key: string;
//     component: {
//       rows: [
//         {
//           data: {
//             result: number;
//           };
//         },
//       ];
//     };
//   };
// }

const Table: React.FC<ITableSector> = (idSector, isOpen) => {
  const tableRef = useRef(null);
  const [dataTableSector, setDataTableSector] = useState<ISectorFormated[]>([]);

  // const [dataSectorGoals, setDataSectorGoals] = useState<ISectorData[]>([]);

  useEffect(() => {
    if (idSector.idSector && idSector.isOpen) {
      api
        .get<ISectorData[]>(`/goals-of-sectors?sector_id=${idSector.idSector}`)
        .then(response => {
          const formatedInfoSector: {
            id: string;
            name: string;
            status: string;
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
            // console.log(goaldata);

            function filterResults() {
              if (goaldata.goals.result_of_goal.length) {
                const resultFiltered = goaldata.goals.result_of_goal.filter(
                  searchResult => {
                    return searchResult.sector_id === idSector.idSector;
                  },
                );

                // console.log(resultFiltered);
                return resultFiltered.length
                  ? Number(resultFiltered[0].result).toFixed(0)
                  : '0.';
              }
            }
            const goalUnit = {
              id: goaldata.goals.id,
              name: goaldata.goals.name,
              status: goaldata.goals.status,
              weight: `${goaldata.goals.weight}%`,
              source: `${goaldata.goals.source}%`,
              observations: goaldata.goals.observations,
              type: goaldata.goals.type,
              status_of_conclusion: goaldata.status_of_conclusion,
              weightGoal: goaldata.goals.type === 'Meta global' ? '80%' : '10%',
              result: `${
                filterResults() === undefined ? '0.' : filterResults()
                // filterResults()
                // Number(
                //     goaldata.goals.result_of_goal.filter(
                //       searchResult =>
                //         searchResult.sector_id === idSector.idSector,
                //     )[0].result,
                //   ).toFixed(0)
                // Number(goaldata.goals.result_of_goal[0].result).toFixed(0)
              }%`,
              date:
                goaldata.goals.result_of_goal.length <= 0
                  ? format(new Date(), "MMMM 'de' yyy", {
                      locale: ptBR,
                    })
                  : format(
                      new Date(goaldata.goals.result_of_goal[0].date),
                      "MMMM 'de' yyy",
                      {
                        locale: ptBR,
                      },
                    ),
            };

            formatedInfoSector.push(goalUnit);
            // console.log(response.data);
          });
          // console.log(formatedInfoSector);
          setDataTableSector(formatedInfoSector);
        });
    }
  }, [idSector, isOpen]);

  const columns = [
    { title: 'Nome', field: 'name', width: 300 },
    { title: 'Peso', field: 'weight', hozAlign: 'center' },
    { title: 'Resultado', field: 'result', hozAlign: 'center' },
    {
      title: 'Progresso',
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
      field: 'status_of_conclusion',
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
      function (value: any, count: any, data: ISectorFormated[], group: any) {
        // console.log(count);

        // console.log('data', data);
        // console.log('group', group);

        const res = data.reduce((acumulador, corrente): any => {
          // console.log('ver numero', Number(acumulador.result.substring(0, 1)));
          return (
            Number(acumulador.result.substring(0, 2)) +
            Number(corrente.result.substring(0, 2))
          );
        });

        if (res.result) {
          // return `${value}, ${res.result}`;
          return `${value}<span style=' color: var(--text-primary); margin-left:10px;'>(Em ${res.date} este setor atingiu ${res.result} de ${res.weightGoal})</span>`;
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

        return `${value}<span style=' color: var(--text-primary); margin-left:10px;'>(Em ${data[0].date} este setor atingiu ${res}% de ${data[0].weightGoal})</span>`;

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
