/* eslint-disable use-isnan */
/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-duplicates */
import React, { useRef } from 'react';
import { React15Tabulator } from 'react-tabulator';

// eslint-disable-next-line import/no-duplicates
// import { format } from 'date-fns';
// import ptBR from 'date-fns/locale/pt-BR';

import 'react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css';
// import api from '../../../services/api';

const Table: React.FC = () => {
  const tableRef = useRef(null);

  const columns = [
    {
      title: 'Nome',
      field: 'name',
      width: 300,
    },
    { title: 'Fev/2021', field: 'month', hozAlign: 'center' },
    { title: 'Acumulado', field: 'result', hozAlign: 'center' },
  ];

  const data = [
    {
      id: 1,
      name: 'Ingresso/Receita Operacional Bruta',
      month: '-R$ 56.952.368',
      result: 'R$ 118.168.198',
      goal: 'Meta global',
    },
    {
      id: 2,
      name: 'Impostos',
      month: '-R$ 1.179.335',
      result: '-R$ 2.107.179',
      goal: 'Meta global',
    },
    {
      id: 3,
      name: 'Ingresso Receita Operacional Liquida',
      month: 'R$ 55.773.033',
      result: 'R$ 116.061.019',
      goal: 'Meta global',
    },
    {
      id: 4,
      name: 'Custo Produto Vendido',
      month: '-R$ 50.807.774',
      result: '-R$ 104.713.082',
      goal: 'Meta global',
    },
    {
      id: 4,
      name: 'Sobra/Lucro Operacional Bruto',
      month: 'R$ 4.965.259',
      result: 'R$ 11.347.937',
      goal: 'Meta global',
    },
    {
      id: 4,
      name: 'Dispêndios/Despesas Operacionais',
      month: '-R$ 2.466.085',
      result: '-R$ 5.029.512',
      goal: 'Meta global',
    },
    {
      id: 5,
      name: 'Outros ingressos ou dispêndios',
      month: '-R$ 1.208.234',
      result: '-R$ 1.345.423',
      goal: 'Meta global',
    },
    {
      id: 6,
      name: 'Resultado Financeiro',
      month: '-R$ 537.653',
      result: '-R$ 1.260.329',
      goal: 'Meta global',
    },
    {
      id: 7,
      name: 'Resultado Antes IR e CS',
      month: 'R$ 753.288',
      result: 'R$ 3.712.674',
      goal: 'Meta global',
    },
    {
      id: 8,
      name: 'IR e CS',
      month: '-R$ 39.495',
      result: '-R$ 73.351',
      goal: 'Meta global',
    },
    {
      id: 9,
      name: 'Resultado liquido do exercicio',
      month: 'R$ 713.793',
      result: 'R$ 3.639.323',
      goal: 'Meta global',
    },
    {
      id: 10,
      name: 'Margem Líquida/Rentabilidade',
      month: '1,28%',
      result: '3,14%',
      goal: 'Meta global',
    },
  ];

  const options = {
    groupBy: ['type'],
    layout: 'fitColumns',
    movableRows: true,
    groupStartOpen: true,
    groupHeader: [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function () {
        // console.log(count);

        // console.log('data', data);
        // console.log('group', group);

        //   if (corrente.result) {
        //     return (
        //       Number(acumulador) + Number(corrente.result.replace('%', ''))
        //     );
        //   }
        // }, 0);

        // if (res.result) {
        //   // return `${value}, ${res.result}`;
        //   return `${value}<span style=' color: var(--text-primary); margin-left:10px;'>(Em ${format(
        //     new Date(month),
        //     'MMMM',
        //     {
        //       locale: ptBR,
        //     },
        //   ).toLowerCase()} este setor atingiu ${res.result} de ${
        //     res.weightGoal
        //   })</span>`;
        // }

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

        // return `${value}<span style=' color: var(--text-primary); margin-left:10px;'>(Em ${format(
        //   new Date(month),
        //   'MMMM',
        //   {
        //     locale: ptBR,
        //   },
        // ).toLowerCase()} este setor atingiu ${res}% de ${
        //   data[0].weightGoal
        // })</span>`;

        // // }

        return `Meta global`;

        // generate header contents for gender groups
      },
    ],
  };

  return (
    <React15Tabulator
      ref={tableRef}
      columns={columns}
      data={data}
      // rowClick={this.rowClick}
      options={options}
      data-custom-attr="test-custom-attribute"
      className="custom-css-class"
    />
  );
};

export default Table;
