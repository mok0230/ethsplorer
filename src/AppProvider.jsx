import React from "react"
import { ethers } from "ethers"

const reducer = (state, action) => {
  switch (action.type) {
    case "updateMaxBlockNum":
      return {
        ...state,
        maxBlockNum: action.value
      }
    case "updateMinBlockNum":
      return {
        ...state,
        minBlockNum: action.value
      }
    case "updateGasPrice":
      return {
        ...state,
        gasPrice: action.value
      }
    case "pushBlock":
      return {
        ...state,
        blocks: [...state.blocks, action.value]
      }
    case "unshiftBlock":
      return {
        ...state,
        blocks: [action.value, ...state.blocks]
      }
    case "setAreBlocksUpdating":
      console.log("REDUCER: setAreBlocksUpdating", action.value);
      return {
        ...state,
        areBlocksUpdating: action.value
      }
    default:
      return state
  }
}

const initialState = {
  nodeProvider: new ethers.providers.JsonRpcProvider(process.env.REACT_APP_ETH_NODE_HTTP_URL),
  maxBlockNum: null,
  minBlockNum: null,
  gasPrice: null,
  blocks: [],
  areBlocksUpdating: false
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