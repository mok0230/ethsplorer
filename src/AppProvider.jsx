import React from "react"
import { ethers } from "ethers"

const reducer = (state, action) => {
  console.log('hitting this reducer?')
  switch (action.type) {
    case "updateBlockCount":
      console.log('updateBlockCount')
      return {
        ...state,
        blockCount: action.value
      }
    case "updateGasPrice":
      console.log('updateGasPrice')
      return {
        ...state,
        gasPrice: action.value
      }
    case "addBlock":
      console.log('addBlock')
      console.log('what is state?', state)
      return {
        ...state,
        blocks: [...state.blocks, action.value]
      }
    case "confirmDataInitialized":
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
  blockCount: null,
  gasPrice: null,
  blocks: [],
  isDataInitialized: false
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