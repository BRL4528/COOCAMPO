/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-duplicates */
/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useState } from 'react';

// import { format } from 'date-fns';
// import ptBR from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';

import { api, apiGeninfo } from '../../../../services/api';
import { CardeHeader, Navigation, CardTable } from './styles';

import Table from '../../../../components/Admin/Table';
import Button from '../../../../components/Global/Button';
import Select from '../../../../components/Global/SelectRelease';

interface SectorSelected {
  branch: string;
  codccu: string;
  email: string;
  leader: string;
  name: string;
  observations: string;
}

const SelectedSector: React.FC = () => {
  const parsed = window.location.search;
  const path = window.location.pathname;

  const [sectorSelected, setSectorSelected] = useState<SectorSelected>();
  const [subject, setSubject] = useState('01/january/2021');
  const [loadingSectors, setLoadingSectors] = useState(true);

  useEffect(() => {
    try {
      api
        .get(`sectors/show?sector_id=${parsed.substring(1)}`)
        .then(response => {
          setSectorSelected(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [parsed]);

  useEffect(() => {
    try {
      apiGeninfo.get('/paineis').then(response => {
        console.log('Geninfo', response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleLoadingSectors = useCallback(() => {
    setLoadingSectors(!loadingSectors);
  }, [loadingSectors]);

  const handleSubject = useCallback(
    e => {
      setLoadingSectors(false);
      setSubject(e);
    },
    [setSubject],
  );

  return (
    <>
      <CardeHeader className="iconPrint">
        <div>
          <h2>{sectorSelected?.name}</h2>
          <strong>{sectorSelected?.observations}</strong>
        </div>
      </CardeHeader>
      <Navigation>
        <div>
          <a href="#">
            <p className={path === '/sector-resume' ? 'sublime' : ''}>Resumo</p>
          </a>
          <Link to={`sector-selected?${parsed.substring(1)}`}>
            <p>Detalhado</p>
          </Link>
        </div>
        <span>
          <fieldset>
            <Select
              name="subject"
              label="Mês Referência"
              value={subject}
              onChange={e => {
                handleSubject(e.target.value);
              }}
              options={[
                { value: '01/january/2021', label: 'Janeiro' },
                { value: '01/february/2021', label: 'Fevereiro' },
                { value: '01/march/2021', label: 'Março' },
                { value: '01/april/2021', label: 'Abril' },
                { value: '01/may/2021', label: 'Maio' },
                { value: '01/june/2021', label: 'Junho' },
                { value: '01/july/2021', label: 'Julho' },
                { value: '01/august/2021', label: 'Agosto' },
                { value: '01/september/2021', label: 'Setembro' },
                { value: '01/october/2021', label: 'Outubro' },
                { value: '01/november/2021', label: 'Novembro' },
                { value: '01/december/2021', label: 'Dezembro' },
              ]}
            />
          </fieldset>
          <Button type="button" onClick={() => handleLoadingSectors()}>
            {loadingSectors ? 'Limpar' : 'Carregar'}
          </Button>
        </span>
      </Navigation>

      <CardTable>
        {loadingSectors ? (
          <>
            <Table
              idSector={parsed.substring(1)}
              isOpen
              startOpen
              month="01/january/2021"
            />
          </>
        ) : (
          <div>Aguardando carregar o filtro...</div>
        )}
      </CardTable>
    </>
  );
};

export default SelectedSector;
