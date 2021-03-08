import styled, { css } from 'styled-components';

import { Form as unform } from '@unform/web';
import Tooltip from '../../../Global/Tooltip';

interface PropsSub {
  opengoals?: boolean;
  openAnalytic?: boolean;
}

export const Form = styled(unform)<PropsSub>`
  @keyframes open-analyticModule {
    from {
      transform: translate3d(0px, -50px, 0px);
      opacity: 0;
    }

    to {
      transform: translate3d(0px, 0px, 0px);
      opacity: 0.9;
    }
  }

  @keyframes close-analyticModule {
    from {
      transform: translate3d(0px, 0px, 0px);
      opacity: 0.9;
    }

    to {
      transform: translate3d(0px, -50px, 0px);
    }
  }
  .selected {
    background: rgba(28, 156, 217, 0.2);
    border: 2px solid #1c9cd9;
  }

  .openModelAnlalytc {
    animation: open-analyticModule 1s;
    display: flex;
    filter: grayscale(0) opacity(1);
  }
  .closedModelAnalytic {
    animation: close-analyticModule 1s;
    display: none;
    filter: grayscale(0) opacity(0);
  }

  padding: 30px 40px;
  display: flex;
  flex-direction: column;

  p {
    color: var(--text-quarterly);
    font-size: 0.9rem;
    margin-top: 10px;
  }

  > span {
    display: flex;
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;
    /* align-items: center; */

    svg {
      cursor: pointer;
      color: #433f59;
      transition: var(--transition-speed);

      :hover {
        color: var(--text-primary);
      }
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      margin-bottom: 20px;

      h2 {
        color: #433f59;
      }
      svg {
        color: #433f59;
        margin: 0px 0px 0px 5px;
        transition: var(--transition-speed);

        :hover {
          color: var(--green-primary);
          transform: rotate(90deg);
        }
      }
    }
  }

  button {
    margin: 0 0 20px 0;
    align-self: flex-end;
  }

  nav {
    span {
      display: flex;
      flex-direction: row;

      button {
        color: var(--text-primary);
        margin-top: 20px;
        border: none;
        background: none;
        font-size: 15px;
        font-weight: 500;

        display: flex;
        align-items: center;
        transition: var(--transition-speed);
        svg {
          margin-left: 8px;
        }

        :hover {
          transition: var(--transition-speed);
          color: #1c9cd9;
        }
        p {
          font-size: 12px;
        }

        & + button {
          margin-left: 20px;
        }
      }
    }
    height: 115px;
    transition: height 600ms ease;

    ${props =>
      props.opengoals &&
      css`
        height: 20rem;
      `}

    ${props =>
      props.openAnalytic &&
      css`
        height: 20rem;
      `}
  }
  @media only screen and (max-width: 600px) {
    padding: 10px 20px;
    display: flex;
    flex-direction: column;

    h2 {
      margin-bottom: 10px;
      /* padding-bottom: 30px; */
    }

    button {
      z-index: 1;
      margin-top: 48px;
      align-self: flex-end;
    }

    header {
      flex-direction: column;
    }

    nav {
      padding-bottom: 40px;
      span {
        display: flex;
        flex-direction: column;
        padding-bottom: 40px;
      }
    }
  }
`;

export const DivLeft = styled.div`
  text-align: right;
  width: 100%;

  button {
    width: 200px;
    div {
      > svg {
        color: #fff;
        width: 20px;
      }
    }
  }
`;

export const ContainerSub = styled.div`
  margin: 30px;
`;

export const CardSub = styled.div`
  width: 100%;
  margin: 10px;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  color: #433f59;

  transition: var(--transition-speed);
  display: flex;
  border: 2px solid #fff;

  cursor: pointer;

  div {
    display: flex;
    align-items: initial;
    flex-direction: column;

    p {
      font-size: 13px;
    }
  }

  :hover {
    transition: var(--transition-speed);
    background: rgba(28, 156, 217, 0.1);
    border: 2px solid rgba(28, 156, 217, 0);
  }
`;

export const ContainerAnalytic = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 30px 15px 15px;
  z-index: 1;
  /* margin: 10px; */
  /* margin-left: -20px; */
  width: 80%;
  max-height: 500px;
  position: absolute;
  background: #eee;
  border: 2px solid #eee;
  border-radius: 4px;
  overflow: auto;
  /* display: none; */

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 30px;
    margin-left: 10px;

    svg {
      cursor: pointer;
      color: #433f59;
      transition: var(--transition-speed);

      :hover {
        color: var(--text-primary);
      }
    }
    strong {
      color: var(--text-quarterly);
      /* font-size: 0.9rem; */
    }
  }

  ::-webkit-scrollbar {
    width: 0.2rem;
    height: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background: rgba(25, 25, 26, 0.23);
    border-radius: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background: #f2c811;
    border-radius: 12px;
  }
`;

export const CardAnalytic = styled.div<PropsSub>`
  margin: 10px;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  color: #433f59;
  width: 100%;
  /* filter: grayscale(100%) opacity(0); */
  transition: var(--transition-speed);
  /* display: none; */
  border: 2px solid #fff;

  cursor: pointer;
  display: flex;

  /* ${props =>
    props.openAnalytic &&
    css`
      filter: grayscale(0) opacity(0.7);
    `} */

  :hover {
    transition: var(--transition-speed);
    background: rgba(28, 156, 217, 0.1);
    border: 2px solid rgba(28, 156, 217, 0);
  }
`;

export const ContainerGoal = styled.div<PropsSub>`
  display: none;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  filter: grayscale(100%) opacity(0);
  ${props =>
    props.opengoals &&
    css`
      display: flex;
      filter: grayscale(0) opacity(0.7);
    `}
`;

export const CircleAdd = styled.div`
  display: flex;
  align-items: center;
  padding: 7px;
  margin-left: 16px;
  /* width: 10%; */
  /* height: 15%; */
  border-radius: 50%;
  border: 2px solid #eee;
  color: var(--text-quarterly);
  transition: var(--transition-speed);

  :hover {
    background: rgba(28, 156, 217, 0.2);
    border: 2px solid #1c9cd9;
  }

  svg {
    cursor: pointer;
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
