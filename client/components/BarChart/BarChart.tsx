import {
  BarChart as Chart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Statistics } from '../../types/types';

type BarChartProps = {
  chartData: Statistics[];
  dataKey: string;
};

export const BarChart = ({ chartData, dataKey }: BarChartProps) => {
  return (
    <div>
      <ResponsiveContainer height={350}>
        <Chart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          maxBarSize={50}
        >
          <CartesianGrid strokeDasharray="1 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill="#ea865f" />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};
