import { JSX } from "preact"
import { useClick } from "../hooks/click"
import Dropdown from "../components/dropdown"
import { useState } from "preact/hooks"

interface Props {
  style?: JSX.CSSProperties
  class?: string
}

function onChangeTest(e: { target: { value: string } }) {
  console.log(e.target.value, e)
}

const optionTest = Array.from({ length: 10 }, (_, i) => i + 1).map((num) => ({
  value: num,
  label: `${num} result${num === 1 ? '' : 's'}`
}))

export default function Toolbar(props: Props) {
  const { click } = useClick()
  const [numResults, setNumResults] = useState(3)

  const defaultStyle = { display: click ? "flex" : "none" }
  const style = Object.assign({}, defaultStyle, props?.style)

  const defaultClass = ""
  const className = `${props?.class} ${defaultClass}`

  return (
    <div style={ style } className={ className }>
      <Dropdown value={ numResults } desc={ "temparature: " } onChange={ onChangeTest } options={ optionTest } />
      <Dropdown value={ numResults } desc={ "max tokens: " } onChange={ onChangeTest } options={ optionTest } />
    </div>
  )
}