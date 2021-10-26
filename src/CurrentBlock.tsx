import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { AppContext } from "./AppProvider"
import { updateGasPrice, updateBlocks } from "./utils"

export default function CurrentBlock() {
  const { state, dispatch } = React.useContext(AppContext) as any;
  React.useEffect(() => {
    updateGasPrice(state, dispatch);
    if (state.blocks && state.blocks.length && state.minBlockNum) {
      updateBlocks(state, dispatch, state.minBlockNum, state.maxBlockNum, state.blocks);
    }
    
    // TODO: update block source data if necessary
  }, [state.maxBlockNum, state.minBlockNum]);

  return (
    <React.Fragment>
      <Title>Current Block Number</Title>
      <Typography component="p" variant="h4">
        <span id="current-block-number">{state.maxBlockNum}</span>
      </Typography>
      {state.gasPrice && <Typography color="text.secondary" sx={{ flex: 1 }}>
        Current gas price: {state.gasPrice.toNumber().toLocaleString('en-US')}
      </Typography>}
    </React.Fragment>
  );
}
