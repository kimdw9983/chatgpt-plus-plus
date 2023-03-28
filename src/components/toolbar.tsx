import { useContext } from "preact/hooks"
import { ClickProvider, useClick } from "../hooks/click"

export default function Toolbar() {
  const { click } = useClick()

  return (
    <ClickProvider>
      <div>
        <span>{ click }</span>
      </div>
    </ClickProvider>
  )
}