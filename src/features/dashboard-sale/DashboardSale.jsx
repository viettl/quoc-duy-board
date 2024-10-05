import { Card } from '@/components/card/Card';
import { LayoutContent } from '@/components/layout/LayoutContent';
import { Tabs } from '@/components/tabs/Tab';
import { Col, Row } from 'antd';
import { SaleDailyTask } from './components/SaleDailyTask';
import { SaleReportTask } from './components/SaleReportTask';
import { CardContent } from '@/components/card/CardStyled';
import { CalendarClockIcon } from '@/components/Icon.jsx';
import styled from 'styled-components';
import { CalendarPage } from '@/features/dashboard-sale/components/Calendar.jsx';
import { useState } from 'react';
import CustomCalendar1 from '@/features/dashboard-sale/components/big-calendar/Calendar1.jsx';

const RightTextStyled = styled.div`
  color: #2275ff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

function TabsComponent() {
  const [activeTab, setActiveTab] = useState(0);

  const tabsData = [
    { label: 'Việc cần làm', content: <TodoTabContent /> },
    { label: 'Kinh doanh', content: 'Content for Kinh doanh' },
  ];

  return <Tabs tabs={tabsData} activeTab={activeTab} setActiveTab={setActiveTab} />;
}

const TodoTabContent = () => {
  return (
    <Row gutter={[16, 20]}>
      <Col span={12} xl={24} xxl={12}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <SaleDailyTask />
          </Col>
          <Col span={24}>
            <SaleReportTask />
          </Col>
        </Row>
      </Col>
      <Col span={12} xl={24} xxl={12}>
        <Card
          title="Lịch công việc"
          prefixIcon={<CalendarClockIcon />}
          rightToolbar={<RightTextStyled>Tất cả</RightTextStyled>}
        >
          <CardContent>
            {/*<CustomCalendar1 />*/}
            <CalendarPage />
          </CardContent>
        </Card>
      </Col>
    </Row>
  );
};

export function DashboardSale() {
  return (
    <LayoutContent>
      <TabsComponent />
    </LayoutContent>
  );
}
