/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Report } from 'powerbi-report-component';
import { useLoading, Oval } from '@agney/react-loading';
// import Button from '../../../Global/Button';

import { Container } from './styles';
import { apiPowerBI } from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';

import { layoutSettings } from '../../../../utils/stylesOfReportPowerBI';

interface PropsPowerBI {
  accessToken: string;
  expiry: string;
  reportId: string;
  embedUrl: string;
}

interface ReportData {
  reportId: string;
  embedUrl: string;
  // styleReport: 'window' | 'landscape' | 'portrait';
}

// interface IStyles {
//   width?: string;
//   border?: string;
//   height?: string;
//   maxHeight?: string;
//   margin?: string;
//   backgroundColor?: string;
//   top?: string;
//   minWidth?: string;
//   padding?: string;
// }

// const initialReportProps = {
//   embedType: 'report',
//   tokenType: 'Embed',
// };

export const ReportConectBI = ({ reportId, embedUrl }: ReportData) => {
  const [loadSignInUser, setloadSignInUser] = useState(true);
  const componentRef = useRef(null);
  // const [report, embed] = useReport();

  const { addToast } = useToast();
  const [dataBI, setDataBI] = useState<PropsPowerBI>();
  // const [styles, setStyles] = useState();

  const handleLoaded = useCallback(() => {
    setloadSignInUser(false);
  }, []);

  const { containerProps, indicatorEl } = useLoading({
    loading: loadSignInUser,
    indicator: <Oval />,
  });

  // const [reportProps, setReportProps] = React.useState(initialReportProps);
  // const [isValidConfig, setIsValidConfig] = React.useState(false);
  // const [activeTab, setActiveTab] = React.useState('report');
  // const reportRef = React.useRef(null);
  // const [report, setEmbed] = useReport();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const extraSettings = {
  //   filterPaneEnabled: false,
  //   navContentPaneEnabled: false,
  // };

  // const renderWithReportProps = React.useCallback(
  //   ({ reportProps }) => {
  //     setReportProps(reportProps);
  //     setEmbed(reportRef, {
  //       ...reportProps,
  //       settings: extraSettings,
  //     });
  //     setIsValidConfig(true);
  //   },
  //   [extraSettings, setEmbed],
  // );

  // const onReset = React.useCallback(() => {
  //   setIsValidConfig(false);
  // }, [isValidConfig]);

  // const handleClick = () => {
  //   // you can use "report" from useReport like
  //   if (report) report.print();
  // };

  // const myReportConfig = {
  //   embedType: 'report',
  //   tokenType: 'Aad',
  //   accessToken:
  //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2Y1ZDI0YTMtNGU3ZS00ZjgzLWIzY2QtYTk2MzkwYjE2MGFmLyIsImlhdCI6MTYyNTUwMzk2MywibmJmIjoxNjI1NTAzOTYzLCJleHAiOjE2MjU1MDc4NjMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFtUE5qNkJPdjY2ekFSOXVDNW40cXpsMThNdERPWTdCSThuNXlUQXp5SVJxd2svL295MlBsdjRhNnN3M3NON0J2TWF6RU90UGkwdXRmOGVBUnJqVG5uMzJQeTdzYnBLdFFmdk1wL1VEc2x4MD0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiaXBhZGRyIjoiMTc3LjIwMS42Ny4xNzgiLCJuYW1lIjoiUEJJIEVtYmVkIiwib2lkIjoiYTAyZDQ0MWUtYjAzNy00OGM0LTk3ZDctNTQyZWZhNWFhZTRiIiwicHVpZCI6IjEwMDMyMDAxMTA4NjYyREUiLCJyaCI6IjAuQVZvQW95UmR6MzVPZzAtenphbGprTEZncnc4QkhJZGhYckZQZzZ5WVlRcC1rUkJhQVBZLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IjUwSDR0TlQ5ZU1qSDhRMGw1aEQ0SVVEdi1McERHYTI0ZnBjTndqcnpWakEiLCJ0aWQiOiJjZjVkMjRhMy00ZTdlLTRmODMtYjNjZC1hOTYzOTBiMTYwYWYiLCJ1bmlxdWVfbmFtZSI6InBiaWVtYmVkQGJydW5vZ3VpbWFyYWVzY2FydmFsaG9zZ29oby5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJwYmllbWJlZEBicnVub2d1aW1hcmFlc2NhcnZhbGhvc2dvaG8ub25taWNyb3NvZnQuY29tIiwidXRpIjoiMy1HYTJtNm5fVVdBRlBJa05BeldBZyIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.V-2q4h-JkPzQDX_dpQx6petQKngP7UlVb0xReTvtrqsPPPYlJhXX-OfgnRTMzfYcZuKLZdiIz9bh0rRATXes6LzRSl69lFam-AGNkr5npW_Sf24AGDqURbvxN-C-rq0QbjdJWVMWvRepO_D3t4PlimOe1iWCo7BV9TWkqXBhYGx9YIy49hnHTkPyPaHBW7jxiyyGmNowODJx8anleojl8VKmK2QsvSaNqszg9935T3Kpq2Vdh6aS4kzkAQgIP2EsXrMfivqsxchqvjb_ln7ujHscPhrW5KUyPDu7outphWvd4PyHL5QP9sev7R1GmVoeKp9vRKtDQo0sU3LZkotXxA',
  //   embedUrl:
  //     'https://app.powerbi.com/reportEmbed?reportId=49601ede-66ec-4fe2-88c0-299c21f1b1af&groupId=9ab7f913-45e8-4e73-abf4-33ff01c21f9f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJjZXJ0aWZpZWRUZWxlbWV0cnlFbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
  //   embedId: '49601ede-66ec-4fe2-88c0-299c21f1b1af',
  //   reportMode: 'View', // "Edit"
  //   permissions: 'View', // "All" (when using "Edit" mode)
  //   style: { layoutSettings },
  //   extraSettings: {
  //     filterPaneEnabled: false,
  //     navContentPaneEnabled: false,
  //   },
  // };

  // React.useEffect(() => {
  //   if (true) {
  //     setEmbed(reportRef, {
  //       ...myReportConfig,
  //       extraSettings,
  //     });
  //   }
  // }, []);

  useEffect(() => {
    async function loadTokenBI() {
      try {
        // if (styleReport === 'portrait') {
        //   setStyles(layoutSettingsPortrait);
        // }
        // if (styleReport === 'landscape') {
        //   setStyles(layoutSettingsLandscape);
        // } else {
        //   setStyles(layoutSettings);
        // }

        if (localStorage.getItem('@SamascBI:dataAccess')) {
          const dataAccessBI = localStorage.getItem('@SamascBI:dataAccess');

          if (dataAccessBI) {
            const formatedDataAccesBI = JSON.parse(dataAccessBI);

            if (
              new Date(formatedDataAccesBI.expiry) > new Date() &&
              reportId !== 'null_id'
            ) {
              const dataConectBI = {
                accessToken: formatedDataAccesBI.accessToken,
                expiry: formatedDataAccesBI.expiry,
                reportId,
                embedUrl,
              };

              // Data ainda esta valida
              setDataBI(dataConectBI);
            } else if (
              new Date(formatedDataAccesBI.expiry) < new Date() &&
              reportId !== 'null_id'
            ) {
              // Data expirou, carrega novos dados

              const response = await apiPowerBI.get(
                `/get-embed-token?reportId=${reportId}`,
              );

              const dataConectBI = {
                accessToken: response.data.accessToken,
                expiry: response.data.expiry,
                reportId,
                embedUrl,
              };

              localStorage.setItem(
                '@SamascBI:dataAccess',
                JSON.stringify(dataConectBI),
              );
              setDataBI(response.data);
            }
          }
          return;
        }
        // Dados inexistes, primeiro carregamento
        if (reportId !== 'null_id') {
          const response = await apiPowerBI.get(
            `/get-embed-token?reportId=${reportId}`,
          );

          console.log('embededURL', response.data);

          localStorage.setItem(
            '@SamascBI:dataAccess',
            JSON.stringify(response.data),
          );
          setDataBI(response.data);
        }
      } catch (err) {
        console.log(err);

        addToast({
          type: 'error',
          title: 'Gr??ficos de anal??se',
          description: 'N??o foi posivel carregar os gr??ficos de anal??se',
        });
      }
    }
    loadTokenBI();
  }, [addToast, embedUrl, reportId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const myReportConfig: any = {
  //   embedType: 'report',
  //   tokenType: 'Aad',
  //   accessToken:
  //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2Y1ZDI0YTMtNGU3ZS00ZjgzLWIzY2QtYTk2MzkwYjE2MGFmLyIsImlhdCI6MTYyNTUwMzk2MywibmJmIjoxNjI1NTAzOTYzLCJleHAiOjE2MjU1MDc4NjMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFtUE5qNkJPdjY2ekFSOXVDNW40cXpsMThNdERPWTdCSThuNXlUQXp5SVJxd2svL295MlBsdjRhNnN3M3NON0J2TWF6RU90UGkwdXRmOGVBUnJqVG5uMzJQeTdzYnBLdFFmdk1wL1VEc2x4MD0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiaXBhZGRyIjoiMTc3LjIwMS42Ny4xNzgiLCJuYW1lIjoiUEJJIEVtYmVkIiwib2lkIjoiYTAyZDQ0MWUtYjAzNy00OGM0LTk3ZDctNTQyZWZhNWFhZTRiIiwicHVpZCI6IjEwMDMyMDAxMTA4NjYyREUiLCJyaCI6IjAuQVZvQW95UmR6MzVPZzAtenphbGprTEZncnc4QkhJZGhYckZQZzZ5WVlRcC1rUkJhQVBZLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IjUwSDR0TlQ5ZU1qSDhRMGw1aEQ0SVVEdi1McERHYTI0ZnBjTndqcnpWakEiLCJ0aWQiOiJjZjVkMjRhMy00ZTdlLTRmODMtYjNjZC1hOTYzOTBiMTYwYWYiLCJ1bmlxdWVfbmFtZSI6InBiaWVtYmVkQGJydW5vZ3VpbWFyYWVzY2FydmFsaG9zZ29oby5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJwYmllbWJlZEBicnVub2d1aW1hcmFlc2NhcnZhbGhvc2dvaG8ub25taWNyb3NvZnQuY29tIiwidXRpIjoiMy1HYTJtNm5fVVdBRlBJa05BeldBZyIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.V-2q4h-JkPzQDX_dpQx6petQKngP7UlVb0xReTvtrqsPPPYlJhXX-OfgnRTMzfYcZuKLZdiIz9bh0rRATXes6LzRSl69lFam-AGNkr5npW_Sf24AGDqURbvxN-C-rq0QbjdJWVMWvRepO_D3t4PlimOe1iWCo7BV9TWkqXBhYGx9YIy49hnHTkPyPaHBW7jxiyyGmNowODJx8anleojl8VKmK2QsvSaNqszg9935T3Kpq2Vdh6aS4kzkAQgIP2EsXrMfivqsxchqvjb_ln7ujHscPhrW5KUyPDu7outphWvd4PyHL5QP9sev7R1GmVoeKp9vRKtDQo0sU3LZkotXxA',
  //   embedUrl:
  //     'https://app.powerbi.com/reportEmbed?reportId=49601ede-66ec-4fe2-88c0-299c21f1b1af&groupId=9ab7f913-45e8-4e73-abf4-33ff01c21f9f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJjZXJ0aWZpZWRUZWxlbWV0cnlFbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
  //   embedId: '49601ede-66ec-4fe2-88c0-299c21f1b1af',
  //   reportMode: 'View', // "Edit"
  //   permissions: 'View', // "All" (when using "Edit" mode)
  //   style: { layoutSettings },
  //   extraSettings: {
  //     filterPaneEnabled: false,
  //     navContentPaneEnabled: false,
  //   },
  // };

  // useEffect(
  //   () =>
  //     // call inside useEffect so the we have the reportRef (reference available)
  //     embed(reportRef, myReportConfig),
  //   [embed, myReportConfig],
  // );

  // const handleClick = () => {
  //   // you can use "report" from useReport like]
  //   console.log(report);
  //   if (report) report.print();
  // };

  return (
    <>
      <Container load={loadSignInUser}>
        {/* <CardeHeader>
          <div>
            <h2>Relat??rios e pain??is infograficos</h2>
            <strong>
              Visualize seus relat??rios e trabalhe com paines infograficos
            </strong>
          </div>
          <CardButton>
            <div>
              <Button
                id="noPrint"
                isUsed
                className="iconPrint"
                type="button"
                onClick={() => window.print()}
              >
                Imprimir
              </Button>
            </div>
          </CardButton>
        </CardeHeader> */}

        {loadSignInUser ? (
          <>
            <div className="loading" {...containerProps} ref={componentRef}>
              <p>Carregando relat??rio1</p>
              {indicatorEl}
            </div>
          </>
        ) : (
          ''
        )}
        {dataBI ? (
          <div className="powerBi">
            <Report
              tokenType="Aad" // "Aad"
              accessToken={dataBI ? dataBI.accessToken : 'sem token'}
              embedUrl={dataBI ? dataBI.embedUrl : 'sem token'}
              embedId={dataBI ? dataBI.reportId : 'sem token'}
              // pageName="Sentiment" // set as current page of the report
              reportMode="View" // open report in a particular mode View/Edit/Create
              // datasetId={datasetId} // required for reportMode = "Create" and optional for dynamic databinding in `report` on `View` mode
              // groupId={groupId} // optional. Used when reportMode = "Create" and to chose the target workspace when the dataset is shared.
              // extraSettings={extraSettings}
              style={layoutSettings()}
              permissions="All"
              // onRender={handleLoaded}
              onLoad={handleLoaded}
              extraSettings={{
                filterPaneEnabled: false,
                navContentPaneEnabled: false,
              }}
            />
          </div>
        ) : (
          ''
        )}
      </Container>
    </>
  );
};
