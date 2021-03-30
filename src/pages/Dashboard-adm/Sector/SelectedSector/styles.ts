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

  strong {
    color: var(--text-primary);
    font-size: 14px;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 80px;

  color: #433f59;

  div {
    display: flex;
    align-items: center;
    flex-direction: row;

    a {
      text-decoration: none;
      color: #433f59;

      & + a {
        margin-left: 40px;
      }
    }

    p {
      transition: var(--transition-speed);
      font-weight: 500;

      cursor: pointer;
      margin-bottom: 30px;

      :hover {
        color: #1c9cd9;
      }
      & + p {
        margin-left: 40px;
      }
    }
  }
  .sublime {
    border-bottom: solid 2px #1c9cd9;
  }
`;
