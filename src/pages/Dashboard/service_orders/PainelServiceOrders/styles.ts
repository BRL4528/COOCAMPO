import styled from 'styled-components';

import { shade } from 'polished';

interface Iprops {
  titleItem?: string;
  toogleFilter?: boolean;
}

export const Container = styled.div<Iprops>`
  /* display: flex; */
  /* align-items: stretch; */

  color: #333;
  width: 100%;
  height: 93vh;
  padding: 80px;
  overflow-x: visible;
  scroll-behavior: smooth;

  .section-filter {
    header {
      .Ausente {
        color: var(--color-title-in-primary);
        background: #e83f5b;
        border-color: #e83f5b;
        :hover {
          background: ${shade(0.2, '#e83f5b')};
          border-color: ${shade(0.2, '#e83f5b')};
        }
      }

      .Presente {
        color: var(--color-title-in-primary);
        background: #33cc95;
        border-color: #33cc95;
        :hover {
          background: ${shade(0.2, '#33CC95')};
          border-color: ${shade(0.2, '#33CC95')};
        }
      }
      button {
        max-width: 100px;
        max-height: 35px;
      }
      span {
        & + span {
          margin-left: 15px;
        }
      }
    }

    form {
      display: flex;
      border: 1px solid var(--text-tertiary);
      visibility: visible;
      height: 250px;
      transition: var(--transition-speed);

      ${({ toogleFilter }: Iprops): string =>
        toogleFilter ? 'visibility: hidden; height: 0px;' : ''}
      section {
        height: 250px;
        transition: var(--transition-speed);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;

        font-size: 12px;
        max-width: 900px;

        ${({ toogleFilter }: Iprops): string =>
          toogleFilter ? 'display: none; height: 0px;' : ''}
        > div {
          fieldset {
            width: 300px;
          }
        }

        fieldset {
          padding: 30px;
          border: 1px solid var(--text-tertiary);
        }

        .space-top {
          margin-top: 20px;
        }

        > span {
          height: 200px;
          display: flex;
          align-items: flex-end;

          button {
            height: 30px;
          }
        }
      }
    }
  }

  a {
    text-decoration: none;
  }

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

export const CardeHeader = styled.div<Iprops>`
  ${({ titleItem }: Iprops) =>
    titleItem === 'none' ? 'display: none;' : 'display: flex;'}

  width: 100%;

  align-items: center;
  justify-content: space-between;

  margin-top: 40px;
  div {
    h2 {
      display: flex;
      flex-direction: row;

      svg {
        margin-left: 4px;
      }
    }
  }
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
