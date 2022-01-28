/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function layoutSettings() {
  return {
    // width: '150vh',
    width: `${window.innerWidth > 1500 ? '150vh' : '97vw'}`,
    border: 'none',
    height: `${window.innerWidth > 1500 ? '87vh' : '81vh'}`,
    maxHeight: '100vh',
    margin: '0',

    backgroundColor: '#333',
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
