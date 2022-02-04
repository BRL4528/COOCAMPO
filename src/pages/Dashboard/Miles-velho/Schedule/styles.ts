import styled from 'styled-components';
import { shade } from 'polished';
import Tooltip from '../../../../components/Global/Tooltip';

export const Container = styled.div`
  /* display: flex; */
  /* align-items: stretch; */

  color: #333;
  width: 100%;
  height: 93vh;
  padding: 80px;
  overflow-x: visible;
  scroll-behavior: smooth;

  .section-vehicle-available {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 15px;
    padding-bottom: 20px;
    overflow: auto;
    white-space: nowrap;

    > div {
      background: #f5f5f5;
      border: 2px solid #eee;
      border-radius: 5px;
      display: flex;
      align-items: center;
      flex-direction: row;
      transition: var(--transition-speed);

      button {
        background: none;
        border: none;
        display: flex;
        align-items: center;
        flex-direction: row;
        transition: var(--transition-speed);
      }
      > section {
        margin-top: -50px;
        margin-right: 10px;
        cursor: pointer;

        button {
          background: none;
          border: none;
        }

        svg {
          transition: var(--transition-speed);
          right: 10px;
        }

        :hover {
          svg {
            transition: var(--transition-speed);
            color: var(--color-theme-primary);
          }
        }
      }
      & + div {
        margin-left: 15px;
      }
      :hover {
        border: 2px solid #eee;
        transition: var(--transition-speed);
      }
    }

    .selected {
      background: #e1faec;
      border: 2px solid #34cb79;
    }

    .favorite {
      svg {
        transition: var(--transition-speed);
        color: var(--color-theme-primary);
      }
    }
    .containerVehicle {
      display: flex;
      align-items: center;
      flex-direction: row;
      padding: 15px;
      transition: var(--transition-speed);
      cursor: pointer;

      & + div {
        margin-left: 15px;
      }
      img {
        width: 60px;
        height: 50px;
        border-radius: 50%;
        /* margin: 10px; */
      }

      section {
        margin-left: 10px;
      }

      :hover {
        filter: grayscale(100%) opacity(0.3);
        transition: var(--transition-speed);
      }
    }
  }

  a {
    text-decoration: none;
  }

  strong {
    color: var(--text-primary);
    font-size: 14px;
  }

  .logo {
    transform: rotate(180deg);
    transition: var(--transition-speed);
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

export const Info = styled(Tooltip)`
  height: 20px;

  span {
    background: var(--color-theme-primary);
    color: #fff;
    font-weight: 600;

    &::before {
      border-color: var(--color-theme-primary) transparent;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;
  h1 {
    font-size: 36px;
  }
  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;
    span {
      display: flex;
      align-items: center;
    }
    span + span ::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;
  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 500;
  }
  div {
    cursor: pointer;
    border: 2px solid #eee;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      transform: scaleX(0);
      transform-origin: bottom right;
    }
    &:hover::before {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
    &::before {
      border-radius: 10px;
      content: ' ';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      inset: 0 0 0 0;
      /* border-bottom: 3px solid var(--color-theme-primary); */
      background: var(--color-theme-primary);
      z-index: -1;
      transition: transform 0.5s ease;
    }

    /* body {
      min-block-size: 100%;
      min-inline-size: 100%;
      margin: 0;
      box-sizing: border-box;
      display: grid;
      place-content: center;
      font-family: system-ui, sans-serif;
    }

    @media (orientation: landscape) {
      body {
        grid-auto-flow: column;
      }
    } */

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    strong {
      margin-left: 24px;
      color: #3e3b47;
      font-size: 20px;
    }
    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;
      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;
  > strong {
    color: #999591;
    font-size: 20;
    line-height: 26px;
    border-bottom: 1px solid var(--text-primary);
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;
  & + div {
    margin-top: 16px;
  }
  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #999591;
    width: 70px;
    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }
  div {
    /* flex: 1;
    border: 2px solid #eee;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;
    position: relative; */

    /* background: #f5f5f5; */
    cursor: pointer;
    flex: 1;
    border: 2px solid #eee;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;
    position: relative;

    &::before {
      transform: scaleX(0);
      transform-origin: bottom right;
    }
    &:hover::before {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
    &::before {
      border-radius: 10px;
      content: ' ';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      inset: 0 0 0 0;
      background: #eee;
      z-index: -1;
      transition: transform 0.5s ease;
    }
    /* background: #f5f5f5; */

    img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
    strong {
      margin-left: 24px;
      color: #3e3b47;
      font-size: 15px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
