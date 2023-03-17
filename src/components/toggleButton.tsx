import { JSX } from "preact"
import { useContext } from "preact/hooks"
import { ClickContext, useClick } from "../context/click"

interface Props {
  style?: JSX.CSSProperties
  class?: string
}

const defaultClass = ""
const { click, setClick } = useClick()

export default function ToggleButton(props: Props) {
  const handleClick = () => {
    const flag = click ? 0 : 1
    setClick(flag)
  }

  return (
    <button onClick={ handleClick } style={ props?.style } className={ defaultClass + props?.class }>
      <span>⚙️</span>
    </button>
  )
}
