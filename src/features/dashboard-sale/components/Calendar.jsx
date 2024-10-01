import { Calendar, dateFnsLocalizer, Navigate, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import vi from 'date-fns/locale/vi';
import { useCallback, useMemo, useState } from 'react';
import { Flex, Segmented } from 'antd';
import { DotIcon } from '@/components/Icon.jsx';
import { setDefaultOptions } from 'date-fns';
import {
  CustomDateHeaderStyled,
  CustomDateInfoStyled,
  CustomDayStyled,
  EventWrapperStyled,
} from '@/features/dashboard-sale/components/CalendarStyled.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import dayjs from 'dayjs';
import { GRADIENT_COLORS, myEventsList } from '@/helper/constants.js';

const locales = {
  vi: vi,
};

setDefaultOptions({
  locale: vi,
});

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomHeader = ({ label }) => (
  <Flex align={'center'} justify={'center'}>
    <CustomDayStyled>{label}</CustomDayStyled>
  </Flex>
);

const CustomDateHeader = ({ label }) => (
  <Flex justify={'center'}>
    <CustomDateHeaderStyled>{label}</CustomDateHeaderStyled>
  </Flex>
);

const CustomCalendar = (props) => {
  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        day: { header: CustomHeader },
        week: { header: CustomHeader },
        month: { header: CustomHeader, dateHeader: CustomDateHeader },
        toolbar: CustomToolbar,
        dayColumnWrapper: CustomDayStyled,
        eventContainerWrapper: EventWrapperStyled,
        eventWrapper: EventWrapperStyled,
      },
      defaultDate: new Date(),
    }),
    [],
  );

  return (
    <div>
      <Calendar
        events={myEventsList}
        style={{ height: 500 }}
        eventPropGetter={(myEventsList) => {
          const color = myEventsList.color ? myEventsList.color : 'blue';
          return { style: { backgroundImage: GRADIENT_COLORS[myEventsList.index], color } };
        }}
        localizer={localizer}
        components={components}
        startAccessor="start"
        popup
        endAccessor="end"
        messages={{
          agenda: 'Hôm nay',
          // all day event
          allDay: 'Cả ngày',
          // previous, next, today button
          previous: 'Trước',
          next: 'Sau',
          today: 'Hôm nay',
          // month view
          month: 'Tháng',
          // week view
          week: 'Tuần',
          // day view
          day: 'Ngày',
          // date
          date: 'Ngày',
          // time
          time: 'Thời gian',
          // event
          event: 'Sự kiện',
          showMore: (total) => (
            <Flex align={'center'} justify={'center'} gap={4}>
              <DotIcon /> <DotIcon /> +{total}
            </Flex>
          ),
        }}
      />
    </div>
  );
};

const CustomToolbar = (props) => {
  const [date, setDate] = useState(new Date());
  const onNavigate = useCallback(
    (newDate) => {
      return setDate(newDate);
    },
    [setDate],
  );
  const goToDayView = () => {
    props.onView('day');
  };
  const goToWeekView = () => {
    props.onView('week');
  };
  const goToMonthView = () => {
    props.onView('month');
  };

  const goToToday = () => {
    props.onNavigate(Navigate.TODAY);
  };

  // jum to next month
  const goToNextMonth = () => {
    // const newDate = moment(date).add(1, 'month').toDate();
    const newDate = dayjs(props.date).add(1, 'month').startOf('month').toDate();
    // trigger onNavigate to next month with new date
    onNavigate(newDate);
    props.onNavigate(Navigate.DATE, newDate);
  };

  // jum to previous month
  const goToPreviousMonth = () => {
    const newDate = dayjs(props.date).subtract(1, 'month').startOf('month').toDate();
    onNavigate(newDate);
    props.onNavigate(Navigate.DATE, newDate);
  };

  const setAlignValue = (value) => {
    switch (value) {
      case 'Ngày':
        goToDayView();
        break;
      case 'Tuần':
        goToWeekView();
        break;
      case 'Tháng':
        goToMonthView();
        break;
      default:
        break;
    }
  };

  const currentDate = format(date, 'MMMM yyyy', { locale: vi });
  return (
    <>
      <Flex align={'center'} justify={'space-between'}>
        <CustomDateInfoStyled>
          <Flex gap={12}>
            <span onClick={goToPreviousMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                <path
                  d="M0.341647 7.82648C-0.113904 7.37092 -0.113904 6.63111 0.341647 6.17556L6.1727 0.344501C6.62825 -0.11105 7.36807 -0.11105 7.82362 0.344501C8.27917 0.800053 8.27917 1.53987 7.82362 1.99542L2.8162 7.00284L7.81998 12.0103C8.27553 12.4658 8.27553 13.2056 7.81998 13.6612C7.36442 14.1167 6.62461 14.1167 6.16906 13.6612L0.338003 7.83012L0.341647 7.82648Z"
                  fill="#A0AEC0"
                />
              </svg>
            </span>
            <>
              <label>{String(currentDate).charAt(0).toUpperCase() + currentDate.slice(1)}</label>
            </>
            <span onClick={goToNextMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                <path
                  d="M7.98892 6.1792C8.44447 6.63475 8.44447 7.37457 7.98892 7.83012L2.15786 13.6612C1.70231 14.1167 0.962498 14.1167 0.506947 13.6612C0.0513954 13.2056 0.0513954 12.4658 0.506947 12.0103L5.51436 7.00284L0.510591 1.99542C0.0550398 1.53987 0.0550398 0.800053 0.510591 0.344502C0.966142 -0.11105 1.70596 -0.11105 2.16151 0.344502L7.99256 6.17556L7.98892 6.1792Z"
                  fill="#A0AEC0"
                />
              </svg>
            </span>

            <span className={'today'} onClick={goToToday}>
              Hôm nay
            </span>
          </Flex>
        </CustomDateInfoStyled>
        <Flex align={'center'} justify={'flex-end'} gap={16}>
          <Segmented
            defaultValue="Tháng"
            style={{
              marginBottom: 8,
            }}
            onChange={(value) => setAlignValue(value)}
            options={['Ngày', 'Tuần', 'Tháng']}
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path
              d="M0.167373 1.48602C0.451 0.884389 1.05263 0.501923 1.71873 0.501923H20.2834C20.9495 0.501923 21.5511 0.884389 21.8348 1.48602C22.1184 2.08766 22.0324 2.79672 21.6113 3.31241L13.7514 12.917V18.379C13.7514 18.899 13.4592 19.376 12.9907 19.6081C12.5223 19.8401 11.968 19.7929 11.5511 19.4791L8.80081 17.4164C8.45272 17.1586 8.25074 16.7503 8.25074 16.3163V12.917L0.386539 3.30811C-0.0303062 2.79672 -0.120551 2.08336 0.167373 1.48602Z"
              fill="#A0AEC0"
            />
          </svg>
        </Flex>
      </Flex>
    </>
  );
};

export default CustomCalendar;
