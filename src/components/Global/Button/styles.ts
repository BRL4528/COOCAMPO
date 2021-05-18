import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  groud?: boolean;
  visible: boolean;
  disabled?: boolean;
}

export const Container = styled.button<ContainerProps>`
  z-index: 1;
  background: var(--color-theme-primary);
  height: 45px;
  border-radius: 3px;
  border: solid 2px var(--color-theme-primary);
  padding: 0 10px;
  color: var(--white-secondary);
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  svg {
    width: 30px;
  }

  ${({ visible }: ContainerProps): string => (visible ? '' : 'display: none;')}

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      background: ${shade(0.2, '#f2c811')};
      border: ${shade(0.2, '#f2c811')};
    `}

  ${props =>
    props.groud &&
    css`
      background: var(--white-secondary);
      color: var(--color-theme-primary);
    `}

  &:hover {
    background: ${shade(0.2, '#f2c811')};

    border: ${shade(0.2, '#f2c811')};
  }

  .styleLoadButton {
    cursor: wait;
  }
`;

// export const CardButton = styled.div<ContainerProps>`
//   display: ;
//   align-items: center;
//   justify-content: space-between;
//   margin: 0 30px;

//   div {
//     min-width: 200px;
//     margin: 0 10px 0 10px;
//     /* transition: var(--transition-speed); */

//     @media only screen and (max-width: 600px) {
//       /* transition: var(--transition-speed); */
//       display: none;
//     }
//   }
// `;
