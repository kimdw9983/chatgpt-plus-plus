import { Component, JSX, Context } from "preact"
import { useState } from 'preact/hooks'

interface Props {
  clickedContext: Context<number>
  style?: JSX.CSSProperties
  class?: string
}

interface State {
  clicked: number
}

const defaultClass = ""

export default function ToggleButton(props: Props, state: State) {
  const [clicked, setClicked] = useState(0)

  const handleClick = () => {
    const flag = state.clicked ? 0 : 1
    setClicked(flag)
  }

  return (
    <props.clickedContext.Provider value={ state.clicked }>
      <button onClick={ handleClick } style={ props?.style } className={ defaultClass + props?.class }>
        <span>⚙️</span>
      </button>
    </props.clickedContext.Provider>
  )
}
