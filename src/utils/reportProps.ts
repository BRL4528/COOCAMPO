import { models } from 'powerbi-client';

interface Props {
  accessToken: string;
  embedUrl: string;
  embedId: string;
  window: number;
}

export default function reportProps({
  accessToken,
  embedUrl,
  embedId,
  window,
}: Props) {
  const initialReportProps = {
    type: 'report',
    embedType: 'report',
    tokenType: 'Aad',
    accessToken,
    embedUrl,
    embedId,
    reportMode: 'View', // "Edit"
    permissions: 'All', // "All" (when using "Edit" mode)

    extraSettings: {
      // filterPaneEnabled: false,
      filterType: models.FilterType.Basic,
      requireSingleSelection: true,
      // logicalOperator: 'In',
      // filters: [{
      //       $schema: 'http://powerbi.com/product/schema#basic',
      //     target: { table: 'Resumo geral', column: 'painel' },
      //     operator: 'In',
      //     values: ['PPR Controladoria'],

      // }]
      hideErrors: true,
      navContentPaneEnabled: false,
      visualRenderedEvents: true,
      background: models.BackgroundType.Transparent,
      layoutType: window,

      panes: {
        filters: {
          expanded: false,
          visible: false,
        },
        pageNavigation: {
          visible: false,
        },
      },
      customLayout: {
        // displayOption: models.DisplayOption.FitToPage,
      },
    },
  };

  return { initialReportProps };
}
