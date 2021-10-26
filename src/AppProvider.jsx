import React from "react"
import { ethers } from "ethers"

const reducer = (state, action) => {
  console.log('hitting this reducer?')
  switch (action.type) {
    case "updateBlockCount":
      console.log('updateBlockCount');
      return {
        ...state,
        blockCount: action.value
      }
    case "updateMinBlockNum":
      console.log('updateBlockCount');
      return {
        ...state,
        minBlockNum: action.value
      }
    case "updateGasPrice":
      console.log('updateGasPrice')
      return {
        ...state,
        gasPrice: action.value
      }
    case "pushBlock":
      console.log('pushBlock')
      console.log('what is state?', state)
      return {
        ...state,
        blocks: [...state.blocks, action.value]
      }
    case "unshiftBlock":
      console.log('unshiftBlock')
      console.log('what is state?', state)
      return {
        ...state,
        blocks: [action.value, ...state.blocks]
      }
    case "cacheNewlyMinedBlockNumber":
      return {
        ...state,
        newlyMinedBlockNumbers: [...state.newlyMinedBlockNumbers, action.value]
      }
    case "removeFirstItemFromNewlyMinedBlockCache":
      return {
        ...state,
        newlyMinedBlockNumbers: [...state.newlyMinedBlockNumbers.slice(1)]
      }
    case "confirmDataInitialized":
      console.log('zzz confirming data is now initialized')
      return {
        ...state,
        isDataInitialized: true
      }
    default:
      return state
  }
}

const initialState = {
  nodeProvider: new ethers.providers.JsonRpcProvider(process.env.REACT_APP_ETH_NODE_HTTP_URL),
  // nodeWebSocket: new WebSocket(process.env.REACT_APP_ETH_NODE_WSS_URL),
  blockCount: null,
  minBlockNum: null,
  gasPrice: null,
  blocks: [],
  isDataInitialized: false,
  newlyMinedBlockNumbers: []
}

export const AppContext = React.createContext({
  state: initialState,
  dispatch: () => null
})

export const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{state, dispatch}}>
    	{ children }
    </AppContext.Provider>
  )
}