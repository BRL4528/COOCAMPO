import styled from 'styled-components';

import { shade } from 'polished';

export const ContainerMaster = styled.div`
  color: #433f59;
  align-items: center;
  flex-direction: column;
  /* background: #fff; */
  background: #f2f0e6;

  .selectedValue {
    background: rgba(28, 156, 217, 0.2);
    border: 2px solid #1c9cd9;
  }
`;

export const Container = styled.div`
  .selected {
    background: var(--green-secundary);
    border-bottom: 3px solid var(--green-primary);
    max-height: 90px;

    h3 {
      display: none;
    }

    form {
      display: none;
      /* max-height: 90px; */
    }

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      h2 {
        > span {
          visibility: visible;
          margin-bottom: -15px;
          svg {
            color: var(--green-primary);
            border-color: var(--color-theme-primary);

            cursor: pointer;
          }
        }
      }
    }
  }

  display: flex;
  align-items: center;
  flex-direction: column;
  color: #073b4c;
  width: 100%;
  height: 100vh;

  overflow: hidden;

  iframe {
    width: 100%;
    height: 100vh;
    border: none;
    overflow: hidden;
  }

  /* ::-webkit-scrollbar {
    width: 0.2rem;
    height: 0.5rem;
  } */

  ::-webkit-scrollbar-track {
    background: rgba(25, 25, 26, 0.23);
    border-radius: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background: #f2c811;
    border-radius: 12px;
  }

  > header {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 700px;

    margin: 15px;
    border-radius: 6px;
    min-height: 100px;
    padding: 35px;
    background: var(--color-theme-primary);
  }
  > span {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    min-width: 700px;

    button {
      display: flex;
      align-items: center;
      justify-content: space-around;

      height: 40px;
      width: 300px;
      transition: max-height 1s;
      background: var(--white-secondary);
      box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.07);
      border-bottom: 3px solid var(--white-secondary);
      border: none;
      border-radius: 4px;

      transition: var(--transition-speed);

      svg {
        transition: var(--transition-speed);
        color: var(--dark-secondary);
      }

      :hover {
        background: ${shade(0.2, '#fff')};

        svg {
          color: var(--dark-quaternary);
        }
      }
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    padding: 17px;
    margin: auto;
    width: 100%;
    bottom: 0;
    /* position: fixed; */

    img {
      width: 180px;
    }

    @media (max-width: 600px) {
      font-size: 14px;
      img {
        width: 100px;
      }
    }
  }
`;
