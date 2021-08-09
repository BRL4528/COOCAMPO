import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  /* display: flex; */
  /* align-items: stretch; */

  margin-top: 70px;
  margin-left: 8%;

  color: var(--text-quarterly);

  strong {
    color: var(--text-primary);
    font-size: 14px;
  }

  @media only screen and (max-width: 600px) {
    transition: var(--transition-speed);
    margin-left: 1%;
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

    @media only screen and (max-width: 600px) {
      display: none;
    }
  }
`;

export const TableContainerList = styled.div`
  margin-top: 80px;
  max-width: 700px;

  @media only screen and (max-width: 600px) {
    margin-top: 50px;
    max-width: 500px;
  }
  > span {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 18px 18px 10px 18px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    & + span {
      margin-top: 16px;
    }
    &:hover {
      transform: translateX(10px);
    }
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    > div {
      margin: 0 16px;
      flex: 1;
      main {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        margin: 0;
        padding: 0;

        div {
          strong {
            font-size: 20px;
            color: #3d3d4d;
          }
          > p {
            font-size: 18px;
            color: #a8a8b3;
            margin-top: 4px;
          }
        }

        span {
          svg {
            color: var(--dark-tertiary);
            width: 20px;
            height: 20px;
            margin-left: 20px;
            /* margin: 10px; */
            transition: color 0.5s;
            transition: var(--transition-speed);
            :hover {
              cursor: pointer;
              color: var(--color-theme-primary);
            }
          }
        }
      }
    }

    footer {
      display: flex;
      align-items: center;
      text-align: center;
      height: 50px;
      /* justify-content: space-between; */

      flex-direction: row;

      margin-top: 15px;
      border-top: solid 1px rgba(150, 156, 186, 0.2);

      div {
        text-align: center;
        svg {
          margin: 0;
        }
      }

      > p {
        font-size: 14px;
        color: #a8a8b3;
      }

      a {
        outline: none;
        text-decoration: none;
        font-size: 14px;
        color: #7159c1;
        margin-left: 5px;
        transition: var(--transition-speed);

        :hover {
          color: ${shade(0.2, '#7159c1')};
        }
      }
    }
  }
`;
