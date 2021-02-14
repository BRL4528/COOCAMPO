import React from 'react';

import DataTable from 'react-data-table-component';

const Table: React.FC = () => {
  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };

  const columns = [
    {
      name: 'Nome',
      selector: 'nome',
      sortable: true,
    },
    {
      name: 'Peso',
      selector: 'peso',
      sortable: true,
      right: true,
    },
    {
      name: 'Situação',
      selector: 'situacao',
      sortable: true,
      right: true,
    },
    {
      name: 'Editar',
      selector: 'editar',
      sortable: true,
      right: true,
    },
  ];

  const data = [
    {
      id: 1,
      nome: 'Cumprimento dos orçamentos',
      peso: '40%',
      meta: '1,50% => 2,75%',
      prazo: 'DEZ/2021',
      janeiro: '2,5%',
      fevereiro: '2,5%',
      marco: '2,5%',
    },
    {
      id: 2,
      nome: 'Cumprimento dos orçamentos',
      peso: '80%',
      meta: '1,50% => 2,75%',
      prazo: 'DEZ/2021',
      janeiro: '2,5%',
      fevereiro: '2,5%',
      marco: '2,5%',
    },
    {
      id: 3,
      nome: 'Cumprimento dos orçamentos',
      peso: '10%',
      meta: '1,50% => 2,75%',
      prazo: 'DEZ/2021',
      janeiro: '2,5%',
      fevereiro: '2,5%',
      marco: '2,5%',
    },
  ];
  return (
    <DataTable
      title="Metas do setor"
      columns={columns}
      customStyles={customStyles}
      data={data}
    />
  );
};
export default Table;
