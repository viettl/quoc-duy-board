import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';

export const FullCalendarStyled = styled.div`
  .fc .fc-toolbar.fc-header-toolbar {
    // make all button look like disappear and does not take up space
    button {
      background: transparent;
      border: none;

      &:focus {
        outline: none;
        box-shadow: none;
      }
    }

    .fc-toolbar-chunk {
      svg {
        fill: #a0aec0;
      }
      &:nth-child(1) {
        //style only for button 3rd children
        button {
          // remove all outline when click button

          &:focus {
            outline: none;
          }
          outline: none;

          // make button like div
          background: transparent;
          border: none;

          // make button look like disappear and does not take up space
          &:nth-child(4) {
            color: var(--Dark-grey, #a0aec0);
            text-align: center;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%; /* 14px */
          }
        }
      }

      .fc-button-group {
        border-radius: 6px;
        background: var(--Secondary-Grey, #f3f5f9);
        display: inline-flex;
        padding: 2px;
        align-items: center;
        gap: 10px;
        // check button has aria-pressed
        button[aria-pressed='true'] {
          border-radius: 6px;
          background: #fff;
          color: #344767;
          text-align: center;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%;
        }
      }

      //  !TODO custom button filter
      // filter button by title text
      button[title=''] {
        padding: 0 10px;
        color: black;

        // replace content by icon svg
        &::before {
          content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='20' viewBox='0 0 22 20' fill='none'%3E%3Cpath d='M0.167373 1.48602C0.451 0.884389 1.05263 0.501923 1.71873 0.501923H20.2834C20.9495 0.501923 21.5511 0.884389 21.8348 1.48602C22.1184 2.08766 22.0324 2.79672 21.6113 3.31241L13.7514 12.917V18.379C13.7514 18.899 13.4592 19.376 12.9907 19.6081C12.5223 19.8401 11.968 19.7929 11.5511 19.4791L8.80081 17.4164C8.45272 17.1586 8.25074 16.7503 8.25074 16.3163V12.917L0.386539 3.30811C-0.0303062 2.79672 -0.120551 2.08336 0.167373 1.48602Z' fill='%23A0AEC0'/%3E%3C/svg%3E");
          display: inline-block;
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }
      }
    }
  }

  // table border
  .fc-theme-standard .fc-scrollgrid {
    border: none;
  }

  // daybox
  .fc-day {
    padding: 10px;
  }
  .fc-daygrid-day-top {
    //padding: 10px;
    display: flex;
    justify-content: center;
    a {
      color: #344767;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 100%; /* 14px */
    }
  }

  // today
  .fc-day-today {
    border: 1px solid var(--Grey, #ebeff5);
    background: var(--white, #fff);
    a {
      border-radius: 6px;
      background: #2275ff;
      min-width: 24px;
      min-height: 24px;
      color: #ffffff;
    }
  }
  // background color current day
  .fc .fc-daygrid-day.fc-day-today {
    background-color: unset;
  }

  tr th {
    border: none !important;
  }

  .fc-toolbar-title {
    color: #344767;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 14px */
    // prevent breeak line by using nowrap
    display: inline;
  }

  .fc .fc-scrollgrid table {
    border-left-style: initial;
    border-right-style: hidden;
    border-top-style: hidden;
  }
  thead {
    border-bottom: 1px solid var(--Grey, #ebeff5);
  }

  .viewmore {
    width: 100%;
    color: #2275ff;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    padding: 8px 0;
  }
`;
