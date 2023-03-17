import { Context } from "preact"
import { useContext } from "preact/hooks"

interface Props {
  clickedContext: Context<number>
}

export default function Toolbar(props: Props) {
  const clicked = useContext(props.clickedContext)

  return (
    <div>{clicked}</div>
  )
}