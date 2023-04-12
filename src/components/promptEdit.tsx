import { useEffect, useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"
import { defaultPromptSetting, defaultPrompt, PromptList, Prompt, getPromptTemplate, persistPrompt, persistPromptList, readPromptList, destroyPrompt,  } from "../managers/prompt"
import { svg } from "../utils/ui"

interface PromptBoxProps { 
  prompt: Prompt
  selected: boolean
  onClick: (event: MouseEvent, id: string) => void
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
  <div className="flex flex-col gap-2 text-gray-100 text-sm">
    <a className={ isSelected ?
      "flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 bg-gray-800 hover:bg-gray-800 group" :
      "flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] pr-14 cursor-pointer break-all group"
      } title={ prompt.body } onClick={ (event) => props.onClick(event, prompt.id) }>
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

  function onClickPrompt(_: MouseEvent, id: string) {
    setSelectedPromptID(id)
  }

  return (
  <nav className="flex h-full flex-col space-y-1 p-2" style={{ width: "16rem" }}>
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

interface PromptFormProps { 
  prompt: Prompt
}

function PromptForm() {
  const containerWidthInPx = 640

  return (
  <>
    <div className="relative h-full w-full transition-width flex flex-col items-stretch flex-1">
      <div className="flex overflow-y-auto overscroll-none h-full flex-col items-center text-sm dark:bg-gray-800" style={{ width: `${containerWidthInPx}px` }}>
        <div className="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800">
          <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto justify-center">
            <div className="relative flex" style={{ width: `${containerWidthInPx - 95}px` }}>
              <div className="flex items-center justify-center" style="width: 100px">
                <span>Prompt name</span>
              </div>
              <input type="text" placeholder="Enter a prompt name"
                class="w-full rounded-md dark:bg-gray-800 dark:focus:border-white dark:focus:ring-white"
                style={{ height: "44px", width: `${containerWidthInPx - 220}px` }} tabIndex={1}/>
            </div>
          </div>
        </div>
        <div className="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#444654]">
          <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto justify-center">
            <div className="relative flex flex-col gap-1 md:gap-3" style={{ width: `${containerWidthInPx - 95}px` }}>
              <span>Prompt :</span>
              <textarea placeholder="Enter a instruction"
                class="w-full rounded-md dark:bg-gray-800 dark:focus:border-white dark:focus:ring-white"
                style="height: 96px; overflow-y: hidden;" tabIndex={2}/>
            </div>
          </div>
        </div>
        <div className="w-full flex-shrink-0" style="height: 4rem"/>
      </div>
      <div className="absolute w-full bottom-0 left-0" style="height: 4rem">Button Area</div>
    </div>
  </>
  )
}

interface PromptEditProps {
  ContainerStyle?: JSX.CSSProperties
  ContainerClassName?: string
}
export default function PromptEdit(props: PromptEditProps) {
  const defaultClassName = "flex overflow-hidden relative"
  const ContainerClassName = `${defaultClassName} ${props.ContainerClassName ? props.ContainerClassName : ""}`
  const defaultContainerStyle = {}
  const ContainerStyle = Object.assign({}, defaultContainerStyle, props.ContainerStyle? props.ContainerStyle : {})

  return( 
    <div className={ ContainerClassName } style={ ContainerStyle }>
      <div className="relative flex h-full max-w-full">
        <PromptList />
        <PromptForm />
      </div>
    </div>
  )
}