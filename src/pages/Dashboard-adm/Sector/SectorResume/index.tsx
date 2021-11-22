/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';

import '@szhsin/react-menu/dist/index.css';

// import { useLoading, Oval } from '@agney/react-loading';
import logo from '../../../../assets/logo-cooasgo-horizontal.png';
import { api } from '../../../../services/api';
import { CardeHeader, Container } from './styles';

import { ReportConectBI } from '../../../../components/Admin/Reports/ReportConectBI/index';

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
  const parsed = window.location.search;
  const [sectorSelected, setSectorSelected] = useState<SectorSelected>();
  const [styleReport, setStyleReport] =
    useState<'window' | 'landscape' | 'portrait'>('window');

  // const [loadPrint, setLoadPrint] = useState(false);

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
  // const handleSetPrintReport = useCallback(modelPrint => {
  //   setLoadPrint(true);
  //   setStyleReport(modelPrint);
  //   setTimeout(() => {
  //     window.print();
  //     setLoadPrint(false);
  //   }, 2000);
  // }, []);

  window.onafterprint = function () {
    setStyleReport('window');
  };

  // const { containerProps, indicatorEl } = useLoading({
  //   loading: loadPrint,
  //   indicator: <Oval />,
  // });

  return (
    <Container>
      <CardeHeader className="iconPrint">
        <div>
          <h2>{sectorSelected?.name}</h2>
          <strong>{sectorSelected?.observations}</strong>
        </div>
      </CardeHeader>
      <div className="print-container">
        <ReportConectBI
          // styleReport={styleReport}
          reportId={sectorSelected?.report_id ?? 'null_id'}
          embedUrl={sectorSelected?.embed_url ?? 'null_id'}
        />
      </div>
      <img className={styleReport} src={logo} alt="logo cooasgo" />
    </Container>
  );
};

export default SelectedSector;
