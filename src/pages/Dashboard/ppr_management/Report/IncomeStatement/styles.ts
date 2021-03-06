import shade from 'polished/lib/color/shade';
import styled from 'styled-components';

interface Colors {
  color: string;
}

export const Container = styled.div`
  /* display: flex; */
  /* align-items: stretch; */

  margin-top: 70px;
  margin-left: 8%;

  color: #433f59;

  strong {
    color: var(--text-primary);
    font-size: 14px;
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

  section {
    margin-bottom: 3rem;

    button {
      margin: 8px;
      min-width: 60px;
      border-radius: 6px;
      border: 2px solid #f2c811;
      color: #ffb703;
      font-weight: 500;
      font-size: small;
      padding: 5px;
      background: #fdffb6;
      transition: var(--transition-speed);

      :hover {
        transition: var(--transition-speed);

        background: ${shade(0.2, '#fdffb6')};
      }
    }

    .selected {
      background: #e1faec;
      border: 2px solid #34cb79;
      color: #34cb79;
    }
    .disabled {
      background: #eee;
      border: 2px solid var(--dark-tertiary);
      color: var(--dark-tertiary);
      cursor: not-allowed;
      /* display: block; */
    }
  }
`;

export const Header = styled.header`
  text-align: center;
  margin: 20px 0px 25px 0;
  color: #433f59;
`;

export const CardeHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 50px;
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
  border-radius: 12px;
  padding: 20px 10px 20px 30px;
  min-height: 80px;
  max-height: 120px;
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
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);

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

  @media print {
    margin-right: 0px;
  }
  @media print {
    header {
      color: #433f59;
    }
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
    border-radius: 20px;
  }
`;

export const Revenues = styled.div`
  text-align: center;
  color: #fff;
  margin: 0 auto;
  /* margin-left: 15px; */
  max-width: 300px;
  min-width: 300px;
`;
export const Result = styled.div`
  text-align: center;
  color: #fff;
  margin: 0 auto;
  max-width: 300px;
  min-width: 300px;
`;
export const Finances = styled.div`
  text-align: center;
  color: #fff;
  margin: 0 auto;
  max-width: 300px;
  min-width: 300px;
  /* margin-right: 25px; */
`;

export const CardGraphicText = styled.span`
  @media print {
    color: #433f59;
    span {
      svg {
        display: none;
      }
    }
  }

  display: flex;
  width: 100%;
  margin-bottom: 15px;

  justify-content: space-between;
  border-bottom: solid 1px rgba(150, 156, 186, 0.2);

  > span {
    display: flex;
    flex-direction: row;

    svg {
      color: var(--dark-tertiary);
      width: 20px;
      height: 20px;
      margin: 10px;
      transition: color 0.5s;
      transition: var(--transition-speed);
      :hover {
        cursor: pointer;
        color: #1c9cd9;
      }
    }
  }
`;

export const GraphicTitle = styled.section`
  /* width: 100%; */
  display: flex;
  align-items: initial;
  flex-direction: column;
  padding-bottom: 15px;

  p {
    margin-top: 5px;
    font-size: 14px;
    color: var(--text-primary);
  }
`;

export const ContainerGraphics = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* max-width: 400px; */
  margin-top: 5px;
  margin-right: 45px;
`;

export const CardGraphicSpeed = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 10px;
  margin-right: 40px;

  /* text-align: center; */
  /* margin: 0 auto; */
  /* max-width: 300px;
  min-width: 300px; */

  .speedometer {
    margin-top: 20px;
  }

  h3 {
    color: #433f59;
  }
  span {
    h3 {
      color: #433f59;
      margin-top: -8px;
      /* margin-bottom: 8px; */
    }
  }

  div {
    text-align: center;
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;
  margin-top: -30px;
  color: #fff;

  div {
    display: flex;
    align-items: center;
    img {
      width: 220px;
    }
  }
`;
