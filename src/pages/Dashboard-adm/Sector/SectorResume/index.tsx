/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from 'react';

import { api } from '../../../../services/api';
import { CardeHeader, Container } from './styles';
import Button from '../../../../components/Global/Button';

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
  const parsed = window.location.search;
  const [sectorSelected, setSectorSelected] = useState<SectorSelected>();
  const [styleReport, setStyleReport] = useState<'window' | 'print'>('window');

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
    setStyleReport('print');
    setTimeout(() => window.print(), 3000);
  }, []);

  return (
    <Container>
      <CardeHeader className="iconPrint">
        <div>
          <h2>{sectorSelected?.name}</h2>
          <strong>{sectorSelected?.observations}</strong>
        </div>
        <span id="noPrint">
          <Button type="button" onClick={() => handleSetPrintReport()}>
            Imprimir
          </Button>
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
