import { createContext, JSX } from 'preact'
import { useState, useContext } from 'preact/hooks'

interface Click {
  click: number
  setClick: (flag: number) => void
}

export const ClickContext = createContext<Click>({
  click: 0,
  setClick: () => {}
})

export const ClickProvider = ({ children }: { children: JSX.Element }) => {
  const [click, setClick] = useState<number>(0)

  const value = { click, setClick }
  return (
    <ClickContext.Provider value={value}>
      {children}
    </ClickContext.Provider>
  )
}

export const useClick = () => useContext(ClickContext)