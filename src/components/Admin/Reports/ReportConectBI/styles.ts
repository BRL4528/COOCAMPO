import styled from 'styled-components';

interface Colors {
  color: string;
}
interface Props {
  load: boolean;
}

export const Container = styled.div<Props>`
  margin-top: 2px;
  margin-left: 100px;
  /* height: 100%; */
  /* width: 100%; */
  /* height: 100vh; */
  color: #433f59;
  ${(load: Props) => (load ? `display: flex;` : `display: none;`)}
  iframe {
    border: none;
    margin: 0;
  }

  svg {
    width: 20px;
    margin-left: 5px;
  }

  /* @media print {
    #print {
      min-width: 100%;
      height: 100vh;
      padding: 0;
    }
  } */

  .report {
    min-height: 100vh;
  }

  .loading {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100vh;
    margin-top: -190px;
  }

  .selected {
    max-height: 300px;

    /* transition: var(--transition-speed); */

    svg {
      color: #1c9cd9;
    }
    /* transition: max-height 10s; */
  }

  .logo {
    transform: rotate(180deg);
    transition: var(--transition-speed);
  }

  .fullscreen-enabled .fullscreen-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }
`;

export const Header = styled.header`
  text-align: center;
  margin: 40px 0px 45px 0;
  color: #433f59;
`;

export const CardeHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 40px;
`;

export const CardButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 30px;

  div {
    min-width: 200px;
    margin: 0 10px 0 10px;
    /* transition: var(--transition-speed); */

    @media only screen and (max-width: 600px) {
      /* transition: var(--transition-speed); */
      display: none;
    }
  }
`;
export const CardHeader = styled.div<Colors>`
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 30px 10px 40px 30px;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  transition: var(--transition-speed);

  margin: 5px 37px 2px 0;

  ${({ color }: Colors): string => `background: ${color};`}

  :hover {
    transition: var(--transition-speed);

    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);
  }

  @media all {
    color: #433f59;
    .page-break {
      display: none;
    }
  }

  @media print {
    html,
    body {
      color: #433f59;
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }

    /* width: 100%;
    height: 800px;
    display: flex;
    align-items: center;
    padding: 30px 20px 0px 10px;
    border-bottom: solid 3px #1c9cd9; */
  }

  /* @page {
    size: auto;
    margin: 20mm;
  } */
  span {
    /* height: ; */
    /* position: absolute; */
    /* display: flex;
    height: 200px; */
    border-right: 3px solid #fff;
  }
`;
export const DivLeft = styled.div`
  text-align: right;
  margin-right: 100px;
  /* width: 100%; */
  span {
    button {
      margin: 0;
      padding: 0;
      width: 100px;
      height: 40px;
      background: var(--color-theme-primary);
      border-radius: 3px;
      border: solid 2px var(--color-theme-primary);
      padding: 0 10px;
      color: var(--white-secondary);

      svg {
        width: 16px;
      }
    }
  }
`;
