import { createContext, JSX } from 'preact'
import { useState, useContext, StateUpdater } from 'preact/hooks'

export interface NumberType {
  number: number
  setNumber: StateUpdater<number>
}
const NumberContext = createContext<NumberType>({ 
  number: 0,
  setNumber: () => null
})

export const NumberProvider = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
  const [number, setNumber] = useState<number>(0)

  return (
    <NumberContext.Provider value={{ number, setNumber }}>
      { children }
    </NumberContext.Provider>
  )
}

export const useNumber = () => {
  const { number, setNumber } = useContext(NumberContext)
  return { number, setNumber }
}