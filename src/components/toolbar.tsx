import { Context } from "preact"
import { useClick } from "../context/click"

export default function Toolbar() {
  const { click } = useClick()

  return (
    <div>{ click }</div>
  )
}