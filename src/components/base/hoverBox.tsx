import { JSX } from "preact"
import { useBoolean } from "../../hooks/booleanContext"
import { uiUtils } from "../../utils/ui"

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

  const containerDefaultClassName = `flex select-none items-center mr-2`
  const ContainerClassName = `${props?.className} ${hover ? 'hover' : 'not-hover'} ${containerDefaultClassName}`
  const popup = hover.bool? props.children : null
  return (
    <>
      <div className={ ContainerClassName } style={ props.style } onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave } onMouseOver={ onMouseOver }>
        { props.hoverElement }
      </div>
      { popup }
    </>
  )
}

export default HoverBox