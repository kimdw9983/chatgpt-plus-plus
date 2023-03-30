import { JSX } from "preact"
import { BooleanProvider, useBoolean } from "../hooks/booleanContext"

interface Props {
  style?: JSX.CSSProperties
  class?: string
  children: JSX.Element
}

export default function ConditionalPopup(props: Props): JSX.Element {
  const isShow = useBoolean()

  const defaultStyle = { display: isShow.bool ? "flex" : "none" }
  const style = Object.assign({}, defaultStyle, props?.style)

  const defaultClass = ""
  const className = `${ props?.class } ${ defaultClass }`

  return (
    <div style={ style } className={ className }>
      { props.children }
    </div>
  )
}