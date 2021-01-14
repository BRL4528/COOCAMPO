import styled, { css } from 'styled-components';

import { Form as unform } from '@unform/web';

interface PropsForm {
  openSub: boolean;
}

export const Form = styled(unform)<PropsForm>`
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* overflow: -moz-hidden-unscrollable; */

  h2 {
    color: #433f59;
    margin-bottom: 20px;
    /* padding-bottom: 30px; */
  }

  button {
    margin-top: 48px;
    align-self: flex-end;
  }

  > header {
    margin: 0;
    display: flex;
    align-items: center;
    /* flex-direction: row; */
    justify-content: space-between;
    width: 100%;

    div {
      margin: 0 0 6px;

      & + div {
        margin: 0 0 6px 6px;
      }
    }
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

        ${props =>
          props.openSub &&
          css`
            color: #1c9cd9;
          `}

        & + button {
          margin-left: 20px;
        }
      }
    }
    height: 20px;
    transition: height 600ms ease;

    :hover {
      /* transition: width 600ms ease; */
    }
    ${props =>
      props.openSub &&
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
  }
`;
export const ContainerSub = styled.div`
  margin: 30px;
`;

export const CardSub = styled.div<PropsForm>`
  margin: 10px;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  color: #433f59;
  filter: grayscale(100%) opacity(0);
  transition: var(--transition-speed);
  display: none;

  cursor: pointer;

  ${props =>
    props.openSub &&
    css`
      display: flex;
      filter: grayscale(0) opacity(0.7);
    `}

  :hover {
    transition: var(--transition-speed);
    background: rgba(28, 156, 217, 0.3);
  }
`;
