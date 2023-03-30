import { createContext, JSX } from 'preact'
import { useState, useContext, useMemo } from 'preact/hooks'

interface Boolean {
  bool: number
  toggle: () => void
}
const BooleanContext = createContext<Boolean>({ 
  bool: 0,
  toggle: () => null
})

export const BooleanProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [bool, setBoolean] = useState<number>(0)

  function toggle() {
    setBoolean(bool ? 0 : 1)
  }

  const value = useMemo(() => {
    return { bool, toggle }
  }, [bool])

  return (
    <BooleanContext.Provider value={ value }>
      {children}
    </BooleanContext.Provider>
  )
}

export const useBoolean = () => {
  const { bool, toggle } = useContext(BooleanContext)
  return { bool, toggle }
}