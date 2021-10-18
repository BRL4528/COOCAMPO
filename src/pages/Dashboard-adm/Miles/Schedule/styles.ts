import styled from 'styled-components';
import Tooltip from '../../../../components/Global/Tooltip';

export const Container = styled.div`
  /* display: flex; */
  /* align-items: stretch; */

  color: #333;
  width: 100%;
  height: 93vh;
  padding: 80px;
  overflow-x: visible;
  scroll-behavior: smooth;

  .section-vehicle-available {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 15px;
    padding-bottom: 20px;
    overflow: auto;
    white-space: nowrap;

    > div {
      background: #f5f5f5;
      border: 2px solid #eee;
      border-radius: 5px;
      display: flex;
      align-items: center;
      flex-direction: row;
      transition: var(--transition-speed);

      button {
        background: none;
        border: none;
        display: flex;
        align-items: center;
        flex-direction: row;
        transition: var(--transition-speed);
      }
      > section {
        margin-top: -50px;
        margin-right: 10px;
        cursor: pointer;

        button {
          background: none;
          border: none;
        }

        svg {
          transition: var(--transition-speed);
          right: 10px;
        }

        :hover {
          svg {
            transition: var(--transition-speed);
            color: var(--color-theme-primary);
          }
        }
      }
      & + div {
        margin-left: 15px;
      }
      :hover {
        border: 2px solid #eee;
        transition: var(--transition-speed);
      }
    }

    .selected {
      background: #e1faec;
      border: 2px solid #34cb79;
    }

    .favorite {
      svg {
        transition: var(--transition-speed);
        color: var(--color-theme-primary);
      }
    }
    .containerVehicle {
      display: flex;
      align-items: center;
      flex-direction: row;
      padding: 15px;
      transition: var(--transition-speed);
      cursor: pointer;

      & + div {
        margin-left: 15px;
      }
      img {
        width: 60px;
        height: 50px;
        border-radius: 50%;
        /* margin: 10px; */
      }

      section {
        margin-left: 10px;
      }

      :hover {
        filter: grayscale(100%) opacity(0.3);
        transition: var(--transition-speed);
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

export const Info = styled(Tooltip)`
  height: 20px;

  span {
    background: var(--color-theme-primary);
    color: #fff;
    font-weight: 600;

    &::before {
      border-color: var(--color-theme-primary) transparent;
    }
  }
`;
