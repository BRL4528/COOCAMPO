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
