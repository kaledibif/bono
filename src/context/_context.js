import React, { createContext } from 'react'

const AppContext = createContext({})

export const AppContextProvider = AppContext.Provider

export const AppContextConsumer = AppContext.Consumer

export const withAppHOC = Component => props => (
  <AppContextConsumer>
    {state => <Component {...props} app={state} />}
  </AppContextConsumer>
)
