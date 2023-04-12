import { useEffect, useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"
import { defaultPromptSetting, defaultPrompt, PromptList, Prompt, getPromptTemplate, persistPrompt, persistPromptList, readPromptList, destroyPrompt,  } from "../managers/prompt"
import { svg } from "../utils/ui"

interface PromptBoxProps { 
  prompt: Prompt
  selected: boolean
  onClick: (id: string) => void
  onDelete: (id: string) => void 
}

function PromptBox(props: PromptBoxProps) {
  const [prompt, setPrompt] = useState<Prompt>(props.prompt)
  const isDefault = prompt.id === "default"
  const isSelected = props.selected
 
  function toggleVisibility() {
    const updatedPrompt = {
      ...prompt,
      showOnToolbar: !prompt.showOnToolbar
    }
    setPrompt(updatedPrompt)
    persistPrompt(updatedPrompt)
  }

  function deletePrompt() {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      props.onDelete(prompt.id)
    }
  }

  return (
  <div className="flex flex-col gap-2 text-gray-100 text-sm" style={{ width: "16rem" }}>
    <a className={ isSelected ?
      "flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 bg-gray-800 hover:bg-gray-800 group" :
      "flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] pr-14 cursor-pointer break-all group"
      } title={ prompt.body }>
      <svg.instruction />
      <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative" style={{ zIndex: 520 }}>
        { prompt.name }
        {/* ChatGPT's fading-out styling instead of ellipsising-out */}
        <div className={ isSelected ? 
          "absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-800" : 
          "absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"
          } style={{ zIndex: 525 }}/> 
      </div>
      {!isDefault && (
        <div className="absolute flex right-1 text-gray-300" style={{ zIndex: 530 }}>
          <button title="Toggle visibility on toolbar" className="hover:text-white p-1" onClick={ toggleVisibility }>
            { prompt.showOnToolbar ? <svg.visible /> : <svg.invisible /> }
          </button>
          <button title="Delete this prompt" className="hover:text-white p-1" onClick={ deletePrompt }>
            <svg.trashcan />
          </button>
        </div>
      )}
    </a>
  </div>
  )
}

function PromptList() {
  const [selectedPrompt, setSelectedPromptID] = useState<string>(defaultPromptSetting.cppSelectedPromptID)
  const [promptList, setPromptList] = useState<PromptList>({ default: defaultPrompt })

  useEffect(() => {
    readPromptList().then((list) => {
      if (Object.keys(list).length === 0) return
      setPromptList(list)
    })
  }, [])

  function newPrompt() {
    const template = getPromptTemplate()
    const id = template.id
    const updatedPromptList = {
      ...promptList,
      [id]: template,
    }
    setPromptList(updatedPromptList)
    persistPromptList(updatedPromptList)
    setSelectedPromptID(id)
  }

  async function onDeletPrompt(id: string) {
    const record = await destroyPrompt(id)
    setPromptList(record)
  }

  function sortBytimeCreated(a: Prompt, b: Prompt) {
    const defaultComesFirst = -1
    return (new Date(a.timecreated).getTime() || defaultComesFirst) - (new Date(b.timecreated).getTime() || defaultComesFirst)
  }

  function onClickPrompt(id: string) {
    setSelectedPromptID(id)
  }

  return (
  <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
    <div className="flex-col flex-1 overflow-y-auto overscroll-none border-b border-white/20 h-full">
      {Object.values(promptList).sort(sortBytimeCreated).map(prompt => 
        <PromptBox key={ prompt.id } prompt={ prompt } selected={ prompt.id === selectedPrompt } onClick={ onClickPrompt } onDelete={ onDeletPrompt } />
      )}
    </div>
    <a 
      onClick = { newPrompt }
      className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20">
      <svg.plusMark />
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
  const defaultClassName = ""
  const ContainerClassName = `${defaultClassName} ${props.ContainerClassName ? props.ContainerClassName : ""}`
  const ContainerStyle = props.ContainerStyle? props.ContainerStyle : {}

  return( 
    <div className={ ContainerClassName } style={ ContainerStyle }>
      <PromptList />
    </div>
  )
}