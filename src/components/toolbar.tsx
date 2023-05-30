import { JSX } from "preact"
import { StateUpdater, useEffect, useState } from "preact/hooks"
import { defaultUserConfig, getUserConfig, saveUserConfig } from "../managers/userConfig"
import { BooleanProvider, useBoolean } from "../hooks/booleanContext"
import svg from "../assets/svg"
import CppDialog from "./base/cppDialog"
import Slider from "./base/slider"
import Dropdown from "./base/dropdown"
import ToggleButton from "./base/toggleButton"
import ConditionalPopup from "./base/contitionalPopup"
import HoverBox from "./base/hoverBox"
import InputBox from "./base/inputBox"
import PromptEdit from "./promptEdit"
import { defaultPromptSetting, languages_list, persistPromptSetting, readPromptList, readPromptSetting, sortBytimeCreated } from "../managers/prompt"
import { testRemoveSyncedStorage } from "../utils/storage"
import { isDev } from "../utils/common"

function getBoxClassName() {
  return "flex border border-black/10 dark:border-gray-900/50 dark:text-white bg-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
}

function HoverElement() {
  return (
  <div className={`p-1 border border-black/10 dark:border-gray-900/50 rounded-md`}>
    <svg.questionMark />
  </div>
  )
}

function PropertyLabel(props: { title: string }) {
  return (
  <div className="flex items-center text-gray-900 dark:text-gray-300">
    <span>{ props.title }</span>
  </div>
  )
}

function DescriptionBox(props: { description: string }) {
  return (
  <BooleanProvider>
    <HoverBox hoverElement={<HoverElement />}>
      <div className={ `${getBoxClassName()} absolute p-2 z-50` } style={{ top: '8px', width: "20rem", transform: "translate(0, -100%)" }}>
        <span className="text-sm select-none">{ props.description }</span>
      </div>
    </HoverBox>
  </BooleanProvider>
  )
}

interface SettingsBoxProps {
  propertyName: string
  toggleState: { value: boolean, setValue: StateUpdater<boolean> }
  bodyState: { value: any, setValue: StateUpdater<any> }
  children: JSX.Element | JSX.Element[]
}
function SettingBox(props: SettingsBoxProps) {
  const innerText = () => (
    <span className="text-ellipsis overflow-hidden" style="white-space: nowrap;">
      { props.toggleState.value ? props.bodyState.value : "❌" }
    </span>
  )

  return (
  <BooleanProvider>
    <ConditionalPopup className={ `${getBoxClassName()} absolute flex-col` } style={{ width: '256px', transform: "translate(0, -100%)", top: "0" }} >
      { props.children }
    </ConditionalPopup>
    <ToggleButton innerText={ innerText() } className={ `cpp-${props.propertyName}-button grow ml-1` }/>
  </BooleanProvider>
  )
}

interface SliderSelectionProps {
  propertyName: string
  description: string
  bodyState: { value: number, setValue: StateUpdater<number> }
  toggleState: { value: boolean, setValue: StateUpdater<boolean> }
  widthInEm: number
  min: number
  max: number
  inputStep: number
  sliderStep: number
  tickLabels?: Array<string>
}
function SliderSelection(props: SliderSelectionProps) {
  return (
  <div className="flex" style="flex-basis: 31%">
    <DescriptionBox description={ props.description } />
    <PropertyLabel title={ props.propertyName } />
    <SettingBox propertyName={ props.propertyName } toggleState={ props.toggleState } bodyState={ props.bodyState }>
      <div className="flex justify-between w-full text-sm">
        <InputBox type="checkbox" context={{ value: props.toggleState.value, setValue: props.toggleState.setValue }} inputClassName="ml-2" labelText="Enabled" />
        <InputBox type="number" min={ props.min } max={ props.max } step={ props.inputStep } context={{ value: props.bodyState.value, setValue: props.bodyState.setValue }} inputStyle={{ width: (props.widthInEm + 1) + 'em'}} enabled={ props.toggleState.value } />
      </div>
      <Slider min={ props.min } max={ props.max } step={ props.sliderStep } context={{ value: props.bodyState.value, setValue: props.bodyState.setValue }} containerClassName={ "px-2 pt-3 pb-1" } enabled={ props.toggleState.value } tickLabels={ props.tickLabels } />
    </SettingBox>
  </div>
  )
}
  
function PromptDropdown() {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false)
  const [options, setOptions] = useState<{ value: string | number, label: string }[]>([])
  const [selectedPrompt, setSelectedPrompt] = useState<string>(defaultPromptSetting.cppSelectedPromptID)

  async function readPersistent() {
    let selectedPrompt: string
    const setting =  await readPromptSetting()
    selectedPrompt = setting.cppSelectedPromptID
    setSelectedPrompt(selectedPrompt)

    const list = await readPromptList()
    const filteredOptions = Object.values(list).filter(prompt => prompt.showOnToolbar || prompt.id == selectedPrompt).sort(sortBytimeCreated).map(prompt => {return {value: prompt.id, label: prompt.name}})
    filteredOptions.unshift({value: "default", label: "Default"})
    setOptions(filteredOptions)
  }

  useEffect(() => {
    readPersistent()
  }, [isDialogOpen])

  function onChangePrompt(e: any) {
    setSelectedPrompt(e.target.value)
    persistPromptSetting({cppSelectedPromptID: e.target.value})
  }

  //Check if this dialog is currently shown, currently only checks whether the root's display is none. 
  //Unnecessary re-rendering would happen if multiple dialogs are being created.
  useEffect(() => {
    const dialogRoot = document.querySelector<HTMLDivElement>("#cpp-dialog-root")
    if (!dialogRoot) return

    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          setDialogOpen(dialogRoot.style.display !== "none")
        }
      }
    })
    observer.observe(dialogRoot, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Dropdown value={ selectedPrompt } onChange={ onChangePrompt } options={ options } className="py-1 mx-2 text-ellipsis" style={{ width: "10rem" }} /> 
  )
}

function LanguageDropdown() {
  const [language, setLanguage] = useState<string>(defaultUserConfig.cppLanguage)
  const [languageEnabled, setLanguageEnabled] = useState<boolean>(defaultUserConfig.cppLanguageEnabled)

  const options: { value: string, label: string }[] = []
  languages_list.forEach(v => {
    options.push({value: v, label: v})
  })

  useEffect(() => {
    getUserConfig().then((userConfig) => {
      setLanguage(userConfig.cppLanguage)
      setLanguageEnabled(userConfig.cppLanguageEnabled)
    })
  }, [])

  function onChangeLanguage(e: any) {
    setLanguage(e.target.value)
    saveUserConfig({cppLanguage: e.target.value})
  }

  function onChangeLanguageEnabled(e: any) {
    setLanguageEnabled(e.target.checked)
    saveUserConfig({cppLanguageEnabled: e.target.checked})
  }

  return (
  <SettingBox propertyName='language' toggleState={{ value: languageEnabled, setValue: setLanguageEnabled }} bodyState={{ value: language, setValue: setLanguage }}>
    <div className="flex w-full text-sm" style="width: 20em">
      <InputBox type="checkbox" context={{ value: languageEnabled, setValue: setLanguageEnabled }} inputClassName="ml-2" labelText="Enabled" onChange={ onChangeLanguageEnabled } />
      <Dropdown value={ language } onChange={ onChangeLanguage } options={ options } className="py-1 mx-2 text-ellipsis" style={{ width: "10rem" }} disabled={ !languageEnabled } />
    </div>
  </SettingBox>
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
  const [presencePenalty, setPresencePenalty] = useState<number>(defaultUserConfig.cppPresencePenalty)
  const [presencePenaltyEnabled, setPresencePenaltyEnabled] = useState<boolean>(defaultUserConfig.cppPresencePenaltyEnabled)
  const [frequencyPenalty, setFrequencyPenalty] = useState<number>(defaultUserConfig.cppFrequencyPenalty)
  const [frequencyPenaltyEnabled, setFrequencyPenaltyEnabled] = useState<boolean>(defaultUserConfig.cppFrequencyPenaltyEnabled)

  useEffect(() => {
    getUserConfig().then((userConfig) => {
      setTemperature(userConfig.cppTemperature)
      setTemperatureEnabled(userConfig.cppTemperatureEnabled)
      setMaxTokens(userConfig.cppMaxTokens)
      setMaxTokensEnabled(userConfig.cppMaxTokensEnabled)
      setPresencePenalty(userConfig.cppPresencePenalty)
      setPresencePenaltyEnabled(userConfig.cppPresencePenaltyEnabled)
      setFrequencyPenalty(userConfig.cppFrequencyPenalty)
      setFrequencyPenaltyEnabled(userConfig.cppFrequencyPenaltyEnabled)
    })
  }, [])
  useEffect(() => {
    saveUserConfig({ 
      cppTemperature: temperature, 
      cppTemperatureEnabled: temperatureEnabled,
      cppMaxTokens: maxTokens,
      cppMaxTokensEnabled: maxTokensEnabled,
      cppPresencePenalty: presencePenalty,
      cppPresencePenaltyEnabled: presencePenaltyEnabled,
      cppFrequencyPenalty: frequencyPenalty,
      cppFrequencyPenaltyEnabled: frequencyPenaltyEnabled,
    })
  }, [temperature, temperatureEnabled, maxTokens, maxTokensEnabled, presencePenalty, presencePenaltyEnabled, frequencyPenalty, frequencyPenaltyEnabled])

  const defaultClass = `absolute ${getBoxClassName()} py-3 pl-2 cpp-toolbar`
  const className = `${props?.className ? props.className : ""} ${defaultClass}`
  const defaultStyle = { display: isShow.bool ? "flex" : "none", flexWrap: 'wrap' }
  const style = Object.assign({}, defaultStyle, props?.style)

  return (
  <div style={ style } className={ className }>
    <SliderSelection 
      propertyName="temperature" 
      description="Controls the randomness or creativity of the generated text. The higher value will make the model generate more diverse and creative. The lower will generate more focused and conservative text."
      bodyState={{ value: temperature, setValue: setTemperature }}
      toggleState={{ value: temperatureEnabled, setValue: setTemperatureEnabled }}
      widthInEm={ 2 }
      min={ 0 }
      max={ 2 }
      inputStep={ 0.01 }
      sliderStep={ 0.05 }
      tickLabels={["Precise", "Balanced", "Creative"]}
    />

    <SliderSelection 
      propertyName="max_tokens" 
      description="The maximum number of tokens that the model can handle in a single input-output sequence. Note that this limit includes both input and output tokens. So very long inputs might lead to incomplete or cut-off outputs due to the token limit constraint."
      bodyState={{ value: maxTokens, setValue: setMaxTokens }}
      toggleState={{ value: maxTokensEnabled, setValue: setMaxTokensEnabled }}
      widthInEm={ 3 }
      min={ 1 }
      max={ 4096 }
      inputStep={ 1 }
      sliderStep={ 1 }
      tickLabels={["1", "4096"]}
    />

    <div className="flex" style="flex-basis: 31%">
      <DescriptionBox 
        description="Prompt is a piece of text or input provided to the model to guide its response or output. Well-crafted prompt can generate answer more clear, relevant, efficient. ChatGPT++ offers the access to well-known prompts repositry, Awesome ChatGPT Prompts."
      />
      <PropertyLabel title="prompt" />
      <PromptDropdown />
      <CppDialog 
        buttonText={<div className="text-gray-300 hover:text-white"><svg.modification/></div>} 
        namespace="prompt-edit"
        width={ '56rem' }
        title="Edit prompts">
        <PromptEdit ContainerStyle={{ height: '30rem' }}/>
      </CppDialog>
    </div>

    <SliderSelection 
      propertyName="presence_penalty" 
      description="{{{Add description here}}}"
      bodyState={{ value: presencePenalty, setValue: setPresencePenalty }}
      toggleState={{ value: presencePenaltyEnabled, setValue: setPresencePenaltyEnabled }}
      widthInEm={ 2 }
      min={ -2.0 }
      max={ 2.0 }
      inputStep={ 0.01 }
      sliderStep={ 0.1 }
      tickLabels={["-2.0", "0.0", "2.0"]}
    />

    <SliderSelection 
      propertyName="frequency_penalty" 
      description="{{{Add description here}}}"
      bodyState={{ value: frequencyPenalty, setValue: setFrequencyPenalty }}
      toggleState={{ value: frequencyPenaltyEnabled, setValue: setFrequencyPenaltyEnabled }}
      widthInEm={ 2 }
      min={ -2.0 }
      max={ 2.0 }
      inputStep={ 0.01 }
      sliderStep={ 0.1 }
      tickLabels={["-2.0", "0.0", "2.0"]}
    />

    <div className="flex" style="flex-basis: 31%">
      <DescriptionBox 
        description="{{{Add description here}}}"
      />
      <PropertyLabel title="language"/>
      <LanguageDropdown />
    </div>
    
    {isDev() && <button onClick={ () => testRemoveSyncedStorage("cppPrompt") }>reset cppPrompt</button>}
  </div>
  )
}