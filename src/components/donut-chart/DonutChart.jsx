import React from 'react';
import {
  CenterContent,
  Chart,
  ChartContainer,
  Label,
  RADIUS,
  Segment,
  Total,
} from '@/components/donut-chart/DonutChartStyled.js';

const PieChart = ({ data, total }) => {
  const circleLength = 2 * Math.PI * RADIUS;

  let accumulatedLength = 0;

  return (
    <ChartContainer>
      <Chart viewBox="0 0 250 250">
        {data?.map((segment, index) => {
          const segmentLength = (segment.value / total) * circleLength;
          const dashArray = `${segmentLength} ${circleLength - segmentLength}`;
          const dashOffset = -accumulatedLength;
          accumulatedLength += segmentLength;
          return <Segment key={index} color={segment.color} dashArray={dashArray} dashOffset={dashOffset} />;
        })}
      </Chart>
      <CenterContent>
        <Label>Tổng</Label>
        <Total>{total}</Total>
      </CenterContent>
    </ChartContainer>
  );
};

// Example usage
const DonutChart = ({ data, total }) => {
  return <PieChart data={data} total={total} />;
};

export default DonutChart;
