import { JSX } from "preact"
import { useContext } from "preact/hooks"
import { ClickProvider, useClick } from "../hooks/click"

interface Props {
  style?: JSX.CSSProperties
  class?: string
}

export default function Toolbar(props: Props) {
  const { click } = useClick()

  const toggle = { display: click ? "flow" : "flow"}

  return (
    <div style={ Object.assign(toggle, props?.style) } className={ props?.class }>
      <span>{ click }</span>
    </div>
  )
}