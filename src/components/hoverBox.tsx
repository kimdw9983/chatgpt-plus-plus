import { JSX } from "preact"
import { useBoolean } from "../hooks/booleanContext"

interface Props {
  hoverElement: JSX.Element
  children: JSX.Element
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

  const defaultClassName = "flex items-center"
  const className = `${props.className} ${hover ? 'hover' : 'not-hover'} ${defaultClassName}`
  const popup = hover.bool? props.children : null
  return (
    <>
      <div className={ className } style={ props.style } onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave } onMouseOver={ onMouseOver }>
        { props.hoverElement }
      </div>
      { popup }
    </>
  )
}

export default HoverBox