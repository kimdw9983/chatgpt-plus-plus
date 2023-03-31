import { JSX } from "preact"
import { useBoolean } from "../hooks/booleanContext"

interface Props {
  style?: JSX.CSSProperties
  className?: string
  text: string | JSX.Element
}

const defaultClass = "hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"

export default function ToggleButton(props: Props): JSX.Element {
  const { toggle } = useBoolean()

  const className = `${defaultClass} ${props?.className}`
  const innerElement = typeof props?.text === "string" ? <span>{ props.text }</span> : props.text

  return (
    <button onClick={ toggle } style={ props?.style } className={ className }>
      { innerElement }
    </button>
  )
}
