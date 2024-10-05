import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, Checkbox } from 'antd';
import dayjs from 'dayjs';
import { FullCalendarComponent } from '@/components/fullcalendar/FullCalendar.jsx';

const { Option } = Select;

export const CalendarPage = () => {
  const [events, setEvents] = useState([
    // Initial events...
    // {
    //   id: 1,
    //   title: 'Meeting',
    //   start: new Date().toISOString(),
    //   end: new Date().toISOString(),
    //   allDay: false,
    //   extendedProps: {
    //     type: 'meeting',
    //   },
    // },
    // {
    //   id: 2,
    //   title: 'Task',
    //   start: new Date().toISOString(),
    //   end: new Date().toISOString(),
    //   allDay: false,
    //   extendedProps: {
    //     type: 'task',
    //   },
    // },
    // {
    //   id: 3,
    //   title: 'Reminder',
    //   start: new Date().toISOString(),
    //   end: new Date().toISOString(),
    //   allDay: true,
    //   extendedProps: {
    //     type: 'reminder',
    //   },
    // },
    // {
    //   id: 13,
    //   title: 'Rem111inder',
    //   start: new Date().toISOString(),
    //   end: new Date().toISOString(),
    //   allDay: true,
    //   extendedProps: {
    //     type: 'reminder',
    //   },
    // },
    // tomorrow
    {
      id: 14,
      title: 'Meeting',
      start: new Date(new Date().setDate(new Date().getDate()+ 4)).toISOString(),
      end: new Date(new Date().setDate(new Date().getDate()+ 4)).toISOString(),
      allDay: false,
      extendedProps: {
        type: 'meeting',
      },
    },
    {
      id: 5,
      title: 'Task',
      start: new Date(new Date().setDate(new Date().getDate()+ 4)).toISOString(),
      end: new Date(new Date().setDate(new Date().getDate()+ 4)).toISOString(),
      allDay: false,
      extendedProps: {
        type: 'task',
      },
    },
    {
      id: 6,
      title: 'Reminder',
      start: new Date(new Date().setDate(new Date().getDate()+ 4)).toISOString(),
      end: new Date(new Date().setDate(new Date().getDate()+ 4)).toISOString(),
      allDay: true,
      extendedProps: {
        type: 'reminder',
      },
    },
    {
      id: 36,
      title: 'Reminder',
      start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
      end: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString(),
      allDay: true,
      extendedProps: {
        type: 'reminder',
      },
    },
    {
      id: 126,
      title: 'Remi123213nder',
      start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
      end: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString(),
      allDay: true,
      extendedProps: {
        type: 'reminder',
      },
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState({
    isModalOpen: false,
    isFilterModalOpen: false,
  });
  const [selectedEventInfo, setSelectedEventInfo] = useState(null);
  const [form] = Form.useForm();

  const handleEventClick = (eventInfo) => {
    setSelectedEventInfo(eventInfo);
    form.setFieldsValue({
      title: eventInfo.event.title,
      start: dayjs(eventInfo.event.start),
      end: dayjs(eventInfo.event.end),
      allDay: eventInfo.event.allDay,
      type: eventInfo.event.extendedProps?.type || 'meeting',
    });
    setIsModalOpen({
      isModalOpen: true,
      isFilterModalOpen: false,
    });
  };

  const handleDateSelect = (dateInfo) => {
    setSelectedEventInfo(dateInfo);
    form.setFieldsValue({
      start: dayjs(dateInfo.start),
      end: dayjs(dateInfo.end),
      allDay: dateInfo.allDay,
      type: 'meeting',
    });
    setIsModalOpen({
      isModalOpen: true,
      isFilterModalOpen: false,
    });
  };

  const handleEventChange = (changeInfo) => {
    const { event } = changeInfo;
    setEvents((prevEvents) =>
      prevEvents.map((prevEvent) =>
        prevEvent.id === event.id
          ? {
              ...prevEvent,
              start: event.start.toISOString(),
              end: event.end.toISOString(),
              allDay: event.allDay,
            }
          : prevEvent,
      ),
    );
  };

  const handleModalClose = () => {
    setIsModalOpen({
      isModalOpen: false,
      isFilterModalOpen: false,
    });
    setSelectedEventInfo(null);
    form.resetFields();
  };

  const handleEventSave = (values) => {
    console.log('=>(Calendar.jsx:113) values', values);
    console.log('=>(Calendar.jsx:105) selectedEventInfo', selectedEventInfo);
    const eventData = {
      id: selectedEventInfo?.event?.id || Math.floor(Math.random() * 1000),
      title: values.title,
      start: values.start.toDate().toISOString(),
      end: values.end.toDate().toISOString(),
      allDay: values.allDay,
      extendedProps: {
        type: values.type,
      },
    };

    setEvents((prevEvents) => {
      if (selectedEventInfo?.event?.id) {
        return prevEvents.map((event) => (Number(event.id) === Number(eventData.id) ? eventData : event));
      } else {
        return [...prevEvents, eventData];
      }
    });

    handleModalClose();
  };

  const handleEventDelete = () => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEventInfo.event.id));
    handleModalClose();
  };

  function handleFilterModalClose() {
    setIsModalOpen({
      isModalOpen: false,
      isFilterModalOpen: false,
    });
  }

  const handleClickFilter = () => {
    setIsModalOpen({
      isModalOpen: false,
      isFilterModalOpen: true,
    });
  };
  return (
    <>
      <FullCalendarComponent
        events={events}
        onEventClick={handleEventClick}
        onDateSelect={handleDateSelect}
        onEventChange={handleEventChange}
        onClickFilter={handleClickFilter}
        eventContentRender={(eventInfo) => {
          const backgroundColor =
            {
              meeting: 'linear-gradient(to right, #1e3c72, #2a5298)',
              task: 'linear-gradient(to right, #56ab2f, #a8e063)',
              reminder: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            }[eventInfo.event.extendedProps?.type] || 'linear-gradient(to right, #ff7e5f, #feb47b)';
          return (
            <div
              style={{
                backgroundImage: backgroundColor,
                color: 'white',
                width: '100%',
                padding: '4px',
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <b>{eventInfo.timeText}</b>
              <i>{eventInfo.event.title}</i>
            </div>
          );
        }}
      />

      {/* Modal filter options */}
      <Modal
        title="Filter Options"
        open={isModalOpen.isFilterModalOpen}
        onCancel={handleFilterModalClose}
        footer={null}
        size="small"
        style={{ top: 20, right: 0, position: 'absolute' }}
      >
        <Form layout="vertical">
          <Form.Item name="eventType" label="Event Type">
            <Select>
              <Option value="meeting">Meeting</Option>
              <Option value="task">Task</Option>
              <Option value="reminder">Reminder</Option>
            </Select>
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
      </Modal>

      <Modal
        title={selectedEventInfo?.event?.id ? 'Chỉnh sửa sự kiện' : 'Thêm sự kiện'}
        open={isModalOpen.isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleEventSave}>
          <Form.Item name="title" label="Tên sự kiện" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Loại sự kiện" rules={[{ required: true }]}>
            <Select>
              <Option value="meeting">Meeting</Option>
              <Option value="task">Task</Option>
              <Option value="reminder">Reminder</Option>
            </Select>
          </Form.Item>
          <Form.Item name="allDay" valuePropName="checked">
            <Checkbox>Cả ngày</Checkbox>{' '}
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.allDay !== currentValues.allDay}>
            {({ getFieldValue }) =>
              getFieldValue('allDay') ? (
                <>
                  <Form.Item name="start" label="Ngày bắt đầu" rules={[{ required: true }]}>
                    <DatePicker />
                  </Form.Item>
                  <Form.Item name="end" label="Ngày kết thúc" rules={[{ required: true }]}>
                    <DatePicker />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item name="start" label="Ngày bắt đầu & Thời gian" rules={[{ required: true }]}>
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                  </Form.Item>
                  <Form.Item name="end" label="Ngày kết thúc & Thời gian" rules={[{ required: true }]}>
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                  </Form.Item>
                </>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedEventInfo?.event?.id ? 'Cập nhật' : 'Thêm'} sự kiện
            </Button>
            {selectedEventInfo?.event?.id && (
              <Button danger onClick={handleEventDelete} style={{ marginLeft: 8 }}>
                Xóa sự kiện
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
