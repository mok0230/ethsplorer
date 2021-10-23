import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { AppContext } from "./AppProvider"

export default function Deposits() {
  const { state } = React.useContext(AppContext) as any;

  console.log('when is this rendered?');
  console.log('state', state)

  return (
    <React.Fragment>
      <Title>Total Blocks</Title>
      <Typography component="p" variant="h4">
        {state.blockCount}
      </Typography>
    </React.Fragment>
  );
}
