import { JSX } from "preact"
import { useBoolean } from "../hooks/boolean"
import Dropdown from "../components/dropdown"
import Slider from "../components/slider"
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
  const { bool } = useBoolean()
  const [numResults, setNumResults] = useState(3)

  const defaultStyle = { display: bool ? "flex" : "none" }
  const style = Object.assign({}, defaultStyle, props?.style)

  const defaultClass = ""
  const className = `${props?.class} ${defaultClass}`

  return (
    <div style={ style } className={ className }>
      <Dropdown value={ numResults } desc={ "ℹ️ temparature: " } onChange={ onChangeTest } options={ optionTest } />
      <Dropdown value={ numResults } desc={ "ℹ️ max tokens: " } onChange={ onChangeTest } options={ optionTest } />
      <Slider defaultValue={ 50 } min={ 0 } max={ 100 } onChange={ onChangeTest } />
    </div>
  )
}