export const initializeBlockData = async (state: any, dispatch: any) => {
  const blockCount = await updateBlockCount(state, dispatch);

  await addBlock(state, dispatch, blockCount);

  // for (let i = blockCount; i > blockCount - 10; i--) {
  //   await addBlock();
  // }
  
}

const updateBlockCount = async (state: any, dispatch: any): Promise<number> => {
  const blockCount = await state.nodeProvider.getBlockNumber();
  console.log('blockCount', blockCount);

  dispatch({
    type: 'updateBlockCount',
    value: blockCount
  });

  return blockCount;
}

const addBlock = async (state: any, dispatch: any, blockNumber: number): Promise<boolean> => {
  const blockData = await state.nodeProvider.getBlock(blockNumber);
  console.log('blockData', blockData);

  dispatch({
    type: 'addBlock',
    value: blockData
  });

  return true;
}


// Available methods:

// https://docs.ethers.io/ethers.js/v3.0/html/api-providers.html

// ** ACCOUNT **

// prototype . getBalance ( addressOrName [ , blockTag ] )
// Returns a Promise with the balance (as a BigNumber) of addressOrName at blockTag. (See: Block Tags)

// default: blockTag=”latest”

// prototype . getTransactionCount ( addressOrName [ , blockTag ] )
// Returns a Promise with the number of sent transactions (as a Number) from addressOrName at blockTag. This is also the nonce required to send a new transaction. (See: Block Tags)

// default: blockTag=”latest”

// prototype . lookupAddress ( address )
// Returns a Promise which resolves to the ENS name (or null) that address resolves to.
// prototype . resolveName ( ensName )

// ** Blockchain Status **

// prototype . getBlockNumber ( )
// Returns a Promise with the latest block number (as a Number).
// prototype . getGasPrice ( )
// Returns a Promise with the current gas price (as a BigNumber).
// prototype . getBlock ( blockHashOrBlockNumber )
// Returns a Promise with the block at blockHashorBlockNumber. (See: Block Responses)
// prototype . getTransaction ( transactionHash )
// Returns a Promise with the transaction with transactionHash. (See: Transaction Responses)
// prototype . getTransactionReceipt ( transactionHash )
// Returns a Promise with the transaction receipt with transactionHash. (See: Transaction Receipts)

// ** Events **

// These methods allow management of callbacks on certain events on the blockchain and contracts. They are largely based on the EventEmitter API.

// prototype . on ( eventType , callback )
// Register a callback for any future eventType; see below for callback parameters
// prototype . once ( eventType , callback)
// Register a callback for the next (and only next) eventType; see below for callback parameters
// prototype . removeListener ( eventType , callback )
// Unregister the callback for eventType; if the same callback is registered more than once, only the first registered instance is removed
// prototype . removeAllListeners ( eventType )
// Unregister all callbacks for eventType
// prototype . listenerCount ( [ eventType ] )
// Return the number of callbacks registered for eventType, or if ommitted, the total number of callbacks registered
// prototype . resetEventsBlock ( blockNumber )
// Begin scanning for events from blockNumber. By default, events begin at the block number that the provider began polling at.
// Event Types

// “block”
// Whenever a new block is mined

// callback( blockNumber )

// any address
// When the balance of the corresponding address changes

// callback( balance )

// any transaction hash
// When the corresponding transaction is mined; also see Waiting for Transactions

// callback( transaction )

// an array of topics
// When any of the topics are triggered in a block’s logs; when using the Contract API, this is automatically handled;

// callback( log )

// Waiting for Transactions

// prototype . waitForTransaction ( transactionHash [ , timeout ] )
// Return a Promise which returns the transaction once transactionHash is mined, with an optional timeout (in milliseconds)