import React, { useRef, useState, useEffect } from 'react';
import { Report } from 'powerbi-report-component';
import { useLoading, Oval } from '@agney/react-loading';

import { Conatiner, ContainerBI } from './styles';
import api from '../../services/api';

interface PropsPowerBI {
  accessToken: string;
  embedUrl: [
    {
      reportId: string;
      reportName: string;
      embedUrl: string;
    },
  ];
}

const Dashboard: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [dataBI, setDataBI] = useState<PropsPowerBI>();
  const [loadDash, setLoadDash] = useState(true);

  const { containerProps, indicatorEl } = useLoading({
    loading: loadDash,
    indicator: <Oval />,
  });

  const layoutSettings = {
    width: '100%',
    height: '93vh',
    background: '#FFF',
    borderColor: '#FFF',
  };

  useEffect(() => {
    async function loadTokenBI(): Promise<void> {
      try {
        const response = await api.get('/getEmbedToken');
        setLoadDash(false);
        setDataBI(response.data);
        // console.log(response.data.embedUrl[0].reportId);
      } catch (err) {
        console.log(err);
      }
    }
    loadTokenBI();
  }, [setLoadDash]);

  return (
    <>
      <Conatiner {...containerProps} ref={componentRef}>
        {indicatorEl}
        <ContainerBI load={loadDash}>
          {dataBI ? (
            <Report
              tokenType="Embed"
              accessToken={dataBI ? dataBI.accessToken : 'sem token'}
              embedUrl={dataBI ? dataBI.embedUrl[0].embedUrl : 'sem token'}
              {...console.log(dataBI ? dataBI.accessToken : 'sem token')}
              {...console.log(
                dataBI ? dataBI.embedUrl[0].embedUrl : 'sem token',
              )}
              {...console.log(
                dataBI ? dataBI.embedUrl[0].reportId : 'sem token',
              )}
              embedId={dataBI ? dataBI.embedUrl[0].reportId : 'sem token'}
              // pageName="Sentiment"
              reportMode="View"
              // datasetId={datasetId}
              // groupId={groupId}
              // extraSettings={extraSettings}
              style={layoutSettings}
              permissions="All"
            />
          ) : (
            ''
          )}
        </ContainerBI>
      </Conatiner>
    </>
  );
};

export default Dashboard;
