import { useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"
import { defaultPromptSetting, defaultPrompt, PromptList, Prompt, getPromptTemplate,  } from "../managers/prompt"

function PromptBox(props: { prompt: Prompt, selected: boolean }) {
  const promptName = props.prompt.name
  const promptBody = props.prompt.body
  const isDefault = props.prompt.id === "default"

  return (
  <div className="flex flex-col gap-2 text-gray-100 text-sm" style={{width: "12.5rem"}}>
    <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group" title={ promptBody }>
      {/* <svg /> */}
      <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
        { promptName }
        <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"/>
        {!isDefault && (
          <div className="absolute flex right-1 z-10 text-gray-300 visible">
            <input type='button' value="🗑️" title="Delete this prompt" className="hover:text-white" />
            <input type='button' value={ props.prompt.showOnToolbar ? "✅" : "🗙"} title="Toggle visibility on toolbar" className="hover:text-white" />
          </div>
        )}
      </div>
    </a>
  </div>
  )
}

function PromptList() {
  const [selectedPrompt, setSelectedPromptID] = useState<string>(defaultPromptSetting.cppSelectedPromptID)
  const [promptList, setPromptList] = useState<PromptList>({ default: defaultPrompt })

  function onNewPrompt() {
    //TODO: save prompt permenant
    const template = getPromptTemplate()
    const id = template.id

    const updatedPromptList = {
      ...promptList,
      [id]: template,
    }
  
    setPromptList(updatedPromptList)
    console.log(updatedPromptList, "new Prompt")
  }

  return (
  <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
    <div className="flex-col flex-1 overflow-y-auto overscroll-none border-b border-white/20 -mr-2 h-full">
      {Object.entries(promptList).map(([key, prompt]) => 
        <PromptBox key={ key } prompt={ prompt } selected={ false } />
      )}
    </div>
    <a 
      onClick = { onNewPrompt }
      className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20">
      New prompt
    </a>
  </nav>
  )
}

interface PromptEditProps {
  ContainerStyle?: JSX.CSSProperties
  ContainerClassName?: string
}
export default function PromptEdit(props: PromptEditProps) {
  const ContainerClassName = `${props.ContainerClassName ? props.ContainerClassName : ""}`
  const ContainerStyle = props.ContainerStyle? props.ContainerStyle : {}

  return( 
    <div className={ ContainerClassName } style={ ContainerStyle }>
      <PromptList />
    </div>
  )
}