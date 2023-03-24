import { JSX } from "preact"
import { useClick } from "../context/click"

interface Props {
  style?: JSX.CSSProperties
  class?: string
}

const defaultClass = ""

export default function ToggleButton(props: Props) {
  const { click, setClick } = useClick()

  const handleClick = () => {
    const flag = click ? 0 : 1
    setClick(flag)
    console.log(flag, click)
  }

  return (
    <button onClick={ handleClick } style={ props?.style } className={ defaultClass + props?.class }>
      <span>⚙️</span>
    </button>
  )
}
