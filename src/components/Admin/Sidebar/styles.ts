import styled from 'styled-components';

interface LayoutProps {
  pathname: string;
  path: string;
  visible: boolean;
  theme: string;
}

interface IThemeProps {
  theme: string;
}

export const OptionList = styled.li<LayoutProps>`
  /* ${({ path, pathname }: LayoutProps): string =>
    path === pathname ? 'filter: grayscale(0%) opacity(1);' : '#'} */

  :hover {
    transition: var(--transition-speed);
    background: rgb(255, 242, 1, 0.05);
  }

  ${({ visible }: LayoutProps): string => (visible ? '' : 'display: none;')}

  ${({ path, pathname }: LayoutProps): string =>
    path === pathname ? 'border-left: solid 4px #f2c811;' : ''}

  ${({ path, pathname }: LayoutProps): string =>
    path === pathname ? 'background: rgb(255, 242, 1, 0.1);' : ''}

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

export const Container = styled.div<IThemeProps>`
  .navbar {
    ${({ theme }: IThemeProps): string =>
      theme === 'light' ? 'background: #060606' : 'background: #1F2029'};
  }
`;
