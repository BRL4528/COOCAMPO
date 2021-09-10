/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import { useLoading, Oval } from '@agney/react-loading';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo-cooasgo-horizontal.png';
import { api } from '../../../../services/api';
import { CardeHeader, Container } from './styles';

interface SectorSelected {
  branch: string;
  codccu: string;
  email: string;
  leader: string;
  name: string;
  observations: string;
  report_id: string;
  embed_url: string;
}

interface Temp {
  nomeNorma: string;
  numeroNorma: number;
  dataModificacao: string;
  excerpt: string;
}

const SelectedSector: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const parsed = window.location.search;
  const [sectorSelected, setSectorSelected] = useState<SectorSelected>();
  const [styleReport, setStyleReport] =
    useState<'window' | 'landscape' | 'portrait'>('window');

  const [loadPrint, setLoadPrint] = useState(false);

  const [temp, setTemp] = useState<Temp[]>([]);

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

  // eslint-disable-next-line prettier/prettier
  const handleSetPrintReport = useCallback(modelPrint => {
    setLoadPrint(true);
    setStyleReport(modelPrint);
    setTimeout(() => {
      window.print();
      setLoadPrint(false);
    }, 2000);
  }, []);

  window.onafterprint = function () {
    setStyleReport('window');
  };

  const { containerProps, indicatorEl } = useLoading({
    loading: loadPrint,
    indicator: <Oval />,
  });

  useEffect(() => {
    const dataArray = [
      {
        nomeNorma: 'Compra grãos-armazém cooasgo',
        numeroNorma: 1,
        dataModificacao: '01/05/2021',
        excerpt:
          'Iniciar com compra de materia prima porteriomente a verificação de ordens de compra',
      },
      {
        nomeNorma: 'Compra grãos-armazém de terceiros',
        numeroNorma: 2,
        dataModificacao: '01/05/2021',
        excerpt:
          'Iniciar com compra de materia prima porteriomente a verificação de ordens de compra',
      },
      {
        nomeNorma: 'Nova filial',
        numeroNorma: 3,
        dataModificacao: '01/05/2021',
        excerpt:
          'Iniciar com compra de materia prima porteriomente a verificação de ordens de compra',
      },
      {
        nomeNorma: 'Setor suprimentos',
        numeroNorma: 4,
        dataModificacao: '01/05/2021',
        excerpt:
          'Iniciar com compra de materia prima porteriomente a verificação de ordens de compra',
      },
      {
        nomeNorma: 'Manual atendimento as solitação de mercadorias - interno',
        numeroNorma: 5,
        dataModificacao: '01/05/2021',
        excerpt:
          'Iniciar com compra de materia prima porteriomente a verificação de ordens de compra',
      },
      {
        nomeNorma: 'Manual atendimento as solitação de mercadorias - externo',
        numeroNorma: 6,
        dataModificacao: '01/05/2021',
        excerpt:
          'Iniciar com compra de materia prima porteriomente a verificação de ordens de compra',
      },
      {
        nomeNorma: 'Manual atendimento filiais',
        numeroNorma: 7,
        dataModificacao: '01/05/2021',
        excerpt:
          'Iniciar com compra de materia prima porteriomente a verificação de ordens de compra',
      },
    ];

    setTemp(dataArray);
  }, []);

  return (
    <Container>
      <CardeHeader className="iconPrint">
        <div>
          <h2>{sectorSelected?.name}</h2>
          <strong>{sectorSelected?.observations}</strong>
        </div>
        <span id="noPrint">
          <Menu
            menuButton={
              <MenuButton>
                {loadPrint ? (
                  <div {...containerProps} ref={componentRef}>
                    {indicatorEl}
                  </div>
                ) : (
                  ' Opções'
                )}
              </MenuButton>
            }
            className="my-menu"
          >
            <SubMenu label="Imprimir">
              <MenuItem onClick={() => handleSetPrintReport('landscape')}>
                Modo paisagem
              </MenuItem>
              <MenuItem onClick={() => handleSetPrintReport('portrait')}>
                Modo Retrato
              </MenuItem>
            </SubMenu>
            <MenuItem>Relatar erro</MenuItem>
          </Menu>
        </span>
      </CardeHeader>

      <div className="temp">
        <main>
          <div className="posts">
            {temp.map(post => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <Link key={post.numeroNorma} to="/visio">
                <time>{post.dataModificacao}</time>
                <strong>{post.nomeNorma}</strong>
                <p>{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <img className={styleReport} src={logo} alt="logo cooasgo" />
    </Container>
  );
};

export default SelectedSector;
