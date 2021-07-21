/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import { useLoading, Oval } from '@agney/react-loading';
import { api } from '../../../../services/api';
import { CardeHeader, Container } from './styles';

import { ReportConectBI } from '../../../../components/Admin/Reports/ReportConectBI';

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

const SelectedSector: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const parsed = window.location.search;
  const [sectorSelected, setSectorSelected] = useState<SectorSelected>();
  const [styleReport, setStyleReport] = useState<'window' | 'print'>('window');

  const [loadPrint, setLoadPrint] = useState(false);

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

  const handleSetPrintReport = useCallback(() => {
    setLoadPrint(true);
    setStyleReport('print');
    setTimeout(() => {
      window.print();
      setLoadPrint(false);
    }, 3000);
  }, []);

  window.onafterprint = function () {
    setStyleReport('window');
  };

  const { containerProps, indicatorEl } = useLoading({
    loading: loadPrint,
    indicator: <Oval />,
  });

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
              <MenuItem onClick={() => handleSetPrintReport()}>
                Modo paisagem
              </MenuItem>
              <MenuItem disabled>Modo Retrato</MenuItem>
            </SubMenu>
            <MenuItem>Relatar erro</MenuItem>
          </Menu>
        </span>
      </CardeHeader>

      <div className="print-container">
        <ReportConectBI
          styleReport={styleReport}
          reportId={sectorSelected?.report_id ?? 'null_id'}
          embedUrl={sectorSelected?.embed_url ?? 'null_id'}
        />
      </div>
    </Container>
  );
};

export default SelectedSector;
