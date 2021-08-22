/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useCallback, useRef } from 'react';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import { useLoading, Oval } from '@agney/react-loading';
import { CardeHeader, Container } from './styles';

import { ReportConectBI } from '../../../../components/Admin/Reports/ReportConectBI';

const SelectedSector: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [styleReport, setStyleReport] =
    useState<'window' | 'landscape' | 'portrait'>('window');

  const [loadPrint, setLoadPrint] = useState(false);

  const handleSetPrintReport = useCallback(modelPrint => {
    setLoadPrint(true);
    setStyleReport(modelPrint);
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
        <div />
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

      <div className="print-container">
        <ReportConectBI
          styleReport={styleReport}
          reportId="a3f4354b-69a2-41ad-928f-0579d6ade791"
          embedUrl="https://app.powerbi.com/reportEmbed?reportId=a3f4354b-69a2-41ad-928f-0579d6ade791&groupId=71159839-6c48-44f6-90f3-25692a98e2ce&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJjZXJ0aWZpZWRUZWxlbWV0cnlFbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d"
        />
      </div>
    </Container>
  );
};

export default SelectedSector;
