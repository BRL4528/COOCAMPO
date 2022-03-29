import shade from 'polished/lib/color/shade';
import styled from 'styled-components';

interface Iprops {
  theme: string;
}

export const Calendar = styled.div`
  .DayPicker {
    border-radius: 4px;
    color: #fff;
    /* height: 50px; */
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

  .card {
    overflow-y: visible;
  }

  .DayPicker-Day {
    width: 40px;
    height: 60px;
    padding: 2px;
    text-align: left;
    border-top: 4px solid transparent !important;

    > div {
      height: 100%;
      span {
        top: 0;
      }

      > div {
        margin-top: 10px;
      }
    }
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    ${({ theme }: Iprops): string =>
      theme === 'light' ? 'background: #2B6CB0' : 'background: #3e3b47'};
    border-radius: 4px;
    color: #fff;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    ${({ theme }: Iprops): string =>
      theme === 'light'
        ? `background: ${shade(0.2, '#2B6CB0')}`
        : `background: ${shade(0.2, '#3e3b47')}`};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    /* background: #3182ce !important; */
    border-top: 4px solid #3182ce !important;
    ${({ theme }: Iprops): string =>
      theme === 'light'
        ? 'border-top: 4px solid #1d3557 !important;'
        : 'border-top: 4px solid #3182ce !important;'};

    border-radius: 10px;
    color: #fff !important;
  }
`;
