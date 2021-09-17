import styled from 'styled-components';

export const Container = styled.div`
  @media print {
    margin: 0;
    padding: 0;
    div {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 0;
      padding: 0;
      max-width: 2400px;
      max-height: 970px;
      background: red;
    }
  }

  .window {
    display: none;
  }
  .landscape {
    position: absolute;
    width: 160px;
    right: 0;
    margin-top: -65px;
  }
  .portrait {
    position: absolute;
    margin-top: -65px;
    display: flex;
    width: 190px;
    right: 0;
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

  strong {
    color: var(--text-primary);
    font-size: 12px;
  }
`;
