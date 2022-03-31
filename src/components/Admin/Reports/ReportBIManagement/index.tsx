import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  // useCallback,
} from 'react';
import { useReport } from 'powerbi-report-component';
import { models } from 'powerbi-client';

import {
  Box,
  Spinner,
  Center,
  ScaleFade,
  // MenuButton,
  // MenuItem,
  // Menu,
  // MenuList,
  // Button,
} from '@chakra-ui/react';
// import { BiChevronDown } from 'react-icons/bi';

import { SetToggleThemeContext } from '../../../../contexts/SetToggleThemeContext';
import {
  jsonDataColors,
  layoutSettings,
} from '../../../../utils/stylesOfReportPowerBI';
import { apiPowerBI } from '../../../../services/api';
import reportProps from '../../../../utils/reportProps';
import { DeviceContext } from '../../../../contexts/DeviceContext';
import { apllyToast } from '../../../Global/Toast2.0';

interface Props {
  embedId: string;
  embedUrl: string;
  reportLoading: string;
  workspaceId: string;
}
interface PropsPowerBI {
  accessToken: string;
  expiry: string;
  reportId: string;
  embedUrl: string;
}

export const ReportBIManagement = ({
  embedId,
  embedUrl,
  reportLoading,
  workspaceId,
}: Props) => {
  const reportRef = useRef(null);
  const [report, setEmbed] = useReport();
  const { toggleTheme } = useContext(SetToggleThemeContext);
  const { window } = useContext(DeviceContext);
  const [loadingRendered, setLoadingRendered] = useState(true);

  // report.on('rendered', async function () {
  //   if (toggleTheme === 'dark') {
  //     console.log('toggleTheme', toggleTheme);
  //     try {
  //       await report.applyTheme({ themeJson: jsonDataColors[0] });
  //       report.off('rendered');
  //       console.log(
  //         "Custom layout applied, to remove custom layout, reload the report using 'Reload' API.",
  //       );
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   }
  // });
  // setTimeout(() => {
  //   const load = progress + 10;
  //   setProgress(load);
  // }, 1000);

  // const handleSetPage = useCallback(
  //   (pageName: string) => {
  //     report.setPage(pageName);
  //   },
  //   [report],
  // );

  useEffect(() => {
    async function loadTokenBI(): Promise<void> {
      try {
        await apiPowerBI
          .get<PropsPowerBI>(
            `/get-embed-token?reportId=${reportLoading}&workspaceId=${workspaceId}`,
          )
          .then(response => {
            const formated = {
              embedId,
              embedUrl,
              window,
              accessToken: response.data.accessToken,
            };
            const { initialReportProps } = reportProps(formated);

            setEmbed(reportRef, initialReportProps as any);
          });
      } catch (err) {
        console.log('problemas', err);
        apllyToast(
          'error',
          'Problemas ao carregar relatório, consulte o administrador.',
        );
        setLoadingRendered(false);
      }
    }
    loadTokenBI();
  }, [embedId, embedUrl, reportLoading, setEmbed, window, workspaceId]);

  useEffect(() => {
    if (report) {
      report.off('loaded');
      report.on('loaded', async function () {
        const filtersArray = [
          {
            values: ['PPR Controladoria'],
            operator: 'In',
            target: { table: 'Resumo geral', column: 'painel' },
          },
        ];

        const page = await report.getPages();

        const filter = await page[0].getFilters();
        console.log('pagina', page);
        await page[0].updateFilters(
          models.FiltersOperations.ReplaceAll,
          filtersArray,
        );
        //  report.switchMode('edit');
        console.log('filtro', filter);
        // setProgress(50);
      });
    }
  }, [report]);

  useEffect(() => {
    if (report) {
      report.off('rendered');
      report.on('rendered', function () {
        // setProgress(100);
        setLoadingRendered(false);
      });
    }
  }, [report]);

  if (report) {
    report.off('rendered');
    report.on('rendered', async function () {
      if (toggleTheme === 'dark') {
        // const filtersArray = [
        //   {
        //     values: ['PPR Controladoria'],
        //     operator: 'In',
        //     target: { table: 'Resumo geral', column: 'painel' },
        //   },
        // ];

        // const page = await report.getPages();
        // const filter = await page[0].getFilters();
        // console.log('pagina', page);
        // await page[0].updateFilters(
        //   models.FiltersOperations.ReplaceAll,
        //   filtersArray,
        // );
        // // report.switchMode('edit');
        // console.log('filtro', filter);
        try {
          await report.applyTheme({ themeJson: jsonDataColors[0] });
          report.off('rendered');
          setLoadingRendered(false);
        } catch (error) {
          console.log('error', error);
          setLoadingRendered(false);
        }
      }
      setLoadingRendered(false);
    });
  }
  // async function handleTheme() {
  //   if (toggleTheme === 'dark') {
  //     console.log('toggleTheme', toggleTheme);
  //     try {
  //       await report.applyTheme({ themeJson: jsonDataColors[0] });
  //       console.log(
  //         "Custom layout applied, to remove custom layout, reload the report using 'Reload' API.",
  //       );
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   }
  //   console.log('teste');
  //   // });
  // }

  // console.log(report.on());

  // useEffect(() => {
  //   try {
  //     setEmbed(reportRef, initialReportProps as any);
  //   } catch (err) {
  //     console.log('errrrooor');
  //   }
  // }, [setEmbed]);

  // const handlereload = useCallback(async () => {
  //   try {
  //     await report.reload();
  //   } catch (errors) {
  //     console.log(errors);
  //   }
  // }, [report]);

  return (
    <>
      {/* <button onClick={handlereload} type="button">
        reload
      </button> */}
      <Center>{loadingRendered ? <Spinner /> : ''}</Center>

      <ScaleFade initialScale={0.9} in>
        {/* <Box
          width="100%"
          alignItems="end"
          display={loadingRendered ? 'none' : 'flex'}
        >
          <Menu>
            <MenuButton
              colorScheme="blue"
              as={Button}
              rightIcon={<BiChevronDown />}
            >
              Painés
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleSetPage('ReportSection')}>
                Geral
              </MenuItem>
              <MenuItem
                onClick={
                  () => handleSetPage('ReportSection508aa3c580e043c3deb1')
                  // eslint-disable-next-line react/jsx-curly-newline
                }
              >
                Média de consumo
              </MenuItem>
              <MenuItem>Abastecimentos</MenuItem>
              <MenuItem>Manutenções</MenuItem>
            </MenuList>
          </Menu>
        </Box> */}
        <Box
          display={loadingRendered ? 'none' : ''}
          style={layoutSettings()}
          ref={reportRef}
        />
      </ScaleFade>
      {/* <Report
          tokenType="Aad" // "Aad"
          accessToken="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZTlhNzRiNTYtYzAwOC00NDExLTk2MTYtMGE3ZjE3ZTEyZGFkLyIsImlhdCI6MTY0MzM3NzM3OSwibmJmIjoxNjQzMzc3Mzc5LCJleHAiOjE2NDMzODI1NTcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBU1FBMi84VEFBQUE1UWNicmZoaGNLZW8zL0xFRGNXbkZ5Y3NiY3dmdGUrMGN6L1paZStYRzVJPSIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiIyMWI4MDE0MC0wZWE2LTQxYTQtOGQ0My01NWZmY2YxNmY1ZDMiLCJhcHBpZGFjciI6IjAiLCJnaXZlbl9uYW1lIjoiYm90X2Nvb2FzZ28iLCJpcGFkZHIiOiIxNzcuMjAxLjY3LjE3OCIsIm5hbWUiOiJib3RfY29vYXNnbyIsIm9pZCI6IjBjNDZiODk3LWUyNTItNGZhNC05ZmVlLWRjNThlYzg3MTI4YiIsInB1aWQiOiIxMDAzMjAwMTY1OTRFQjA3IiwicmgiOiIwLkFWQUFWa3VuNlFqQUVVU1dGZ3BfRi1FdHJVQUJ1Q0dtRHFSQmpVTlZfODhXOWROUUFGNC4iLCJzY3AiOiJBcHAuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZFdyaXRlLkFsbCBDb250ZW50LkNyZWF0ZSBEYXNoYm9hcmQuUmVhZC5BbGwgRGFzaGJvYXJkLlJlYWRXcml0ZS5BbGwgRGF0YWZsb3cuUmVhZC5BbGwgRGF0YWZsb3cuUmVhZFdyaXRlLkFsbCBEYXRhc2V0LlJlYWQuQWxsIERhdGFzZXQuUmVhZFdyaXRlLkFsbCBHYXRld2F5LlJlYWQuQWxsIEdhdGV3YXkuUmVhZFdyaXRlLkFsbCBSZXBvcnQuUmVhZC5BbGwgUmVwb3J0LlJlYWRXcml0ZS5BbGwgU3RvcmFnZUFjY291bnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZFdyaXRlLkFsbCBXb3Jrc3BhY2UuUmVhZC5BbGwgV29ya3NwYWNlLlJlYWRXcml0ZS5BbGwiLCJzdWIiOiJqRElBV0xOT0tpU3JlalB2ZFBOQVZ1azV3WmpXN2M2bE05NFlQcEwtOFk0IiwidGlkIjoiZTlhNzRiNTYtYzAwOC00NDExLTk2MTYtMGE3ZjE3ZTEyZGFkIiwidW5pcXVlX25hbWUiOiJjb250cm9sbGVyQG1pZGFzY29ycC5kZXYiLCJ1cG4iOiJjb250cm9sbGVyQG1pZGFzY29ycC5kZXYiLCJ1dGkiOiJwbmQ0ek1Ca0cwU1UzcHRqZ0lfYUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJkMjRhZWY1Ny0xNTAwLTQwNzAtODRkYi0yNjY2ZjI5Y2Y5NjYiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.LhHYKzx1qaJ-DQXcBSGyWH1UTXx3yIzQxIJrFLpQ875ae6oCELobBaMrhR0aLhy5xiEeVKRKdqadPi97UtxZQsBNG4NoUaTJ3ftHreGHQQsgt8o4woghO0k-lCBs-Gzhmpnu1EKf_N55PFuugT1vYbSfdxQw9qxYZm657vyN1XRZLRVKmFH1VATb5Rfrz_GkqR9MLCSsxogCvDYRdJa4rpq9nMM9L68_uukDyu52SYTteRkxotOyyR6Hx4NuzDn_RrbdLkPk4r6ZZHieSl_jsHFrhXYpOLa0-CGGf7sSB37zEOoEA1rLR70yG7X2CRCsF4l4zmdSj3AmcLAs0QIO3w"
          embedUrl="https://app.powerbi.com/reportEmbed?reportId=2780625e-4cc9-464f-84cc-9d660fc73d05&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJhbmd1bGFyT25seVJlcG9ydEVtYmVkIjp0cnVlLCJjZXJ0aWZpZWRUZWxlbWV0cnlFbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWUsInNraXBab25lUGF0Y2giOnRydWV9fQ%3d%3d"
          embedId="2780625e-4cc9-464f-84cc-9d660fc73d05"
          // pageName="Sentiment" // set as current page of the report
          reportMode="View" // open report in a particular mode View/Edit/Create
          // datasetId={datasetId} // required for reportMode = "Create" and optional for dynamic databinding in `report` on `View` mode
          // groupId={groupId} // optional. Used when reportMode = "Create" and to chose the target workspace when the dataset is shared.
          // extraSettings={extraSettings}
          permissions="All"
          style={layoutSettings()}
          // onRender={handleLoaded}
          // onLoad={handleLoaded}
          extraSettings={{
            filterPaneEnabled: false,
            navContentPaneEnabled: false,

          }}
        /> */}
    </>
  );
};
