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

export const TableContainer = styled.section`
  /* margin-top: 40px; */
  margin: 40px 30px 0 0;

  table {
    width: 100%;
    border-spacing: 0 8px;
    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 14px;
      line-height: 24px;
    }

    td {
      cursor: pointer;
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 14px;
      font-weight: normal;
      color: #969cb3;
      border-radius: 5px;

      h3 {
        color: #433f59;
      }
    }
  }
`;
