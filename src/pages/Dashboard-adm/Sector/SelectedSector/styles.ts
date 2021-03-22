import styled from 'styled-components';

export const Container = styled.div`
  /* display: flex; */
  /* align-items: stretch; */

  margin-top: 12px;
  margin-left: 8%;

  color: #433f59;

  strong {
    color: var(--text-primary);
    font-size: 14px;
  }

  .selected {
    display: flex;
  }

  .logo {
    transform: rotate(180deg);
    transition: var(--transition-speed);

    @media print {
      margin: 0px;
      display: none;
    }
  }
`;

export const CardeHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 40px;
`;

export const CardCenter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* width: 100%; */
  /* margin-left: auto; */
  /* margin-right: auto; */

  > fieldset {
    display: none;
    flex-direction: row;
    justify-content: space-between;

    border: none;
  }
`;

export const CardGraphicHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 20px;
  /* -height: 100px; */
  width: 800px;

  background: #fff;
  border-radius: 6px;

  transition: var(--transition-speed);
  border-bottom: solid 3px rgba(28, 156, 217, 0.12);

  margin: 10px 20px 20px 0;

  :hover {
    transition: var(--transition-speed);
    border-bottom: solid 3px #1c9cd9;

    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);
  }
  svg {
    color: var(--dark-tertiary);
    width: 20px;
    height: 20px;
    margin: 10px;
    transition: color 0.5s;
    transition: var(--transition-speed);
    transition: var(--transition-speed);
    :hover {
      cursor: pointer;
      color: #1c9cd9;
    }
  }

  @media print {
    flex-direction: column;
    max-height: 800px;
    border-bottom: solid 3px #1c9cd9;

    margin: 10px 20px 20px -40px;
    .iconPrint {
      margin: 0px;
      display: none;
    }
  }
`;
export const CardGraphic = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 30px 10px 40px 30px;
  /* -height: 100px; */
  width: 800px;

  background: #fff;
  border-radius: 6px;

  transition: var(--transition-speed);
  border-bottom: solid 3px rgba(28, 156, 217, 0.12);

  margin: 10px 20px 20px 0;

  :hover {
    transition: var(--transition-speed);
    border-bottom: solid 3px #1c9cd9;

    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);
  }

  @media only screen and (max-width: 900px) {
    width: 600px;
  }

  @media only screen and (max-width: 700px) {
    width: 400px;
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

    display: flex;
    align-items: center;
    max-width: 800px;
    max-height: 800px;
    padding: 30px 20px 0px 20px;
    border-bottom: solid 3px #1c9cd9;
    margin-left: -40px;
  }

  @media print {
    .page-break {
      /* margin-top: 1rem; */
      display: block;
      page-break-before: auto;
    }
  }

  /* @page {
    size: auto;
    margin: 20mm;
  } */
`;
export const CardGraphicBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  /* padding: 30px 10px 40px 30px; */
  max-height: 200px;
  width: 390px;

  background: #fff;
  border-radius: 6px;

  transition: var(--transition-speed);
  border-bottom: solid 3px rgba(28, 156, 217, 0.12);

  margin: 10px 20px 20px 0;

  :hover {
    transition: var(--transition-speed);
    /* border-bottom: solid 3px #1c9cd9; */

    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);
  }

  @media only screen and (max-width: 900px) {
    width: 290px;
  }

  @media only screen and (max-width: 700px) {
    width: 190px;
  }

  /* @page {
    size: auto;
    margin: 20mm;
  } */
`;
