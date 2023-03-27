import { JSX } from "preact"
import { useContext } from "preact/hooks"
import { ClickContext, ClickProvider } from "../hooks/click"

interface Props {
  style?: JSX.CSSProperties
  class?: string
}

const defaultClass = ""

export default function ToggleButton(props: Props) {
  const { click, toggle } = useContext(ClickContext)

  return (
    <ClickProvider>
      <button onClick={ toggle } style={ props?.style } className={ defaultClass + props?.class }>
        <span>⚙️{click}</span>
      </button>
    </ClickProvider>
  )
}
