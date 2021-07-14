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

      <ReportConectBI reportId="c1b98ec1-ee3b-4e1e-9bb2-fa9444ce810e" />
    </>
  );
};

export default SelectedSector;
