import { createContext, JSX } from 'preact'
import { useState, useContext, useMemo, StateUpdater } from 'preact/hooks'

export interface BooleanType {
  bool: number
  setBool: StateUpdater<number>
  toggle: () => void
}
const BooleanContext = createContext<BooleanType>({ 
  bool: 0,
  setBool: () => null,
  toggle: () => null
})

export const BooleanProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [bool, setBool] = useState<number>(0)

  function toggle() {
    setBool(bool ? 0 : 1)
  }

  const value = useMemo(() => {
    return { bool, setBool, toggle }
  }, [bool])

  return (
    <BooleanContext.Provider value={ value }>
      {children}
    </BooleanContext.Provider>
  )
}

export const useBoolean = () => {
  const { bool, setBool, toggle } = useContext(BooleanContext)
  return { bool, setBool, toggle }
}