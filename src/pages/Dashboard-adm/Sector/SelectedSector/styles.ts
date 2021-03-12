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
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    border: none;
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
    /* border-bottom: solid 3px #1c9cd9; */

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
    width: 100%;
    height: 800px;
    display: flex;
    align-items: center;
    padding: 30px 20px 0px 10px;
    border-bottom: solid 3px #1c9cd9;
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
