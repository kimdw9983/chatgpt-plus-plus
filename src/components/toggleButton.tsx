import { JSX, Context } from "preact"
import { useState, useMemo, useContext } from 'preact/hooks'

interface Props {
  clickedContext: Context<number>
  style?: JSX.CSSProperties
  class?: string
}

const defaultClass = ""

export default function ToggleButton(props: Props) {
  const clickedContext = useContext(props.clickedContext)
  const [clicked, setClicked] = useState<number>(0)

  const memo = useMemo(() => {
    return { clicked, setClicked }
  }, [clicked])

  const handleClick = () => {
    const flag = clicked ? 0 : 1
    setClicked(1)
  }

  return (
    <props.clickedContext.Provider value={ clickedContext }>
      <button onClick={ handleClick } style={ props?.style } className={ defaultClass + props?.class }>
        <span>⚙️</span>
      </button>
    </props.clickedContext.Provider>
  )
}
