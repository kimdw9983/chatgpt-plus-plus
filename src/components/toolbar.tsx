import { JSX } from "preact"
import { useState } from "preact/hooks"
import { BooleanProvider, useBoolean } from "../hooks/booleanContext"
import { uiUtils } from "../utils/ui"
import Slider from "../components/slider"
import Dropdown from "../components/dropdown"
import ToggleButton from "./toggleButton"
import ConditionalPopup from "./contitionalPopup"
import HoverBox from "./hoverBox"
import InputBox from "./inputBox"

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
  const [temperatureEnabled, setTemperatureEnabled] = useState<boolean>(true)
  const [maxTokens, setMaxTokens] = useState<number>(4096)
  const [maxTokensEnabled, setMaxTokensEnabled] = useState<boolean>(true)
  const [numResults, setNumResults] = useState<number>(3)
  
  const defaultClass = ""
  const className = `${ props?.className } ${ defaultClass }`
  const defaultStyle = { display: isShow.bool ? "flex" : "none" }
  const style = Object.assign({}, defaultStyle, props?.style)

  return (
  <div style={ style } className={ className }>
    <div className="flex">
      <BooleanProvider>
        <HoverBox hoverElement={(<span className={`w-6 text-center ${uiUtils.getBoxBorder()}`}>❔</span>)}>
          <div className={ `${uiUtils.getBoxClassName()} absolute p-2 z-50` } style={{ top: '8px', width: "20rem", transform: "translate(0, -100%)" }}>
            <span className="text-sm select-none">Controls the randomness or creativity of the generated text. The higher value will make the model generate more diverse and creative. The lower will generate more focused and conservative text. </span>
          </div>
        </HoverBox>
      </BooleanProvider>
      <div className="flex items-center">
        <span>temperature:</span>
      </div>
      <BooleanProvider>
        <ConditionalPopup className={ `${uiUtils.getBoxClassName()} absolute flex-col` } style={{ width: '256px', transform: "translate(0, -100%)", top: "0", left: '-2px' }} >
          <div className="flex justify-between w-full text-sm">
            <InputBox type="checkbox" context={{ value: temperatureEnabled, setValue: setTemperatureEnabled }} inputClassName="ml-2" labelText={ "Enabled" } />
            <InputBox type="number" min={ 0 } max={ 2 } step={ 0.01 } context={{ value: temperature, setValue: setTemperature }} inputStyle={{ width: '3em'}} enabled={ temperatureEnabled } />
          </div>
          <Slider min={ 0 } max={ 2 } step={ 0.05 } context={{ value: temperature, setValue: setTemperature }} containerClassName={ "px-2 pt-3 pb-1" } enabled={ temperatureEnabled } tickLabels={["Precise", "Balanced", "Creative"]} />
        </ConditionalPopup>
        <ToggleButton innerText={ <span>{ temperatureEnabled ? temperature : "❌" }</span> } className={ "cpp-temperatureButton" } style={{ width: "2em" }} />
      </BooleanProvider>
    </div>

    <div className="flex ml-2">  
      <BooleanProvider>
        <HoverBox hoverElement={(<span className={`w-6 text-center ${uiUtils.getBoxBorder()}`}>❔</span>)}>
          <div className={ `${uiUtils.getBoxClassName()} absolute p-2 z-50` } style={{ top: '8px', width: "20rem", transform: "translate(0, -100%)", left: '10rem' }}>
            <span className="text-sm select-none">The maximum number of tokens that the model can handle in a single input-output sequence. Note that this limit includes both input and output tokens. So very long inputs might lead to incomplete or cut-off outputs due to the token limit constraint.</span>
          </div>
        </HoverBox>
      </BooleanProvider>
      <div className="flex items-center">
        <span>max_tokens:</span>
      </div>
      <BooleanProvider>
        <ConditionalPopup className={ `${uiUtils.getBoxClassName()} absolute flex-col` } style={{ width: '256px', transform: "translate(0, -100%)", top: "0", left: '11rem' }} >
          <div className="flex justify-between w-full text-sm">
            <InputBox type="checkbox" context={{ value: maxTokensEnabled, setValue: setMaxTokensEnabled }} inputClassName="ml-2" labelText={ "Enabled" } />
            <InputBox type="number" min={ 1 } max={ 4096 } step={ 1 } context={{ value: maxTokens, setValue: setMaxTokens }} inputStyle={{ width: '4em'}} enabled={ maxTokensEnabled } />
          </div>
          <Slider min={ 1 } max={ 4096 } step={ 1 } context={{ value: maxTokens, setValue: setMaxTokens }} containerClassName={ "px-2 pt-3 pb-1" } enabled={ maxTokensEnabled } tickLabels={["1", "4096"]} />
        </ConditionalPopup>
        <ToggleButton innerText={ <span>{ maxTokensEnabled ? maxTokens : "❌" }</span> } className={ "cpp-maxTokensButton" } style={{ width: "3em" }} />
      </BooleanProvider>
    </div>

    <div className="flex ml-2">
      <BooleanProvider>
        <HoverBox hoverElement={(<span className={`w-6 text-center ${uiUtils.getBoxBorder()}`}>❔</span>)}>
          <div className={ `${uiUtils.getBoxClassName()} absolute p-2 z-50` } style={{ top: '8px', width: "20rem", transform: "translate(0, -100%)", left: '22rem'}}>
            <span className="text-sm select-none">Prompt is a piece of text or input provided to the model to guide its response or output. Well-crafted prompt can generate answer more clear, relevant, efficient. This extension offers to access the well-known prompts repositry, Awesome ChatGPT Prompts.</span>
          </div>
        </HoverBox>
      </BooleanProvider>
      <Dropdown value={ numResults } desc={ "prompts:" } onChange={ onChangeTest } options={ optionTest } className="py-1 ml-2" />
    </div>   
  </div>
  )
}