import { JSX } from "preact"
import { useBoolean } from "../hooks/boolean"

interface Props {
  style?: JSX.CSSProperties
  class?: string
  text: string
}

const defaultClass = "hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"

export default function ToggleButton(props: Props) {
  const { toggle } = useBoolean()

  const className = `${defaultClass} ${props?.class}`

  return (
    <button onClick={ toggle } style={ props?.style } className={ className }>
      <span>{ props.text }</span>
    </button>
  )
}
