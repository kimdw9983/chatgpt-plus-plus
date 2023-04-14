import { JSX } from "preact"
import { useBoolean } from "../../hooks/booleanContext"

interface Props {
  innerText: string | JSX.Element
  style?: JSX.CSSProperties
  className?: string
}

export default function ToggleButton(props: Props) {
  const { toggle } = useBoolean()

  const defaultClass = "flex justify-center items-center hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"
  const className = `${defaultClass} ${props?.className}`
  const innerElement = typeof props?.innerText === "string" ? <span>{ props.innerText }</span> : props.innerText
  return (
    <button onClick={ toggle } style={ props?.style } className={ className }>
      { innerElement }
    </button>
  )
}
