import React from 'react';
import { AppContext } from "./AppProvider"
import { updateBlockCount } from "./utils" 

function BlockTable() {
  const { state, dispatch } = React.useContext(AppContext) as any;

  React.useEffect(() => {
    console.log('useEffect should only run once')
    updateBlockCount(state, dispatch);
  }, []);

  return (
    <div>
      <p>
        Total blocks in Ethereum blockchain: {state.blockCount}
      </p> 
    </div>
  );
}

export default BlockTable;
