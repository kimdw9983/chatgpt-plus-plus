import { JSX } from "preact"
import { useState } from "preact/hooks"
import { BooleanProvider, useBoolean } from "../hooks/boolean"
import { NumberProvider, useNumber } from "../hooks/number"
import Slider from "../components/slider"
import Dropdown from "../components/dropdown"
import ToggleButton from "./toggleButton"

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

export default function Toolbar(props: Props): JSX.Element {
  const isShow = useBoolean()
  const temperature = useNumber()
  const [numResults, setNumResults] = useState(3)

  const defaultStyle = { display: isShow.bool ? "flex" : "none" }
  const style = Object.assign({}, defaultStyle, props?.style)

  const defaultClass = ""
  const className = `${props?.class} ${defaultClass}`

  return (
    <div style={ style } className={ className }>
      <BooleanProvider>
        <ToggleButton text={"⚙️"} class={ "cpp-temperatureButton" } />
      </BooleanProvider>
      
      <Dropdown value={ numResults } desc={ "ℹ️ prompts" } onChange={ onChangeTest } options={ optionTest } />
      <Slider defaultValue={ 50 } min={ 0 } max={ 100 } onChange={ onChangeTest } />
    </div>
  )
}