import { createContext, JSX } from 'preact'
import { useState, useContext, useMemo, StateUpdater } from 'preact/hooks'

interface Number {
  number: number
  setNumber: StateUpdater<number>
}
const NumberContext = createContext<Number>({ 
  number: 0,
  setNumber: () => null
})

export const NumberProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [number, setNumber] = useState<number>(0)

  const value = useMemo(() => {
    return { number, setNumber }
  }, [number])

  return (
    <NumberContext.Provider value={ value }>
      {children}
    </NumberContext.Provider>
  )
}

export const useNumber = () => {
  const { number, setNumber } = useContext(NumberContext)
  return { number, setNumber }
}