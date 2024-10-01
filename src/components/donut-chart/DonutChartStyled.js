import styled from 'styled-components';

export const RADIUS = 102;


const ChartContainer = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
`;

const Chart = styled.svg`
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
`;

const Circle = styled.circle`
  fill: none;
  stroke-width: 35;
  cx: 125;
  cy: 125;
  r: ${RADIUS};
`;

const Segment = styled(Circle)`
  stroke: ${(props) => props.color};
  stroke-dasharray: ${(props) => props.dashArray};
  stroke-dashoffset: ${(props) => props.dashOffset};
    
  transition: stroke-dasharray 0.5s ease-in-out, stroke-dashoffset 0.5s ease-in-out, stroke 0.5s ease-in-out, transform 0.5s ease-in-out;
  will-change: stroke-dasharray, stroke-dashoffset, stroke, transform;
  transform: scale(1);
  
  &:hover {
    transform: scale(1.03);
  }
`;
const CenterContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  width: 145px;
  height: 145px;
  vertical-align: middle;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.1);
`;

const Total = styled.div`
  font-size: 45px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  background: var(--primary, linear-gradient(90deg, #21d4fd 5.6%, #2152ff 96.47%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background 0.5s;
`;

const Label = styled.div`
  color: var(--Dark-grey, #a0aec0);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 14px */
`;


export {
  ChartContainer,
  Chart,
  Circle,
  Segment,
  CenterContent,
  Total,
  Label,
}
