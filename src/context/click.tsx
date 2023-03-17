import { createContext, JSX } from 'preact'
import { useState, useContext } from 'preact/hooks'

interface ClickContextType {
  click: number
  setClick: (flag: number) => void
}

const defaultClickContext: ClickContextType = {
  click: 0,
  setClick: () => null
}

export const ClickContext = createContext<ClickContextType>(defaultClickContext)

export const ClickProvider = ({ children }: { children: JSX.Element }) => {
  const [click, setClick] = useState<number>(0)

  const value = { click, setClick }

  return (
    <ClickContext.Provider value={value}>
      {children}
    </ClickContext.Provider>
  )
}

export const useClick = () => {
  const { click, setClick } = useContext(ClickContext)
  return { click, setClick }
}