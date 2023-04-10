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

  return (
  <div className="flex">
    <input type='button' value={ promptName } title={ promptBody } />
    <input type='button' value="🗑️" title="Delete this prompt" />
    <input type='button' value={ props.prompt.showOnToolbar ? "✔️" : "🗙"} title="Toggle visibility on toolbar" />
  </div>
  )
}

function PromptList() {
  const [selectedPrompt, setSelectedPromptID] = useState<string>(defaultPromptSetting.cppSelectedPromptID)
  const [promptList, setPromptList] = useState<PromptList>({ default: defaultPrompt })

  return (
  <div>
    <div className="overflow-auto">
      {Object.entries(promptList).map(([key, prompt]) => {
        <PromptBox key={ key } prompt={ prompt } />
      })}
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