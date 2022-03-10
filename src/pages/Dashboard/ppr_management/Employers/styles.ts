import styled from 'styled-components';

export const Container = styled.div`
  /* display: flex; */
  /* align-items: stretch; */
  margin-top: 120px;
  margin-left: 8%;
  max-width: 1200px;

  color: #433f59;

  strong {
    color: var(--text-primary);
    font-size: 14px;
  }

  .selected {
    max-height: 400px;

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
  /* margin: 0 30px; */

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

export const CardGraphic = styled.div`
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 30px 10px 40px 30px;
  max-height: 100px;

  /* transition: max-height 10s; */
  /* margin-left: 80px; */

  display: flex;
  /* align-items: center; */
  flex-direction: column;

  background: #fff;
  border-radius: 6px;

  transition: var(--transition-speed);
  border-bottom: solid 3px rgba(28, 156, 217, 0.12);

  /* padding: 20px; */
  margin: 10px 20px 20px 0;

  /* height: 350px;
  width: 550px; */

  div {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;

    /* transition: var(--transition-speed); */
  }

  :hover {
    transition: var(--transition-speed);
    border-bottom: solid 3px #1c9cd9;

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
    width: 100%;
    height: 800px;
    display: flex;
    align-items: center;
    padding: 30px 20px 0px 10px;
    border-bottom: solid 3px #1c9cd9;
  }

  @media print {
    .page-break {
      margin-top: 1rem;
      display: block;
      page-break-before: auto;
    }
  }

  /* @page {
    size: auto;
    margin: 20mm;
  } */
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
