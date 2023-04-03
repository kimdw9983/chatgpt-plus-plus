import { JSX } from "preact"
import { useState } from "preact/hooks"
import { BooleanProvider, useBoolean } from "../hooks/booleanContext"
import { uiUtils } from "../utils/ui"
import Slider from "../components/slider"
import Dropdown from "../components/dropdown"
import ToggleButton from "./toggleButton"
import ConditionalPopup from "./contitionalPopup"
import HoverBox from "./hoverBox"

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
  const [maxTokens, setMaxTokens] = useState<number>(4096)
  const [numResults, setNumResults] = useState<number>(3)

  const defaultStyle = { display: isShow.bool ? "flex" : "none" }
  const style = Object.assign({}, defaultStyle, props?.style)

  const defaultClass = ""
  const className = `${ props?.className } ${ defaultClass }`

  return (
  <div style={ style } className={ className }>
    <BooleanProvider>
      <HoverBox hoverElement={(<span className={`w-6 text-center ${uiUtils.getBoxBorder()}`}>❔</span>)}>
        <div className={ `${uiUtils.getBoxClassName()} absolute p-2` } style={{ top: '-200%', width: "20rem"}}>
          <span className="text-sm select-none">Controls the randomness or creativity of the generated text. The higher value will make the model generate more diverse and creative. The lower will generate more focused and conservative text. </span>
        </div>
      </HoverBox>
    </BooleanProvider>
    <div className="flex items-center">
      <span>temperature:</span>
    </div>
    <BooleanProvider>
      <ConditionalPopup className={ `${uiUtils.getBoxClassName()} absolute` } style={{ top: '-75%', width: '256px', left: '-2px' }} >
        <Slider min={ 0 } max={ 2 } step={ 0.05 } context={{ value: temperature, setValue: setTemperature }} containerClassName={ "px-2 pt-3 pb-1" } tickLabels={["Precise", "Balanced", "Creative"]} />
      </ConditionalPopup>
      <ToggleButton innerText={ <span>{ temperature }</span> } className={ "cpp-temperatureButton" } style={{ width: "2em" }} />
    </BooleanProvider>

    <BooleanProvider>
      <HoverBox hoverElement={(<span className={`w-6 text-center ${uiUtils.getBoxBorder()}`}>❔</span>)}>
        <div className={ `${uiUtils.getBoxClassName()} absolute p-2` } style={{ top: '-275%', left: '8rem', width: "20rem"}}>
          <span className="text-sm select-none">The maximum number of tokens that the model can handle in a single input-output sequence. Note that this limit includes both input and output tokens. So very long inputs might lead to incomplete or cut-off outputs due to the token limit constraint.</span>
        </div>
      </HoverBox>
    </BooleanProvider>
    <div className="flex items-center">
      <span>max_tokens:</span>
    </div>
    <BooleanProvider>
      <ConditionalPopup className={ `${uiUtils.getBoxClassName()} absolute` } style={{ top: '-75%', width: '256px', left: '10rem' }} >
        <Slider min={ 1 } max={ 4096 } step={ 1 } context={{ value: maxTokens, setValue: setMaxTokens }} containerClassName={ "px-2 pt-3 pb-1" } tickLabels={["1", "4096"]} />
      </ConditionalPopup>
      <ToggleButton innerText={ <span>{ maxTokens }</span> } className={ "cpp-maxTokensButton" } style={{ width: "3em" }} />
    </BooleanProvider>
    
    <Dropdown value={ numResults } desc={ "prompts" } onChange={ onChangeTest } options={ optionTest } />
  </div>
  )
}