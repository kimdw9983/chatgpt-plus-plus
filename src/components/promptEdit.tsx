import { useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"
import { defaultPromptSetting, defaultPrompt, PromptList, Prompt } from "../managers/prompt"

interface PromptEditProps {
  ContainerStyle?: JSX.CSSProperties
  ContainerClassName?: string
}

function PromptBox(props: { prompt: Prompt }) {
  const promptName = props.prompt.name
  const promptBody = props.prompt.body
  const isDefault = props.prompt.id === "default"

  return (
  <div className="flex flex-col gap-2 text-gray-100 text-sm">
    <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group" title={ promptBody }>
      { promptName }
    </a>
    { !isDefault && <input type='button' value="🗑️" title="Delete this prompt" /> }
    { !isDefault && <input type='button' value={ props.prompt.showOnToolbar ? "✅" : "🗙"} title="Toggle visibility on toolbar" /> }
  </div>
  )
}

function PromptList() {
  const [selectedPrompt, setSelectedPromptID] = useState<string>(defaultPromptSetting.cppSelectedPromptID)
  const [promptList, setPromptList] = useState<PromptList>({ default: defaultPrompt })

  return (
  <div>
    <div className="flex-col flex-1 overflow-y-auto border-b border-white/20 -mr-2">
      {Object.entries(promptList).map(([key, prompt]) => 
        <PromptBox key={ key } prompt={ prompt } />
      )}
    </div>
  </div>
  )
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