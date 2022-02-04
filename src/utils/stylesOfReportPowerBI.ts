/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function layoutSettings() {
  return {
    // width: '150vh',
    width: `${window.innerWidth > 1500 ? '150vh' : '97vw'}`,
    border: 'none',
    height: `${window.innerWidth > 1500 ? '87vh' : '97vh'}`,
    maxHeight: '100vh',
    margin: '0',
  };
}

export function layoutSettingsLandscape() {
  return {
    top: '0px',
    // marginTo: '0px',
    marginBotton: '20px',
    minWidth: '1400px',
    height: '900px',
    padding: '20px',
  };
}

export function layoutSettingsPortrait() {
  return {
    top: '0px',
    // margin: '0px',
    marginBotton: '20px',

    minWidth: '2200px',
    height: '420px',
    // padding: '20px',
  };
}

export const jsonDataColors = [
  {
    name: 'Tidal',
    dataColors: [
      '#56C596',
      '#329D9C',
      '#9FD3C7',
      '#1E2D38',
      '#73788B',
      '#F6F8FC',
      '#B4BAC3',
      '#232448',
    ],

    tableAccent: '#4B4D63',
    foreground: '#EEEEF2',
    background: '#1A202C',
    // fontColor: '#EEEEF2',

    textClasses: {
      callout: {
        color: '#EEEEF2',
      },
      title: {
        color: '#EEEEF2',
      },
      header: { color: '#EEEEF2' },
    },
    visualStyles: {
      '*': {
        '*': {
          '*': [
            {
              fontFamily: 'Segoe UI',
              fontColor: '#EEEEF2',
            },
          ],
          general: [
            {
              responsive: true,
            },
          ],
          title: [
            {
              show: true,
              fontColor: {
                solid: {
                  color: '#C8C8C8',
                },
              },
              background: {
                solid: {
                  color: '#495060',
                },
              },
              alignment: 'CENTER',
              fontSize: 10,
            },
          ],
          background: [
            {
              color: {
                solid: {
                  color: '#1C2029',
                },
              },

              transparency: 58,
            },
          ],
          // visualTooltip: [
          //   {
          //     titleFontColor: {
          //       solid: {
          //         color: '#FFFFFF',
          //       },
          //     },
          //     valueFontColor: {
          //       solid: {
          //         color: '#FFFFFF',
          //       },
          //     },
          //   },
          // ],
          outspacePane: [
            {
              backgroundColor: {
                solid: {
                  color: '#373F51',
                },
              },
              foregroundColor: {
                solid: {
                  color: '#F7F5F5',
                },
              },
            },
          ],
          filterCard: [
            {
              $id: 'Available',
              backgroundColor: {
                solid: {
                  color: '#373F51',
                },
              },
              foregroundColor: {
                solid: {
                  color: '#F1EEEE',
                },
              },
              transparency: 0,
            },
          ],
        },
        slicer: {
          '*': {
            general: [
              {
                outlineColor: {
                  solid: {
                    color: '#999999',
                  },
                },
                outlineWeight: 1,
                orientation: 'vertical',
                responsive: true,
              },
            ],
            data: [
              {
                mode: 'Basic',
                relativeRange: '',
                relativePeriod: '',
              },
            ],
            selection: [
              {
                selectAllCheckboxEnabled: false,
                singleSelect: true,
              },
            ],
            header: [
              {
                show: true,
                fontColor: {
                  solid: {
                    color: '#C8C8C8',
                  },
                },
                background: {
                  solid: {
                    color: '#495060',
                  },
                },
                outline: 'None',
                textSize: 10,
                fontFamily: 'Segoe UI',
              },
            ],
            date: [
              {
                fontColor: {
                  solid: {
                    color: '#C8C8C8',
                  },
                },
                background: {
                  solid: {
                    color: '',
                  },
                },
                textSize: 10,
                fontFamily: 'Segoe UI',
              },
            ],
            items: [
              {
                fontColor: {
                  solid: {
                    color: '#C8C8C8',
                  },
                },
                background: {
                  solid: {
                    color: '',
                  },
                },
                outline: 'None',
                textSize: 11,
                fontFamily: 'Segoe UI',
              },
            ],
          },
        },
      },
    },
  },
];
