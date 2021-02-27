import styled from 'styled-components';

interface LayoutProps {
  pathname: string;
  path: string;
}

export const OptionList = styled.li<LayoutProps>`
  /* ${({ path, pathname }: LayoutProps): string =>
    path === pathname ? 'filter: grayscale(0%) opacity(1);' : '#'} */

  :hover {
    transition: var(--transition-speed);
    background: var(--white-secondary);
  }

  ${({ path, pathname }: LayoutProps): string =>
    path === pathname ? 'border-left: solid 4px #f2c811;' : ''}

  ${({ path, pathname }: LayoutProps): string =>
    path === pathname ? ' background: var(--white-primary);' : ''}

  svg {
    ${({ path, pathname }: LayoutProps): string =>
      path === pathname ? 'filter: grayscale(0%) opacity(1);' : ''}
  }

  span {
    ${({ path, pathname }: LayoutProps): string =>
      path === pathname ? 'color: #f2c811;' : ''}

    ${({ path, pathname }: LayoutProps): string =>
      path === pathname ? 'filter: grayscale(0%) opacity(1);' : ''}
  }
`;
