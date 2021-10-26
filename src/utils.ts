import dayjs from 'dayjs';

export const initializeBlockData = async (state: any, dispatch: any) => {
  const maxBlockNum = await updateMaxBlockNum(state, dispatch);

  // initialize first block
  await addBlock(state, dispatch, maxBlockNum, "pushBlock");

  updateMinBlockNum(dispatch, maxBlockNum);
  updateGasPrice(state, dispatch);

  openWebSocketConnection(state, dispatch);
}

const openWebSocketConnection = async (state: any, dispatch: any) => {
  const websocket = new WebSocket(process.env.REACT_APP_ETH_NODE_WSS_URL as string);

  websocket.onopen = (evt) => {
    websocket.send(JSON.stringify({"jsonrpc":"2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}))
  };

  websocket.onmessage = (evt) => { 
    console.log('message received');
    const parsedMessage = JSON.parse(evt.data);
    if (parsedMessage.params && parsedMessage.params.result) {
      dispatch({ type: "updateMaxBlockNum", value: parseInt(parsedMessage.params.result.number, 16) })
    }
  };
}

const updateMaxBlockNum = async (state: any, dispatch: any): Promise<number> => {
  const maxBlockNum = await state.nodeProvider.getBlockNumber();
  console.log('maxBlockNum', maxBlockNum);

  dispatch({
    type: 'updateMaxBlockNum',
    value: maxBlockNum
  });

  return maxBlockNum;
}

const updateMinBlockNum = (dispatch: any, currentBlockNum: number): number => {
  const minBlockNum = currentBlockNum - 10;
  dispatch({ type: "updateMinBlockNum", value: minBlockNum });
  return minBlockNum;
}

export const updateGasPrice = async (state: any, dispatch: any): Promise<number> => {
  const gasPrice = await state.nodeProvider.getGasPrice();
  console.log('gasPrice', gasPrice);

  dispatch({
    type: 'updateGasPrice',
    value: gasPrice
  });

  return gasPrice;
}

export const updateBlocks = async (state: any, dispatch: any, minBlockNum: number, maxBlockNum: number, existingBlocks: any[]) => {
  console.log('updateBlocks');
  console.log('existingBlocks', existingBlocks);
  let minBlockNumFetched = existingBlocks[0].number;
  let maxBlockNumFetched = existingBlocks[existingBlocks.length - 1].number;

  while (minBlockNumFetched > minBlockNum) {
    const unshiftBlockNum = minBlockNumFetched - 1
    console.log('minBlockNumFetched', minBlockNumFetched);
    console.log('minBlockNum', minBlockNum)
    await addBlock(state, dispatch, unshiftBlockNum, 'unshiftBlock')
    minBlockNumFetched = unshiftBlockNum;
  }
  

  while (maxBlockNumFetched < maxBlockNum) {
    const pushBlockNum = maxBlockNumFetched + 1;
    await addBlock(state, dispatch, pushBlockNum, 'pushBlock')
    maxBlockNumFetched = pushBlockNum;
  }
}

const addBlock = async (state: any, dispatch: any, blockNumber: number, dispatchType: 'pushBlock' | 'unshiftBlock'): Promise<any> => {
  console.log('addBlock');
  console.log('blockNumber', blockNumber)
  const blockData = await state.nodeProvider.getBlock(blockNumber);
  console.log('blockData', blockData);

  dispatch({
    type: dispatchType,
    value: blockData
  });

  return blockData;
}

export const generateBlockTableData = (state: any) => {
  if (!state.blocks || !state.blocks.length) return [];

  return state.blocks.map((block: any) => {
    return {
      blockNum: block.number,
      timestamp: dayjs.unix(block.timestamp).format('h:mm:ss'),
      txCount: block.transactions.length,
      gasLimit: block.gasLimit.toNumber().toLocaleString("en-US"),
      gasUsed: block.gasUsed.toNumber().toLocaleString("en-US")
    }
  }).reverse();
}

export const generateChartData = (state: any) => {
  if (!state.blocks || !state.blocks.length) return [];

  return state.blocks.map((block: any) => {
    return {
      timestamp: dayjs.unix(block.timestamp).format('h:mm:ss'),
      gasUsed: block.gasUsed.toNumber() / (10 ** 6)
    }
  })
}
