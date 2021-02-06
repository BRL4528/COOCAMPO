import styled from 'styled-components';

interface IGoals {
  item: string;
  selected: string;
}

export const Container = styled.div`
  /* display: flex; */
  /* align-items: stretch; */

  margin-top: 12px;
  margin-left: 8%;

  color: #433f59;

  strong {
    color: var(--text-primary);
    font-size: 14px;
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
    /* transition: var(--transition-speed); */

    @media only screen and (max-width: 600px) {
      /* transition: var(--transition-speed); */
      display: none;
    }
  }
`;

// export const TableContainer = styled.section`
//   /* margin-top: 40px; */
//   margin: 40px 30px 0 0;

//   table {
//     width: 100%;
//     border-spacing: 0 8px;
//     th {
//       color: #969cb3;
//       font-weight: normal;
//       padding: 20px 32px;
//       text-align: left;
//       font-size: 14px;
//       line-height: 24px;
//     }

//     td {
//       /* cursor: pointer; */
//       padding: 20px 32px;
//       border: 0;
//       background: #fff;
//       font-size: 14px;
//       font-weight: normal;
//       color: #969cb3;
//       border-radius: 5px;

//       h3 {
//         color: #433f59;
//       }
//     }
//   }
// `;
export const ContainerInfo = styled.div`
  display: flex;
  width: 100%;

  /* margin-left: 110px; */
`;

export const TableContainer = styled.div`
  position: absolute;
  margin-top: 80px;
  max-width: 700px;
  /* overflow: scroll; */
  button {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    text-align: initial;

    transition: transform 0.2s;
    border: none;
    & + button {
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
    div {
      margin: 0 16px;
      flex: 1;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const TableInfo = styled.div`
  width: 100%;
  /* background: red; */
  margin-left: 750px;
  margin-top: 80px;
`;

export const CadView = styled.div<IGoals>`
  visibility: hidden;
  position: absolute;
  /* overflow: auto; */
  background: #fff;
  border-radius: 5px;
  width: 700px;
  height: 60%;
  padding: 24px;
  display: block;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  text-align: initial;

  transition: transform 0.2s;
  border: none;
  /* width: 200px; */

  ${({ item, selected }: IGoals): string =>
    item === selected ? 'visibility: visible;' : ''}

  >span {
    /* background: #fff; */
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    text-align: initial;

    transition: transform 0.2s;
    border: none;
    & + button {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    div {
      margin: 0 16px;
      flex: 1;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }
  }
`;

export const ViewSubGoals = styled.div`
  > span {
    padding: 24px;

    div {
      margin: 0 16px;
      flex: 1;
      padding: 10px;
      border-radius: 4px;
      cursor: pointer;
      strong {
        font-size: 17px;
        color: #3d3d4d;
      }
      p {
        font-size: 15px;
        color: #a8a8b3;
        margin-top: 4px;
      }

      :hover {
        background: #eee;
      }
    }
  }
`;
