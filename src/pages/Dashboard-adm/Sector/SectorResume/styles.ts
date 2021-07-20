import styled from 'styled-components';

export const Container = styled.div`
  @media print {
    div {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 0;
      padding: 0;
      max-width: 2000px;
      max-height: 770px;
    }
  }
`;

export const CardeHeader = styled.div`
  margin-top: 75px;
  margin-left: 8%;
  margin-right: 8%;
  color: #433f59;
  font-size: 13px;
  /* width: 100%; */

  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    button {
      margin: 0;
      padding: 0;
      width: 100px;
      height: 40px;
    }
  }

  strong {
    color: var(--text-primary);
    font-size: 12px;
  }
`;
