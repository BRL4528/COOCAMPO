import styled, { css } from 'styled-components';

import { Form as unform } from '@unform/web';
import { shade } from 'polished';

export const Form = styled(unform)`
  .selected {
    background: rgba(28, 156, 217, 0.2);
    border: 2px solid #1c9cd9;
    /* background: #e1faec;
    border: 2px solid #34cb79; */
  }

  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* overflow: -moz-hidden-unscrollable; */

  p {
    color: var(--text-quarterly);
    font-size: 0.9rem;
    margin-top: 5px;
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

    h2 {
      color: #433f59;
      margin-bottom: 20px;
    }
  }

  > header {
    margin: 0;
    display: flex;
    align-items: center;
    /* flex-direction: row; */
    justify-content: space-between;
    width: 100%;
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

        /* ${props =>
          props.name === 'subGoals' &&
          css`
            color: #1c9cd9;
          `}
        ${props =>
          props.name === 'analyticModule' &&
          css`
            color: #1c9cd9;
          `} */

        & + button {
          margin-left: 20px;
        }
      }
    }
    height: 115px;
    transition: height 600ms ease;
  }
  section {
    display: flex;
    align-items: center;
    flex-direction: row;
    /* justify-content: space-between; */
    /* padding: 10px; */

    margin-bottom: 5px;
    > div {
      margin-top: 10px;
      margin-left: 5px;
      p {
        color: #795189;
      }
    }
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

export const UploadInputt = styled.div`
  /* margin-bottom: 32px; */
  /* position: relative; */
  margin-left: 15px;
  margin-top: 10px;
  align-self: center;

  label {
    /* position: absolute; */

    width: 38px;
    height: 38px;
    /* background: #ff9000; */
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      display: none;
    }
    div {
      margin: none;
    }
    svg {
      width: 20px;
      height: 20px;
      margin-top: 3px;

      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#eee')};
    }
  }
`;
