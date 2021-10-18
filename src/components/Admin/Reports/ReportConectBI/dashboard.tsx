import React, { useEffect, useState } from 'react';
import { Dashboard } from 'powerbi-report-component';

import { Container } from './styles';
import { apiPowerBI } from '../../../../services/api';

export const ReportConectBI: React.FC = () => {
  const [accesToken, setAccessToken] = useState();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function loadTokenBI(): Promise<void> {
      setloading(true);
      const response = await apiPowerBI.get(
        `/get-embed-token?reportId=838fda12-6319-4db5-8f50-b23effef561c`,
      );

      console.log('embededURL', response.data.accessToken);

      localStorage.setItem(
        '@SamascBI:dataAccess',
        JSON.stringify(response.data),
      );
      setAccessToken(response.data.accessToken);
      setloading(false);
    }
    loadTokenBI();
  }, []);

  return (
    <>
      <Container load>
        {!loading ? (
          <Dashboard
            style={{
              width: '85vw',
              border: 'none',
              height: `${window.innerWidth > 1500 ? '87vh' : '81vh'}`,
              maxHeight: '100vh',
              margin: '0',
            }}
            tokenType="Aad"
            accessToken={accesToken ?? 'null'}
            embedUrl="https://app.powerbi.com/dashboardEmbed?dashboardId=13a250e7-ffb2-4393-aaee-3f5f62a65d7b&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19"
            embedId="13a250e7-ffb2-4393-aaee-3f5f62a65d7b"
            pageView="fitToWidth"
          />
        ) : (
          ''
        )}
      </Container>
    </>
  );
};
