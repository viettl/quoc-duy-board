import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import vnLocale from '@fullcalendar/core/locales/vi';
import { EventContent, FullCalendarStyled } from '@/components/fullcalendar/FullCalendarStyled.js';
import { GRADIENT_COLORS } from '@/helper/constants.js';
import dayjs from 'dayjs';
import { Button, Segmented } from 'antd';

import 'dayjs/locale/vi';
import { FilterIcon, LeftArrowIcon, RightArrowIcon } from '@/components/Icon.jsx';

dayjs.locale('vi');

const CALENDAR_EVENT_TYPES = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  prev: 'prev',
  next: 'next',
  today: 'today',
};

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
  const [_, setCurrentDate] = useState(dayjs().toDate());

  const ref = useRef(null);

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
    <EventContent style={{ backgroundImage: eventInfo.event.extendedProps?.color || GRADIENT_COLORS[0] }}>
      {eventInfo.timeText && <div>{eventInfo.timeText}</div>}
      <div>{eventInfo.event.title}</div>
    </EventContent>
  );

  const handleViewChange = (value) => {
    const calendarApi = ref.current.getApi();
    setCurrentDate(calendarApi.getDate());

    switch (value) {
      case 'Ngày':
        calendarApi.changeView('timeGridDay');
        break;
      case 'Tuần':
        calendarApi.changeView('timeGridWeek');
        break;
      case 'Tháng':
        calendarApi.changeView('dayGridMonth');
        break;
    }
  };

  /**
   *
   * @param {'prev' | 'next' | 'today'} type - The type of navigation action.
   */
  const handleClickNav = (type) => {
    switch (type) {
      case CALENDAR_EVENT_TYPES.prev: {
        const calendarApi = ref.current.getApi();
        calendarApi.prev();
        setCurrentDate(calendarApi.getDate());
        break;
      }
      case CALENDAR_EVENT_TYPES.next: {
        const calendarApi = ref.current.getApi();
        calendarApi.next();
        setCurrentDate(calendarApi.getDate());
        break;
      }
      case CALENDAR_EVENT_TYPES.today: {
        const calendarApi = ref.current.getApi();
        calendarApi.gotoDate(new Date());
        setCurrentDate(calendarApi.getDate());
        break;
      }
    }
  };

  useEffect(() => {
    if (!ref?.current?.getApi()) return;
    const calendarApi = ref.current.getApi();
    calendarApi.gotoDate(new Date());
    setCurrentDate(calendarApi.getDate());
  }, [ref]);

  return (
    <FullCalendarStyled>
      <div className="calendar-nav">
        <div className="calendar-nav-left">
          <button
            className="nav-button"
            onClick={() => {
              handleClickNav(CALENDAR_EVENT_TYPES.prev);
            }}
          >
            <LeftArrowIcon />
          </button>
          <div className="current-date">{ref?.current?.getApi().currentData.viewTitle}</div>
          <button
            className="nav-button"
            onClick={() => {
              handleClickNav(CALENDAR_EVENT_TYPES.next);
            }}
          >
            <RightArrowIcon />
          </button>
          <button
            className="nav-button today"
            onClick={() => {
              handleClickNav(CALENDAR_EVENT_TYPES.today);
            }}
          >
            Hôm nay
          </button>
        </div>
        <div className="calendar-nav-right">
          <Segmented
            options={['Ngày', 'Tuần', 'Tháng']}
            value={
              ref?.current?.getApi().view.type === 'dayGridMonth'
                ? 'Tháng'
                : ref?.current?.getApi().view.type === 'timeGridWeek'
                  ? 'Tuần'
                  : 'Ngày'
            }
            onChange={handleViewChange}
          />
          <Button icon={<FilterIcon />} onClick={onClickFilter} className="filter-button" />
        </div>
      </div>
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
        moreLinkContent={function (args) {
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
        events={events}
        eventContent={eventContentRender || defaultEventContentRender}
      />
    </FullCalendarStyled>
  );
};
