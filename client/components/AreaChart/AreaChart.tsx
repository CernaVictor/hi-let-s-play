import {
  AreaChart as Chart,
  Area,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Statistics } from '../../types/types';

type AreaChartProps = {
  chartData: Statistics[];
};

export const AreaChart = ({ chartData }: AreaChartProps) => {
  return (
    <div>
      <ResponsiveContainer height={350} width={700}>
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
          <defs>
            <linearGradient
              id="colorOccupiedPercentage"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#ea865f" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ea865f" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend wrapperStyle={{ color: 'black' }} />
          <Area
            type="monotone"
            dataKey="occupiedPercentage"
            name="% Occupied"
            fillOpacity={1}
            fill="url(#colorOccupiedPercentage)"
          />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};
