import styled from 'styled-components';

export const CardeHeader = styled.div`
  margin-top: 12px;
  margin-left: 8%;
  color: #433f59;
  /* width: 100%; */

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 40px;
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* width: 100%; */
  margin-left: 80px;

  color: #433f59;

  div {
    display: flex;
    align-items: center;
    flex-direction: row;

    p {
      transition: var(--transition-speed);
      font-weight: 500;

      cursor: pointer;

      margin-bottom: 30px;

      :hover {
        color: #1c9cd9;
      }
      & + p {
        margin-left: 25px;
      }
    }
  }
`;
