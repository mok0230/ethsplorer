import React from "react"

const reducer = (state, action) => {
  switch (action.type) {
    case "foo":
      return {
        ...state,
        active: !state.active
      }

    default:
      return state
  }
}

const initialState = {
  active: false
}

export const AppContext = React.createContext({
  state: initialState,
  dispatch: () => null
})

export const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={[ state, dispatch ]}>
    	{ children }
    </AppContext.Provider>
  )
}