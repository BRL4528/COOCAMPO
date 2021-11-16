import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isErrored: boolean;
  isFilled: boolean;
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  /* background: var(--white-secondary);
  border-radius: 3px;
  border: 1px solid var(--dark-quaternary);
  width: 100%;
  color: var(--dark-quaternary);

  align-items: center; */
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    display: flex;
    align-items: initial;
    flex-direction: column;
    width: 100%;
  }

  .select-block {
    position: relative;
  }

  .select-block + .select-block {
    margin-top: 1.4rem;
  }

  .select-block label {
    font-size: 1rem;
  }

  select {
    width: 100%;
    height: 2.6rem;
    /* margin-top: 0.8rem; */
    border-radius: 6px;
    background: var(--text-tertiary);
    color: var(--dark-quaternary);
    border: 1px solid var(--dark-quaternary);
    outline: 0;
    padding: 0 0.4rem;
    font: 1.6rem;
  }

  .select-block:focus-within::after {
    /* width: calc(100% - 3.2rem); */
    height: 2px;
    content: '';
    /* background: var(--color-theme-primary); */
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }

  & + div {
    margin: 6px 0 6px 0;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--red-secundary);
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ;
      border-color: #1c9cd9;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #1c9cd9;
    `}





  section {
    width: 100%;
  }
`;

export const Error = styled(Tooltip)`
  width: 30px;
  height: 20px;
  svg {
    margin: 0;
    margin-left: 16px;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
