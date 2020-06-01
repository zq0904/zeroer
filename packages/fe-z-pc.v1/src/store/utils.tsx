
import React, { cloneElement, createContext, useContext, useState, useCallback } from 'react'

export const RefreshContext = createContext<Function>(() => {})

export const useRefresh = () => useContext(RefreshContext)

export const RefreshProvider = ({ children }: any) => {
  const [key, setKey] = useState(Date.now())
  const refresh = useCallback(() => setKey(Date.now()), [])
  return (
    <RefreshContext.Provider value={refresh}>
      { cloneElement(children, { key }) }
    </RefreshContext.Provider>
  )
}
