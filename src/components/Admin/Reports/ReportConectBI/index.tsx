/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useRef, useCallback } from 'react';
import { useReport } from 'powerbi-report-component';

// import { layoutSettings } from '../../../../utils/stylesOfReportPowerBI';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';

import { Container, DivLeft } from './styles';
import { apiPowerBI } from '../../../../services/api';

import {
  layoutSettings,
  // layoutSettingsLandscape,
  // layoutSettingsPortrait,
} from '../../../../utils/stylesOfReportPowerBI';

interface ReportData {
  reportId: string;
  embedUrl: string;
}

interface PropsPowerBI {
  accessToken: string;
  expiry: string;
  reportId: string;
  embedUrl: string;
}

export const ReportConectBI: React.FC<ReportData> = ({
  reportId,
  embedUrl,
}) => {
  const reportRef = useRef(null);
  const [report, setEmbed] = useReport();

  useEffect(() => {
    async function loadTokenBI(): Promise<void> {
      await apiPowerBI
        .get<PropsPowerBI>(`/get-embed-token?reportId=${reportId}`)
        .then(response => {
          const initialReportProps = {
            type: 'report',
            embedType: 'report',
            tokenType: 'Aad',
            accessToken: response.data.accessToken,
            embedUrl,
            embedId: reportId,
            reportMode: 'View', // "Edit"
            permissions: 'All', // "All" (when using "Edit" mode)
            extraSettings: {
              filterPaneEnabled: false,
              navContentPaneEnabled: false,
            },
          };

          // @ts-ignore
          setEmbed(reportRef, initialReportProps);
        });
    }
    loadTokenBI();
  }, [embedUrl, reportId, setEmbed]);

  const handleClick = () => {
    if (report) report.print();
  };

  const setFullscreen = useCallback(() => {
    if (report) report.fullscreen();
  }, [report]);

  return (
    <>
      <DivLeft>
        <span id="noPrint">
          <Menu
            menuButton={<MenuButton>Opções</MenuButton>}
            className="my-menu"
          >
            <MenuItem onClick={handleClick}>Imprimir</MenuItem>
            <MenuItem onClick={setFullscreen}>FullScreen</MenuItem>

            <MenuItem>Relatar erro</MenuItem>
          </Menu>
        </span>
      </DivLeft>
      <Container load={false}>
        <div className="report" style={layoutSettings()} ref={reportRef} />
      </Container>
    </>
  );
};
