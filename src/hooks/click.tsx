import { createContext, JSX } from 'preact'
import { useState, useContext, useMemo } from 'preact/hooks'

interface Click {
  click: number
  toggle: () => void
}

export const ClickContext = createContext<Click>({
  click: 0,
  toggle: () => null
})

export const ClickProvider = ({ children }: { children: JSX.Element }) => {
  const [click, setClick] = useState<number>(0)

  function toggle() {
    setClick(click ? 0 : 1)
    console.log("triggered", click)
  }

  const value = useMemo(() => {
    return { click, toggle }
  }, [click])

  return (
    <ClickContext.Provider value={value}>
      {children}
    </ClickContext.Provider>
  )
}

export const useClick = () => {
  const { click, toggle } = useContext(ClickContext)
  return { click, toggle }
}