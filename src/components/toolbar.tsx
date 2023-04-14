import { JSX } from "preact"
import { StateUpdater, useEffect, useState } from "preact/hooks"
import { defaultUserConfig, getUserConfig, saveUserConfig } from "../managers/userConfig"
import { BooleanProvider, useBoolean } from "../hooks/booleanContext"
import { svg, uiUtils } from "../utils/ui"
import CppDialog from "./base/cppDialog"
import Slider from "./base/slider"
import Dropdown, { DropDownProps } from "./base/dropdown"
import ToggleButton from "./base/toggleButton"
import ConditionalPopup from "./base/contitionalPopup"
import HoverBox from "./base/hoverBox"
import InputBox from "./base/inputBox"
import PromptEdit from "./promptEdit"
import { PromptList, defaultPrompt, defaultPromptSetting, readPromptList, readPromptSetting, sortBytimeCreated } from "../managers/prompt"

function HoverElement() {
  return (
  <div className={`p-1 ${uiUtils.getBoxBorder()}`}>
    <svg.questionMark />
  </div>
  )
}

interface SliderSelectionProps {
  propertyName: string
  description: string
  valueState: { value: number, setValue: StateUpdater<number> }
  toggleState: { value: boolean, setValue: StateUpdater<boolean> }
  widthInEm: number
  leftInEm: number
  min: number
  max: number
  inputStep: number
  sliderStep: number
  tickLabels?: Array<string>
}
function SliderSelection(props: SliderSelectionProps) {
  return (
  <div className="flex ml-2">
    <BooleanProvider>
      <HoverBox hoverElement={<HoverElement />}>
        <div className={ `${uiUtils.getBoxClassName()} absolute p-2 z-50` } style={{ top: '8px', width: "20rem", transform: "translate(0, -100%)", left: props.leftInEm + 'em' }}>
          <span className="text-sm select-none">{ props.description }</span>
        </div>
      </HoverBox>
    </BooleanProvider>
    <div className="flex items-center">
      <span>{ props.propertyName }</span>
    </div>
    <BooleanProvider>
      <ConditionalPopup className={ `${uiUtils.getBoxClassName()} absolute flex-col` } style={{ width: '256px', transform: "translate(0, -100%)", top: "0", left: props.leftInEm + 'em-2px' }} >
        <div className="flex justify-between w-full text-sm">
          <InputBox type="checkbox" context={{ value: props.toggleState.value, setValue: props.toggleState.setValue }} inputClassName="ml-2" labelText="Enabled" />
          <InputBox type="number" min={ props.min } max={ props.max } step={ props.inputStep } context={{ value: props.valueState.value, setValue: props.valueState.setValue }} inputStyle={{ width: (props.widthInEm + 1) + 'em'}} enabled={ props.toggleState.value } />
        </div>
        <Slider min={ props.min } max={ props.max } step={ props.sliderStep } context={{ value: props.valueState.value, setValue: props.valueState.setValue }} containerClassName={ "px-2 pt-3 pb-1" } enabled={ props.toggleState.value } tickLabels={ props.tickLabels } />
      </ConditionalPopup>
      <ToggleButton innerText={ <span>{ props.toggleState.value ? props.valueState.value : "❌" }</span> } className={ `cpp-${props.propertyName}Button` } style={{ width: props.widthInEm + "em" }} />
    </BooleanProvider>
  </div>
  )
}
  
function PromptDropdown() {
  const [options, setOptions] = useState<{ value: string | number, label: string }[]>([])
  const [selectedPrompt, setSelectedPrompt] = useState<string>(defaultPromptSetting.cppSelectedPromptID)

  function readPersistent() {
    readPromptList().then((list) => {
      if (Object.keys(list).length === 0) return
      const filtered = Object.values(list).filter(prompt => prompt.showOnToolbar || prompt.id == selectedPrompt).sort(sortBytimeCreated).map(prompt => {return {value: prompt.id, label: prompt.name}})
      setOptions(filtered)
    })
    readPromptSetting().then((setting) => {
      setSelectedPrompt(setting.cppSelectedPromptID)
    })
  }

  useEffect(() => {
    readPersistent()
  }, [])

  function onChangePrompt(e: any) {
    setSelectedPrompt(e.target.value)
  }

  //Check if this dialog is currently shown, currently only checks whether the root's display is none. 
  //Unnecessary re-rendering would happen if multiple dialogs are being created.
  useEffect(() => {
    const dialogRoot = document.querySelector<HTMLDivElement>("#cpp-dialog-root")
    if (!dialogRoot) return

    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          readPersistent()
        }
      }
    })
    observer.observe(dialogRoot, { attributes: true })

    return () => {
      observer.disconnect()
    }
  })

  return (
    <Dropdown value={ selectedPrompt } onChange={ onChangePrompt } options={ options } className="py-1 mr-2" /> 
  )
}

interface ToolbarProps {
  style?: JSX.CSSProperties
  className?: string
}
export default function Toolbar(props: ToolbarProps) {
  const isShow = useBoolean()

  const [temperature, setTemperature] = useState<number>(defaultUserConfig.cppTemperature)
  const [temperatureEnabled, setTemperatureEnabled] = useState<boolean>(defaultUserConfig.cppTemperatureEnabled)
  const [maxTokens, setMaxTokens] = useState<number>(defaultUserConfig.cppMaxTokens)
  const [maxTokensEnabled, setMaxTokensEnabled] = useState<boolean>(defaultUserConfig.cppMaxTokensEnabled)
  
  useEffect(() => {
    getUserConfig().then((userConfig) => {
      setTemperature(userConfig.cppTemperature)
      setTemperatureEnabled(userConfig.cppTemperatureEnabled)
      setMaxTokens(userConfig.cppMaxTokens)
      setMaxTokensEnabled(userConfig.cppMaxTokensEnabled)
    })
  }, [])
  useEffect(() => {
    saveUserConfig({ 
      cppTemperature: temperature, 
      cppTemperatureEnabled: temperatureEnabled,
      cppMaxTokens: maxTokens,
      cppMaxTokensEnabled: maxTokensEnabled
    })
  }, [temperature, temperatureEnabled, maxTokens, maxTokensEnabled])

  const defaultClass = ""
  const className = `${ props?.className } ${ defaultClass }`
  const defaultStyle = { display: isShow.bool ? "flex" : "none" }
  const style = Object.assign({}, defaultStyle, props?.style)

  return (
  <div style={ style } className={ className }>
    <SliderSelection 
      propertyName="temperature" 
      description="Controls the randomness or creativity of the generated text. The higher value will make the model generate more diverse and creative. The lower will generate more focused and conservative text."
      valueState={{ value: temperature, setValue: setTemperature }}
      toggleState={{ value: temperatureEnabled, setValue: setTemperatureEnabled }}
      widthInEm={ 2 }
      leftInEm={ 0 }
      min={ 0 }
      max={ 2 }
      inputStep={ 0.01 }
      sliderStep={ 0.05 }
      tickLabels={["Precise", "Balanced", "Creative"]}
    />

    <SliderSelection 
      propertyName="max_tokens" 
      description="The maximum number of tokens that the model can handle in a single input-output sequence. Note that this limit includes both input and output tokens. So very long inputs might lead to incomplete or cut-off outputs due to the token limit constraint."
      valueState={{ value: maxTokens, setValue: setMaxTokens }}
      toggleState={{ value: maxTokensEnabled, setValue: setMaxTokensEnabled }}
      widthInEm={ 3 }
      leftInEm={ 11 }
      min={ 1 }
      max={ 4096 }
      inputStep={ 1 }
      sliderStep={ 1 }
      tickLabels={["1", "4096"]}
    />

    <div className="flex ml-2">
      <BooleanProvider>
        <HoverBox hoverElement={<HoverElement />}>
          <div className={ `${uiUtils.getBoxClassName()} absolute p-2 z-50` } style={{ top: '8px', width: "20rem", transform: "translate(0, -100%)", left: '22rem'}}>
            <span className="text-sm select-none">Prompt is a piece of text or input provided to the model to guide its response or output. Well-crafted prompt can generate answer more clear, relevant, efficient. ChatGPT++ offers the access to well-known prompts repositry, Awesome ChatGPT Prompts.</span>
          </div>
        </HoverBox>
      </BooleanProvider>
      <PromptDropdown />
      <CppDialog buttonText={<svg.modification/>} namespace="prompt-edit" title="Edit prompts">
        <PromptEdit ContainerStyle={{ height: '30rem' }}/>
      </CppDialog>
    </div>
  </div>
  )
}