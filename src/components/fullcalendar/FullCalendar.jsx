import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import vnLocale from '@fullcalendar/core/locales/vi';
import { FullCalendarStyled } from '@/components/fullcalendar/FullCalendarStyled.js';
import { GRADIENT_COLORS } from '@/helper/constants.js';
import dayjs from 'dayjs';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import 'dayjs/locale/vi';
import { DotIcon, UserIcon } from '@/components/Icon.jsx';
import { Flex } from 'antd';
import { sliceEvents } from '@fullcalendar/core';
/**
 * FullCalendarComponent renders a FullCalendar with provided events and handlers.
 *
 * @param {Object[]} events - Array of event objects to be displayed on the calendar.
 * @param {Function} onEventClick - Callback function when an event is clicked.
 * @param {Function} onDateSelect - Callback function when a date is selected.
 * @param {Function} onEventChange - Callback function when an event is changed (dragged or resized).
 * @param {Function} eventContentRender - Custom render function for event content.
 */
export const FullCalendarComponent = ({
  onClickFilter,
  events,
  onEventClick,
  onDateSelect,
  onEventChange,
  eventContentRender,
}) => {
  const handleDateSelect = (selectInfo) => {
    onDateSelect &&
      onDateSelect({
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
  };

  const handleEventClick = (clickInfo) => {
    onEventClick &&
      onEventClick({
        event: clickInfo.event,
        el: clickInfo.el,
        jsEvent: clickInfo.jsEvent,
        view: clickInfo.view,
      });
  };

  const handleEventChange = (changeInfo) => {
    onEventChange &&
      onEventChange({
        event: changeInfo.event,
        oldEvent: changeInfo.oldEvent,
        delta: changeInfo.delta,
        revert: changeInfo.revert,
      });
  };

  const defaultEventContentRender = (eventInfo) => (
    <div
      style={{
        backgroundImage: eventInfo.event.extendedProps?.color || GRADIENT_COLORS[0],
        color: 'white',
        width: '100%',
        padding: '4px',
        borderRadius: '6px',
        overflow: 'hidden',
      }}
    >
      {eventInfo.timeText && <div>{eventInfo.timeText}</div>}
      <div>{eventInfo.event.title}</div>
    </div>
  );

  const [currentDate, setCurrentDate] = useState(dayjs().toDate());

  const ref = useRef(null);
  const [state, set] = useState(0);
  dayjs.locale('vi');

  useEffect(() => {
    const document1 = document.getElementById('myCalendar');
    console.log('=>(FullCalendar.jsx:80) document', document1, ref?.current?.getApi().currentData);
  });
  console.log('=>(FullCalendar.jsx:117) ref', ref.current);
  return (
    <FullCalendarStyled>
      <Flex gap={4}>
        <button
          onClick={() => {
            const calendarApi = ref.current.getApi();
            calendarApi.prev();
            set(state + 1);
            setCurrentDate(calendarApi.getDate());
          }}
        >
          Prev
        </button>

        <div>{ref?.current?.getApi().currentData.viewTitle}</div>
        {/*<div>{dayjs(currentDate).format('dd DD-MM-YYYY')}</div>*/}

        <button
          onClick={() => {
            const calendarApi = ref.current.getApi();
            calendarApi.next();
            setCurrentDate(calendarApi.getDate());
          }}
        >
          Next
        </button>

        <button
          onClick={() => {
            const calendarApi = ref.current.getApi();
            calendarApi.gotoDate(new Date());
            setCurrentDate(calendarApi.getDate());
          }}
        >
          Today
        </button>

        {/*   view*/}
        <button
          onClick={() => {
            const calendarApi = ref.current.getApi();
            calendarApi.changeView('timeGridDay');
            setCurrentDate(calendarApi.getDate());
          }}
        >
          Day
        </button>
        <button
          onClick={() => {
            const calendarApi = ref.current.getApi();
            calendarApi.changeView('timeGridWeek');
            setCurrentDate(calendarApi.getDate());
          }}
        >
          Week
        </button>
        <button
          onClick={() => {
            const calendarApi = ref.current.getApi();
            calendarApi.changeView('dayGridMonth');
          }}
        >
          Month
        </button>
      </Flex>
      <FullCalendar
        ref={ref}
        id={'myCalendar'}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={vnLocale}
        editable={true}
        selectable={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventChange}
        eventResize={handleEventChange}
        dayMaxEventRows={2}
        // moreLinkDidMount={(args) => {
        //   const date = new Date(
        //     args.el.parentElement.parentElement.parentElement.parentElement.getAttribute('data-date'),
        //   );
        //   console.log(args.view.getCurrentData().calendarOptions.events);
        //   console.log('=>(FullCalendar.jsx:101) date', dayjs(date).toDate());
        //   // get all list of more link elements
        //
        //   const moreLinkElements = document.querySelectorAll('.fc-daygrid-more-link');
        //   moreLinkElements.forEach((element) => {
        //     // Modify the text content
        //     const root = createRoot(element);
        //     element.setAttribute('data-num', args.num);
        //     root.render(<MoreLink num={args.num} />);
        //   });
        //   return <>{date}</>;
        // }}
        // moreLinkText={function () {
        //   return ``;
        // }}
        moreLinkContent={function (args) {
          // const calendarApi = args.view.getCurrentData().calendarApi;
          // ref.current = calendarApi;
          return <div>Thêm +{args.num}</div>;
        }}
        moreLinkClassNames={'viewmore'}
        headerToolbar={
          null
          // {
          // left: 'prev title next today',
          // center: '',
          // right: 'dayGridMonth,timeGridWeek,timeGridDay filter',
          //
          // }
        }
        // customButtons={{
        //   currentDay: {
        //     text: 'Today',
        //     click: () => {
        //       calendar.gotoDate(new Date());
        //     },
        //   },
        //   filter: {
        //     text: '',
        //     click: () => {
        //       onClickFilter && onClickFilter();
        //       console.log('Filter clicked');
        //     },
        //   },
        // }}
        events={events}
        eventContent={eventContentRender || defaultEventContentRender}
      />
    </FullCalendarStyled>
  );
};

const MoreLink = ({ num }) => {
  return (
    <div>
      <DotIcon /> {num}
    </div>
  );
};
