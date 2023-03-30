import { JSX } from "preact"
import { useState } from "preact/hooks"
import { BooleanProvider, useBoolean } from "../hooks/booleanContext"
import Slider from "../components/slider"
import Dropdown from "../components/dropdown"
import ToggleButton from "./toggleButton"
import ConditionalPopup from "./contitionalPopup"

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
  const [temperature, setTemperature] = useState<number>(1)
  const [numResults, setNumResults] = useState<number>(3)

  const defaultStyle = { display: isShow.bool ? "flex" : "none" }
  const style = Object.assign({}, defaultStyle, props?.style)

  const defaultClass = ""
  const className = `${ props?.class } ${ defaultClass }`

  return (
    <div style={ style } className={ className }>
      <BooleanProvider>
        <BooleanProvider>
          <ConditionalPopup>
            <Slider min={ 0 } max={ 2 } step={ 0.05 } context={{ value: temperature, setValue: setTemperature }} />
          </ConditionalPopup>
          <ToggleButton text={ <span>{ temperature }</span> } class={ "cpp-temperatureButton" } />
        </BooleanProvider>
      </BooleanProvider>
      
      <Dropdown value={ numResults } desc={ "ℹ️ prompts" } onChange={ onChangeTest } options={ optionTest } />
    </div>
  )
}