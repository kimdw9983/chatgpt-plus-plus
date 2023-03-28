import { JSX } from "preact"
import { useContext } from "preact/hooks"
import { ClickProvider, useClick } from "../hooks/click"

interface Props {
  style?: JSX.CSSProperties
  class?: string
}

export default function ToggleButton(props: Props) {
  const { click, toggle } = useClick()

  return (
    <button onClick={ toggle } style={ props?.style } className={ props?.class }>
      <span>⚙️</span>
    </button>
  )
}
