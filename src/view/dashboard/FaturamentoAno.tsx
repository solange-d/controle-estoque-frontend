import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Title from '../../components/Title';

const anoAntes = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 3950, 4500, 4010, 4350, 4800];
const anoAtual = [2400, 1398, 9800, 3908, 7500, 4600, 6700, 3450, 4990, 4800, 6250, 9100];
const xLabels = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

const anoAtualLabel = new Date().getFullYear().toString();
const anoAnteriorLabel = (new Date().getFullYear() -1).toString();

export default function SimpleLineChart() {
  return (
    <React.Fragment>
      <Title>Faturamento por Ano</Title>
      <LineChart
        width={850}
        height={300}
        series={[
          { data: anoAntes, label: anoAnteriorLabel },
          { data: anoAtual, label: anoAtualLabel },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </React.Fragment>
  );
}
