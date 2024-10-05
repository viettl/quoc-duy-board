import React, { useState } from 'react';
import { Card } from '@/components/card/Card.jsx';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import { Button, Col, Dropdown, Row, Space } from 'antd';
import { SaleReportTaskStyled } from '@/features/dashboard-sale/components/SaleReportTaskStyled.js';
import { SalePieChartNotesStyled } from './SaleReportTaskStyled';
import { HorizontalDivider } from '@/components/Divider.jsx';
import DonutChart from '../../../components/donut-chart/DonutChart.jsx';

const items = [
  {
    label: 'Việc của tôi',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'Hôm nay',
    key: '2',
    icon: <UserOutlined />,
  },
];

const Toolbars = () => {
  const [selected, setSelected] = useState('1');

  const handleMenuClick = (e) => {
    setSelected(e.key);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
    selectedKeys: [selected],
  };

  return (
    <>
      <div className="toolbar">
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              {items.find((item) => item.key === selected)?.label}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <span className={'label'}>Hôm nay</span>
      </div>
    </>
  );
};

const NOTES_COLORS = ['#04B9A7', '#2275FF', '#F9757E', '#C327E2', '#A0AEC0', '#F1252B'];

const NOTES = [
  {
    icon: <UserOutlined />,
    label: 'Người dùng',
    quantity: '1x',
  },
  {
    icon: <UserOutlined />,
    label: 'Người dùng',
    quantity: '1x',
  },
  {
    icon: <UserOutlined />,
    label: 'Người dùng',
    quantity: '1x',
  },
  {
    icon: <UserOutlined />,
    label: 'Người dùng',
    quantity: '1x',
  },
  {
    icon: <UserOutlined />,
    label: 'Người dùng',
    quantity: '1x',
  },
  {
    icon: <UserOutlined />,
    label: 'Người dùng',
    quantity: '1x',
  },
];

const DATA = [
  { color: '#e400ff', value: 5, label: 'Sales' },
  { color: '#74b9ff', value: 2, label: 'Marketing' },
  { color: '#af8a11', value: 1, label: 'Customer Support' },
  { color: '#e11d0a', value: 1, label: 'Development' },
  { color: '#55efc4', value: 1, label: 'HR' },
  { color: '#a29bfe', value: 2, label: 'Finance' },
];

export function SaleReportTask() {
  const [chartData, setChartData] = useState(DATA);
  const [unusedSegments, setUnusedSegments] = useState([]);

  const handleClickPlot = (label) => {
    const index = chartData.findIndex((item) => item.label === label);
    if (index !== -1) {
      const newChartData = [...chartData];
      const removedSegment = newChartData.splice(index, 1)[0];
      setChartData(newChartData);
      setUnusedSegments([...unusedSegments, removedSegment]);
    } else {
      const segmentToAdd = unusedSegments.find((item) => item.label === label);
      if (segmentToAdd) {
        setChartData([...chartData, segmentToAdd]);
        setUnusedSegments(unusedSegments.filter((item) => item.label !== label));
      }
    }
  };

  const total = chartData.reduce((acc, item) => acc + item.value, 0);

  return (
    <SaleReportTaskStyled>
      <Card title={'Báo cáo công việc'} toolbar={<Toolbars />} ableToFullScreen>
        <Row>
          <Col span={12}>
            <div className="donut-chart">
              <DonutChart data={chartData} total={total} />
            </div>
          </Col>
          <Col span={12}>
            <SalePieChartNotesStyled>
              {DATA.map((item, index) => {
                return (
                  <>
                    <div
                      className={unusedSegments.find((sel) => sel.label === item.label) ? ' note selected' : 'note'}
                      onClick={() => handleClickPlot(item.label)}
                    >
                      <div className="label">
                        <div
                          className="label-icon"
                          style={{
                            backgroundColor: item.color,
                          }}
                        ></div>
                        <div className="label-text">{item.label}</div>
                      </div>
                      <div className="quantity">{item.value}</div>
                    </div>
                    {index !== NOTES.length - 1 && <HorizontalDivider />}
                  </>
                );
              })}
            </SalePieChartNotesStyled>
          </Col>
        </Row>
      </Card>
    </SaleReportTaskStyled>
  );
}
