import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { AppContext } from "./AppProvider"

export default function CurrentBlock() {
  const { state } = React.useContext(AppContext) as any;

  console.log('when is this rendered?');
  console.log('state', state)

  return (
    <React.Fragment>
      <Title>Current Block Number</Title>
      <Typography component="p" variant="h4">
        {state.blockCount}
      </Typography>
      {state.gasPrice && <Typography color="text.secondary" sx={{ flex: 1 }}>
        Current gas price: {state.gasPrice.toNumber().toLocaleString('en-US')}
      </Typography>}
    </React.Fragment>
  );
}
