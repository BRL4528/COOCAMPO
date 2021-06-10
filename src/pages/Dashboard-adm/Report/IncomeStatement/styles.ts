import styled from 'styled-components';

interface Colors {
  color: string;
}

export const Container = styled.div`
  /* display: flex; */
  /* align-items: stretch; */

  margin-top: 2px;
  margin-left: 8%;

  color: #433f59;

  strong {
    color: var(--text-primary);
    font-size: 14px;
  }

  .selected {
    max-height: 300px;

    /* transition: var(--transition-speed); */

    div {
      max-height: 200px;
      visibility: visible;
      opacity: 1;
      /* transition: var(--transition-speed); */
    }
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

  margin-bottom: 30px;
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
  flex-direction: column;
  margin-top: 40px;

  .speedometer {
    margin-top: 60px;
  }

  h3 {
    color: #433f59;
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;
  color: #fff;

  div {
    display: flex;
    align-items: center;
    img {
      width: 220px;
    }
  }
`;
