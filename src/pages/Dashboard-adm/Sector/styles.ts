import styled, { css } from 'styled-components';

import Tooltip from '../../../components/Tooltip';

interface PrpsTrade {
  trendUp?: boolean;
  trendDown?: boolean;
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

  .fullscreen-enabled .fullscreen-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }
`;

export const CardeHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 40px;
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

export const CardGraphic = styled.div`
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 30px 10px 40px 30px;

  /* margin-left: 80px; */

  display: flex;
  /* align-items: center; */
  flex-direction: column;

  background: #fff;
  border-radius: 6px;

  transition: var(--transition-speed);
  border-bottom: solid 3px rgba(28, 156, 217, 0.12);

  /* padding: 20px; */
  margin: 10px 20px 20px 0;

  /* height: 350px;
  width: 550px; */

  :hover {
    transition: var(--transition-speed);
    border-bottom: solid 3px #1c9cd9;

    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.15);
  }

  @media all {
    color: #433f59;
    .page-break {
      display: none;
    }
  }

  @media print {
    html,
    body {
      color: #433f59;
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
    width: 100%;
    height: 800px;
    display: flex;
    align-items: center;
    padding: 30px 20px 0px 10px;
    border-bottom: solid 3px #1c9cd9;
  }

  @media print {
    .page-break {
      margin-top: 1rem;
      display: block;
      page-break-before: auto;
    }
  }

  /* @page {
    size: auto;
    margin: 20mm;
  } */
`;

export const CardBodyGoals = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const CardGraphicText = styled.div`
  @media print {
    color: #433f59;
    span {
      svg {
        display: none;
      }
    }
  }

  display: flex;
  width: 100%;

  justify-content: space-between;
  border-bottom: solid 1px rgba(150, 156, 186, 0.2);

  > span {
    display: flex;
    flex-direction: row;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
      margin: 10px;
      transition: color 0.5s;
      :hover {
        cursor: pointer;
        color: #1c9cd9;
      }
    }
  }
`;

export const GraphicTitle = styled.h3`
  width: 100%;
  padding-bottom: 15px;
`;

export const CardGoalsTrends = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

export const TrendsTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 10px 0;
`;

export const GoalItem = styled.div<PrpsTrade>`
  display: flex;
  margin: 2px 0 2px 0;
  justify-content: space-between;
  max-width: 220px;
  border-radius: 4px;
  padding: 3px;
  align-items: center;
  transition: var(--transition-speed);

  ${props =>
    props.trendDown &&
    css`
      background: rgba(255, 143, 143, 0.3);
    `}
  ${props =>
    props.trendUp &&
    css`
      background: rgba(145, 255, 143, 0.3);
    `}

    :hover {
    transition: var(--transition-speed);

    ${props =>
      props.trendDown &&
      css`
        background: rgba(255, 143, 143, 0.6);
      `}
    ${props =>
      props.trendUp &&
      css`
        background: rgba(145, 255, 143, 0.6);
      `}
  }
`;

export const Info = styled(Tooltip)`
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;

  > p {
    /* text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100px;
    max-height: 17px; */

    width: 100px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: ltr;
  }
  > svg {
    margin: 0;
    margin-left: 16px;
    text-align: center;
  }
`;

export const GraphicSpeed = styled.div`
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 30px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.09);
  /* margin-left: 80px; */

  display: flex;
  align-items: center;
  flex-direction: column;

  background: #fff;
  border-radius: 6px;

  /* transition: var(--transition-speed); */

  /* padding: 20px; */
  margin: 20px 20px 20px 20px;

  height: 290px;
  width: 280px;
  @media print {
    margin: 5px 5px 15px 5px;
    height: 280px;
    padding: 15px;
  }
`;
export const CardGraphicItem = styled.div`
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 30px 10px 40px 30px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.09);
  /* margin-left: 80px; */

  display: flex;
  align-items: center;
  flex-direction: column;

  background: #fff;
  border-radius: 6px;

  /* transition: var(--transition-speed); */

  /* padding: 20px; */
  margin: 20px 20px 20px 20px;

  height: 350px;
  width: 550px;

  @media print {
    margin: 15px 5px 5px 5px;
    padding: 15px;

    max-width: 510px;
    max-height: 340px;
  }
`;
