import { Component, Context } from "preact"
import { useContext } from "preact/hooks"

interface Props {
  clickedContext: Context<number>
}

interface State {

}

export default function Toolbar(props: Props, state: State) {
  const clicked = useContext(props.clickedContext)

  return (
    <div>{clicked}</div>
  )
}