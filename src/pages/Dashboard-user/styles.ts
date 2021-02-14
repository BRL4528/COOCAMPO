import styled, { css } from 'styled-components';

interface PropsBI {
  load: boolean;
}

export const Conatiner = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* flex-direction: column; */
  text-align: center;

  color: #333;
  width: 100%;
  height: 100%;
  padding-left: 80px;
  z-index: 0;
  overflow-x: hidden;

  > svg {
    margin-top: 200px;
    color: var(--text-primary);
    width: 80px;
  }
`;

export const ContainerBI = styled.div<PropsBI>`
  width: 100%;
  height: 100%;
  background: #eee;

  margin-left: -2px;
  margin-top: -2px;
  right: 50px;
  ${props =>
    props.load &&
    css`
      display: none;
    `}
`;
