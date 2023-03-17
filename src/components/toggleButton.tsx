import { JSX, Context } from "preact"
import { useState, useMemo, useContext } from 'preact/hooks'
import { useClick } from "../context/click"

interface Props {
  style?: JSX.CSSProperties
  class?: string
}

const defaultClass = ""

export default function ToggleButton(props: Props) {
  const { click, setClick } = useClick()

  const handleClick = () => {
    const flag = click ? 0 : 1
    setClick(1)
  }

  return (
    <button onClick={ handleClick } style={ props?.style } className={ defaultClass + props?.class }>
      <span>⚙️</span>
    </button>
  )
}
