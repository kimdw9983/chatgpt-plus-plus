import { JSX } from "preact"
import { useState } from "preact/hooks"

interface Props {
  popup: JSX.Element
  style?: JSX.CSSProperties
  className?: string
}

function HoverBox(props: Props) {
  const [hover, setHover] = useState(false)

  const onMouseEnter = () => {
    if (!hover) setHover(true)
  }

  const onMouseOver = () => {
    if (!hover) setHover(true)
  }

  const onMouseLeave = () => {
    if (hover) setHover(false)
  }

  const className = `${props.className} ${hover ? 'hover' : 'not-hover'}`

  return (
    <div className={ className } style={ props.style } onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave } onMouseOver={ onMouseOver }>
      { hover && props.popup }
    </div>
  )
}

export default HoverBox