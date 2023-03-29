import { JSX } from "preact"
import { useClick } from "../hooks/click"

interface Props {
  style?: JSX.CSSProperties
  class?: string
}

export default function ToggleButton(props: Props) {
  const { toggle } = useClick()

  return (
    <button onClick={ toggle } style={ props?.style } className={ props?.class }>
      <span>⚙️</span>
    </button>
  )
}
