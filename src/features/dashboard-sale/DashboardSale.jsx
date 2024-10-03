import { Card } from '@/components/card/Card';
import { LayoutContent } from '@/components/layout/LayoutContent';
import { Tabs } from '@/components/tabs/Tab';
import { Col, Layout, Row } from 'antd';
import { SaleDailyTask } from './components/SaleDailyTask';
import { SaleReportTask } from './components/SaleReportTask';
import CustomCalendar from './components/Calendar';
import { CardContent } from '@/components/card/CardStyled';
import { CalendarClockIcon } from '@/components/Icon.jsx';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import { FullCalendarComponent } from '@/components/fullcalendar/FullCalendarComponent.jsx';

function TabsComponent() {
  const tabsData = [
    { label: 'Việc cần làm', content: 'Content for Việc cần làm' },
    { label: 'Kinh doanh', content: 'Content for Kinh doanh' },
  ];

  return <Tabs tabs={tabsData} />;
}

const RightTextStyled = styled.div`
  color: #2275ff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

export function DashboardSale() {
  return (
    <LayoutContent>
      <TabsComponent></TabsComponent>
      <Row gutter={[16, 20]}>
        <Col span={12} md={24} lg={24} xl={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <SaleDailyTask />
            </Col>
            <Col span={24}>
              <SaleReportTask />
            </Col>
          </Row>
        </Col>
        <Col span={12} md={24} lg={24} xl={12}>
          <Card
            title="Lịch công việc"
            prefixIcon={<CalendarClockIcon />}
            rightToolbar={<RightTextStyled>Tất cả</RightTextStyled>}
          >
            <CardContent>
              {/*<Calendar />*/}
              <FullCalendarComponent />
              {/*<CustomCalendar />*/}
            </CardContent>
          </Card>
        </Col>
      </Row>
    </LayoutContent>
  );
}
