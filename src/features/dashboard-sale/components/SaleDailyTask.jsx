import { Card } from '@/components/card/Card';
import { Col, Row } from 'antd';
import { DBSaleContent, DBSaleIcon, DBSaleItem } from '@/features/dashboard-sale/components/SaleDailyTaskStyled.js';
import { CardContent } from '@/components/card/CardStyled.jsx';

const TODAY_TASKS = [
  {
    title: 'Chưa chấm công',
    subTitle: 'Hôm nay',
    imgPath: './images/finger.png',
  },
  {
    title: '0 công việc',
    subTitle: ' Qúa hạn',
    imgPath: './images/danger.png',
  },

  {
    title: '3 công việc',
    subTitle: 'Đến hạn',
    imgPath: './images/clock.png',
  },
  {
    title: '1 công việc',
    subTitle: 'Sắp đến hạn',
    imgPath: './images/schedule.png',
  },
  {
    title: '1 công việc',
    subTitle: 'Chờ tôi duyệt',
    imgPath: './images/edit.png',
  },
  {
    title: '0 công việc',
    subTitle: 'Cần giao',
    imgPath: './images/task.png',
  },
];

export function SaleDailyTask() {
  return (
    <Card title="Công việc hôm nay" ableToFullScreen>
      <CardContent>
        <Row gutter={[20, 20]} justify={'space-between'}>
          {TODAY_TASKS.map((item) => {
            return (
              <>
                <Col span={8}>
                  <DBSaleItem>
                    <DBSaleIcon>
                      <img src={item.imgPath} alt="icon" />
                    </DBSaleIcon>
                    <DBSaleContent>
                      <p>{item.title}</p>
                      <span>{item.subTitle}</span>
                    </DBSaleContent>
                  </DBSaleItem>
                </Col>
              </>
            );
          })}
        </Row>
      </CardContent>
    </Card>
  );
}
