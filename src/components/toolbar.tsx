import { JSX } from "preact"
import { useClick } from "../hooks/click"

interface Props {
  style?: JSX.CSSProperties
  class?: string
}

export default function Toolbar(props: Props) {
  const { click } = useClick()

  const toggle = { display: click ? "block" : "none"}
  const style = Object.assign({}, toggle, props?.style) 
  
  return (
    <div style={ style } className={ props?.class }>
      <span>{ click }</span>
    </div>
  )
}