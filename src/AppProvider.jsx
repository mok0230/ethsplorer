import React from "react"
import { ethers } from "ethers"

const reducer = (state, action) => {
  console.log('hitting this reducer?')
  switch (action.type) {
    case "updateBlockCount":
      console.log('hit the right action')
      return {
        ...state,
        blockCount: action.value
      }
    default:
      return state
  }
}

const initialState = {
  nodeProvider: new ethers.providers.JsonRpcProvider(process.env.REACT_APP_ETH_NODE_HTTP_URL),
  blockCount: null
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