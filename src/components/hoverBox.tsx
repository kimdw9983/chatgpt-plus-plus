import { JSX } from "preact"
import { useBoolean } from "../hooks/booleanContext"

interface Props {
  innerText: string | JSX.Element
  style?: JSX.CSSProperties
  className?: string
}

function HoverBox(props: Props) {
  const hover = useBoolean()

  const onMouseEnter = () => {
    if (!hover.bool) hover.setBool(1)
  }

  const onMouseOver = () => {
    if (!hover.bool) hover.setBool(1)
  }

  const onMouseLeave = () => {
    if (hover.bool) hover.setBool(0)
  }

  const className = `${props.className} ${hover ? 'hover' : 'not-hover'}`
  const innerElement = typeof props?.innerText === "string" ? <span>{ props.innerText }</span> : props.innerText
  return (
    <div className={ className } style={ props.style } onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave } onMouseOver={ onMouseOver }>
      { innerElement }
    </div>
  )
}

export default HoverBox