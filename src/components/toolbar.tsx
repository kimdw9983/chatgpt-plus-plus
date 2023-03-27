import { useContext } from "preact/hooks"
import { ClickProvider, ClickContext } from "../hooks/click"

export default function Toolbar() {
  const click = useContext(ClickContext)

  return (
    <ClickProvider>
      <div>
        <span>{ click.click }</span>
      </div>
    </ClickProvider>
  )
}