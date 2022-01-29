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
      '#094782',
      '#0B72D7',
      '#098BF5',
      '#54B5FB',
      '#71C0A7',
      '#57B956',
      '#478F48',
      '#326633',
    ],
    tableAccent: '#094782',
    visualStyles: {
      '*': {
        '*': {
          '*': [
            {
              fontFamily: 'Segoe UI',
              color: { solid: { color: '#252423' } },
              labelColor: { solid: { color: '#720112' } },
              secLabelColor: { solid: { color: '#720112' } },
              titleColor: { solid: { color: '#720112' } },
            },
          ],
          labels: [
            {
              color: { solid: { color: '#720112' } },
            },
          ],
          categoryLabels: [
            {
              color: { solid: { color: '#720112' } },
            },
          ],
          border: [
            {
              show: true,
              color: { solid: { color: '#484644' } },
              radius: 2,
            },
          ],
          dropShadow: [
            {
              color: {
                solid: {
                  color: '#720112',
                },
              },
              show: true,
              position: 'Outer',
              preset: 'Custom',
              shadowSpread: 1,
              shadowBlur: 1,
              angle: 45,
              shadowDistance: 1,
              transparency: 95,
            },
          ],
        },
      },
    },
  },
];
