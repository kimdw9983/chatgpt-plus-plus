import { JSX } from "preact"
import { useBoolean } from "../hooks/booleanContext"

interface Props {
  style?: JSX.CSSProperties
  className?: string
  children: JSX.Element
}

export default function ConditionalPopup(props: Props): JSX.Element {
  const isShow = useBoolean()

  const defaultStyle = { display: isShow.bool ? "flex" : "none" }
  const style = Object.assign({}, defaultStyle, props?.style)

  const defaultClass = ""
  const className = `${ props?.className } ${ defaultClass }`

  return (
    <div style={ style } className={ className }>
      { props.children }
    </div>
  )
}