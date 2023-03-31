import { JSX } from "preact"
import { useState } from "preact/hooks"
import { BooleanProvider, useBoolean } from "../hooks/booleanContext"
import Slider from "../components/slider"
import Dropdown from "../components/dropdown"
import ToggleButton from "./toggleButton"
import ConditionalPopup from "./contitionalPopup"
import { uiUtils } from "../utils/ui"

interface Props {
  style?: JSX.CSSProperties
  className?: string
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
  const className = `${ props?.className } ${ defaultClass }`

  return (
    <div style={ style } className={ className }>
      <BooleanProvider>
        <BooleanProvider>
          <ConditionalPopup className={ `${uiUtils.getBoxClassName()} absolute` } style={{ top: '-75%', width: '256px', left: '-2px' }} >
            <Slider min={ 0 } max={ 2 } step={ 0.05 } context={{ value: temperature, setValue: setTemperature }} containerClassName={ "px-2 pt-3 pb-1" } tickLabels={["Precise", "Balanced", "Creative"]} />
          </ConditionalPopup>
          <div className="flex items-center">
            <span>temperature:</span>
          </div>
          <ToggleButton innerText={ <span>{ temperature }</span> } className={ "cpp-temperatureButton" } style={{ width: "2em" }} />
        </BooleanProvider>
      </BooleanProvider>
      
      <Dropdown value={ numResults } desc={ "ℹ️ prompts" } onChange={ onChangeTest } options={ optionTest } />
    </div>
  )
}