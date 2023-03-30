import { JSX } from "preact"
import { useClick } from "../hooks/click"

interface Props {
  style?: JSX.CSSProperties
  class?: string
  text: string
}

export default function ToggleButton(props: Props) {
  const { toggle } = useClick()

  return (
    <button onClick={ toggle } style={ props?.style } className={ props?.class }>
      <span>{ props.text }</span>
    </button>
  )
}
