import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import vnLocale from '@fullcalendar/core/locales/vi';

import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import dayjs from 'dayjs';
import { Checkbox, DatePicker } from 'antd';
import { GRADIENT_COLORS, myEventsList } from '@/helper/constants.js';
import { FullCalendarStyled } from '@/components/fullcalendar/FullCalendarStyled.js';

const EXTEND_PROPS_NAME = 'extendedProps';

export const FullCalendarComponent = () => {
  const [form] = Form.useForm();
  const allDayWatch = Form.useWatch('allDay', form);
  console.log('=>(FullCalendarComponent.jsx:20) allDayWatch', allDayWatch);
  const [eventFormValues, setEventFormValues] = useState({
    title: '',
    start: '',
    end: '',
    id: null,
  });

  // https://github.com/fullcalendar/fullcalendar-examples/blob/main/react/src/DemoApp.jsx
  const [events, setEvents] = useState([
    {
      title: 'Event 1',
      start: '2024-10-05T09:00:00',
      end: '2024-10-05T10:00:00',
      id: 1,
      allDay: false,
      extendedProps: { 'custom-param': 'custom-value', color: GRADIENT_COLORS[0] },
    },
    {
      title: 'Event 2',
      start: '2024-10-10T11:00:00',
      end: '2024-10-12T12:00:00',
      id: 2,
      allDay: true,
      extendedProps: { 'custom-param': 'custom-value', color: GRADIENT_COLORS[1] },
    },
  ]);
  console.log('=>(FullCalendarComponent.jsx:29) events', events);

  const [isShowModal, setIsShowModal] = useState({
    addEvent: false,
    editEvent: false,
  });
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);

  const generateFormValues = (values) => {
    // handle set form initial values
    const init = {
      ...values,
      title: values?.title || '',
      start: dayjs(values.startStr),
      end: values.endStr ? dayjs(values.endStr) : '',
    };
    // comparasion the start and end date > 1 day -> set end date = start date
    // else end date = end date -1
    if (values.endStr && dayjs(values.endStr).diff(values.startStr, 'day') > 1) {
      init.end = dayjs(values.endStr).subtract(1, 'day');
    } else {
      init.end = dayjs(values.startStr);
    }
    return init;
  };

  const handleSelectedDate = (date) => {
    setSelectedDateInfo(date);
    setIsShowModal({ ...isShowModal, addEvent: true });
    const init = generateFormValues(date);
    form.setFieldsValue({
      ...init,
    });
  };

  const storeEvents = (events) => {
    //convert date by dayjs
    const newEvents = events.map((e) => ({
      ...e,
      start: dayjs(e.start).toISOString(),
      end: dayjs(e.end).toISOString(),
    }));
    setEvents(newEvents);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    const event = {
      title: values.title,
      start: dayjs(values.start),
      end: values.end ? dayjs(values.end) : '',
      allDay: values.allDay,
      // extendedProps
      [EXTEND_PROPS_NAME]: {
        'custom-param': 'custom-value',
      },
    };
    if (values.id) {
      event.id = values.id;
      // based on events, find by id, and update
      const updatedEvents = events.map((e) => (Number(e.id) === Number(values.id) ? event : e));
      storeEvents(updatedEvents);
      setIsShowModal({ ...isShowModal, addEvent: false });
      return;
    } else {
      event.id = Math.floor(Math.random() * 1000);
      storeEvents([...events, event]);
      setIsShowModal({ ...isShowModal, addEvent: false });
    }
    // client side
    // const calendarApi = selectedDateInfo.view.calendar;
    // calendarApi.unselect();
    // event.id = Math.floor(Math.random() * 1000);
    // calendarApi.addEvent(event);
    // setEvents((prev) => [...prev, event]);
    // setIsShowModal({ ...isShowModal, addEvent: false });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleEventClick = (info) => {
    console.log('=>(FullCalendarComponent.jsx:137) info', info);

    try {
      // handle set form initial values
      const init = {
        id: info.event.id,
        title: info.event.title,
        start: dayjs(info.event.startStr),
        end: info.event.endStr ? dayjs(info.event.endStr) : '',
        allDay: info.event.allDay,
        [EXTEND_PROPS_NAME]: info.event.extendedProps?.[EXTEND_PROPS_NAME] || null,
      };

      // const edited = generateFormValues(init);
      setSelectedDateInfo(init);

      setIsShowModal({
        ...isShowModal,
        addEvent: true,
      });
      form.setFieldsValue({
        ...init,
      });
    } catch (e) {
      console.log('=>(FullCalendarComponent.jsx:45) e', e);
    }
  };

  const handleResize = (info) => {
    console.log('=>(FullCalendarComponent.jsx:116) event', info);
    const updatedEvents = events.map((event) =>
      Number(event.id) === Number(info.event.id) ? { ...event, start: info.event.start, end: info.event.end } : event,
    );
    storeEvents(updatedEvents);
  };

  const handleEventDrop = (info) => {
    console.log('=>(FullCalendarComponent.jsx:116) event', info);
    const updatedEvents = events.map((event) =>
      Number(event.id) === Number(info.event.id) ? { ...event, start: info.event.start, end: info.event.end } : event,
    );
    storeEvents(updatedEvents);
  };

  return (
    <>
      <Modal
        centered={true}
        open={isShowModal.addEvent && selectedDateInfo?.start}
        footer={null}
        title="Thêm sự kiện"
        destroyOnClose
        onCancel={() => {
          setIsShowModal({ ...isShowModal, addEvent: false });
        }}
      >
        {/* log selectedDateInfo */}
        {/*<pre>{JSON.stringify(selectedDateInfo, null, 2)}</pre>*/}
        <pre>
          {JSON.stringify(
            {
              start: dayjs(selectedDateInfo?.startStr),
              end: selectedDateInfo?.end,
            },
            null,
            2,
          )}
        </pre>
        <Form
          layout="vertical"
          style={{ marginTop: '20px' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
          initialValues={{
            allDay: false,
            ...eventFormValues,
          }}
        >
          <Form.Item name={'id'} hidden />
          <Form.Item
            label="Tên sự kiện"
            name="title"
            rules={[
              {
                required: true,
                message: 'Tên sự kiện không được để trống!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* ADD CHECK BOX cẢ NGÀY*/}
          <Form.Item name="allDay" valuePropName="checked">
            <Checkbox>All day</Checkbox>
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            name="start"
            rules={[
              {
                required: true,
                message: 'Ngày bắt đầu không được để trống!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || (getFieldValue('end') && (allDayWatch || value.isBefore(getFieldValue('end'))))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Ngày bắt đầu phải trước hoặc bằng ngày kết thúc!'));
                },
              }),
            ]}
          >
            <DatePicker showTime={!allDayWatch} />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            name="end"
            rules={[
              {
                required: true,
                message: 'Ngày kết thúc không được để trống!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || (getFieldValue('start') && (allDayWatch || value.isAfter(getFieldValue('start'))))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Ngày kết thúc phải sau hoặc bằng ngày bắt đầu!'));
                },
              }),
            ]}
          >
            <DatePicker showTime={!allDayWatch} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{ textAlign: 'right' }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <FullCalendarStyled>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={vnLocale}
          editable={true}
          selectable
          select={handleSelectedDate}
          eventClick={handleEventClick}
          selectMirror // for date selection
          headerToolbar={{
            left: 'prev title next today',
            center: '',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          customButtons={{
            currentDay: {
              text: 'Today',
              click: () => {
                calendar.gotoDate(new Date());
              },
            },
          }}
          eventContent={function (arg) {
            return (
              <div
                style={{
                  backgroundImage: arg.event.extendedProps?.color || 'blue',
                  color: 'white',
                  width: '100%',
                  padding: '4px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}
              >
                {arg.timeText}
                {arg.event.title}
              </div>
            );
          }}
          eventDrop={function (info) {
            handleEventDrop(info);
            // alert(info.event.title + ' was dropped on ' + info.event.start.toISOString());
            //
            // if (!confirm('Are you sure about this change?')) {
            //   info.revert();
            // }
          }}
          eventResize={function (info) {
            console.log('=>(FullCalendarComponent.jsx:288) info', info.event);
            // alert(info.event.title + ' end is now ' + info.event.end.toISOString());
            handleResize(info);
            // if (!confirm('is this okay?')) {
            //   info.revert();
            // }
          }}
          events={events}
        />
      </FullCalendarStyled>
    </>
  );
};
