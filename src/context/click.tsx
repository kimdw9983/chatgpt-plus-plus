import { createContext, JSX } from 'preact'
import { useState, useContext } from 'preact/hooks'

interface ClickType {
  click: number
  setClick: (flag: number) => void
}

const defaultClickContext: ClickType = {
  click: 0,
  setClick: () => null
}

export const ClickContext = createContext<ClickType>(defaultClickContext)

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