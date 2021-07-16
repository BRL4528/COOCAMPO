import React, { useEffect, useState } from 'react';

import { api } from '../../../../services/api';
import { CardeHeader } from './styles';

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

  return (
    <>
      <CardeHeader className="iconPrint">
        <div>
          <h2>{sectorSelected?.name}</h2>
          <strong>{sectorSelected?.observations}</strong>
        </div>
      </CardeHeader>
      <ReportConectBI
        reportId={sectorSelected?.report_id ?? 'null_id'}
        embedUrl={sectorSelected?.embed_url ?? 'null_id'}
      />
    </>
  );
};

export default SelectedSector;
