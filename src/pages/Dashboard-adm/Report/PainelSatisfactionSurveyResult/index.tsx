import React, { useCallback, useRef, useState } from 'react';
import { Report } from 'powerbi-report-component';
import { useLoading, Oval } from '@agney/react-loading';
import Button from '../../../../components/Global/Button';

import { CardButton, CardeHeader, Container } from './styles';

const SelectorFolders: React.FC = () => {
  const [loadSignInUser, setloadSignInUser] = useState(true);

  const componentRef = useRef<HTMLDivElement>(null);
  // const [report, embed] = useReport();

  const handleLoaded = useCallback(() => {
    setloadSignInUser(false);
  }, []);

  const { containerProps, indicatorEl } = useLoading({
    loading: loadSignInUser,
    indicator: <Oval />,
  });

  const layoutSettings = {
    width: '100%',
    border: 'none',
    height: '100vh',
    margin: '0',
  };

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
        <CardeHeader>
          <div>
            <h2>Relatórios e painéis infograficos</h2>
            <strong>
              Visualize seus relatórios e trabalhe com paines infograficos
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
        </CardeHeader>

        {loadSignInUser ? (
          <>
            <div className="loading" {...containerProps} ref={componentRef}>
              {indicatorEl}
            </div>
          </>
        ) : (
          ''
        )}
        <div id="print">
          <Report
            tokenType="Aad" // "Aad"
            accessToken="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2Y1ZDI0YTMtNGU3ZS00ZjgzLWIzY2QtYTk2MzkwYjE2MGFmLyIsImlhdCI6MTYyNTUxMjExMiwibmJmIjoxNjI1NTEyMTEyLCJleHAiOjE2MjU1MTYwMTIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFiam1KRk9KZ0VpOGJhSlpRT3NDNk1FMUtlRFNPUWRySDBrTlgxTXRYaGgwT1VlWGFhQVBOOTdRRkZMTW1YcXUrcXhoNm5tVitwQ1pjekg2WGVXUUtTRlBWQlNxeG9IQnhwYzBkaWZWSzNJOD0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiaXBhZGRyIjoiMTc3LjIwMS42Ny4xNzgiLCJuYW1lIjoiUEJJIEVtYmVkIiwib2lkIjoiYTAyZDQ0MWUtYjAzNy00OGM0LTk3ZDctNTQyZWZhNWFhZTRiIiwicHVpZCI6IjEwMDMyMDAxMTA4NjYyREUiLCJyaCI6IjAuQVZvQW95UmR6MzVPZzAtenphbGprTEZncnc4QkhJZGhYckZQZzZ5WVlRcC1rUkJhQVBZLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IjUwSDR0TlQ5ZU1qSDhRMGw1aEQ0SVVEdi1McERHYTI0ZnBjTndqcnpWakEiLCJ0aWQiOiJjZjVkMjRhMy00ZTdlLTRmODMtYjNjZC1hOTYzOTBiMTYwYWYiLCJ1bmlxdWVfbmFtZSI6InBiaWVtYmVkQGJydW5vZ3VpbWFyYWVzY2FydmFsaG9zZ29oby5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJwYmllbWJlZEBicnVub2d1aW1hcmFlc2NhcnZhbGhvc2dvaG8ub25taWNyb3NvZnQuY29tIiwidXRpIjoiazNGZmZudXYyMFd2TFNLb2Z5LUNBZyIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.EpeINaJ89xhjqjiNTEeJ7HUN7umF85TInINX1TIMK8kIcTq_ceJ0dTnK5q2J96JaRiObmGgfFJ_ua_k7lt-n2bAXJbiztyUzu6QW9AuNQdPItzSVUiTp4qieQcFccG973uRHTCaoyUOw90_BAX5s75EqoyrTfTOIwL32InJxtsYyg5zfB0R7yw8kr8bmyfCxMsf27s90gzKcuJ6ZL634gENlqPX7FFS7GZ6XOE41oTyB3sOarwUIasJNfe5NIoEXQaLJl6n8XeoS2eN3kSA_SfrogRSWV_Htxt_XHRREMLC3UZtdfoYWU0z8MLzfRyH6X2fXdm3pe79Ci0Xr_RD3MA" // accessToken goes here
            embedUrl="https://app.powerbi.com/reportEmbed?reportId=49601ede-66ec-4fe2-88c0-299c21f1b1af&groupId=9ab7f913-45e8-4e73-abf4-33ff01c21f9f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJjZXJ0aWZpZWRUZWxlbWV0cnlFbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d" // embedUrl goes here
            embedId="49601ede-66ec-4fe2-88c0-299c21f1b1af" // report or dashboard Id goes here
            // pageName="Sentiment" // set as current page of the report
            reportMode="View" // open report in a particular mode View/Edit/Create
            // datasetId={datasetId} // required for reportMode = "Create" and optional for dynamic databinding in `report` on `View` mode
            // groupId={groupId} // optional. Used when reportMode = "Create" and to chose the target workspace when the dataset is shared.
            // extraSettings={extraSettings}
            style={layoutSettings}
            permissions="Read"
            onRender={handleLoaded}
            extraSettings={{
              filterPaneEnabled: false,
            }}
          />
        </div>
      </Container>
    </>
  );
};

export default SelectorFolders;
