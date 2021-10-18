import styled from 'styled-components';

import { Form as unform } from '@unform/web';
import { shade } from 'polished';

export const Form = styled(unform)`
  .selected {
    background: rgba(28, 156, 217, 0.2);
    border: 2px solid #1c9cd9;
  }

  padding: 30px 40px;
  display: flex;
  flex-direction: column;

  p {
    color: var(--text-quarterly);
    font-size: 0.9rem;
    margin-top: 7px;
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

        & + button {
          margin-left: 20px;
        }
      }
    }
    height: 115px;
    transition: height 600ms ease;
  }

  header {
    span {
      label {
        width: 48px;
        height: 48px;
        margin-left: 15px;
        cursor: pointer;
        transition: background-color 0.2s;

        input {
          display: none;
        }

        &:hover {
          color: #714591;
        }
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
  margin-top: 15px;

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

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
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
    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
