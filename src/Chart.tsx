import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { generateChartData } from './utils';
import { AppContext } from './AppProvider';

export default function Chart() {
  const { state } = React.useContext(AppContext) as any;
  const data = generateChartData(state);
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Gas Used per Block</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="timestamp"
            stroke={theme.palette.text.secondary}
            // style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            // style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Gas (million)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="gasUsed"
            stroke="#8884d8"
            // {theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
