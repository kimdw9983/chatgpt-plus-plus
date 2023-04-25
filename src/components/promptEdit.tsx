import { StateUpdater, useEffect, useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"
import svg from "../assets/svg"
import { defaultPromptSetting, defaultPrompt, PromptList, Prompt, getPromptTemplate, persistPrompt, persistPromptList, readPromptList, destroyPrompt, resolvePattern, sortBytimeCreated, readPromptSetting, persistPromptSetting, keywords, } from "../managers/prompt"
import { defaultFontFamily } from "../utils/ui"

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

  useEffect(() => {
    setPrompt(props.prompt)
  }, [props.prompt])

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
      <div class="text-white">
        <svg.instruction />
      </div>
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

interface PromptListProps { 
  selectedPrompt: string
  setSelectedPrompt: StateUpdater<string>
  promptList: PromptList
  setPromptList: StateUpdater<PromptList>
}
function PromptList(props: PromptListProps) {
  const selectedPrompt = props.selectedPrompt
  const setSelectedPrompt = props.setSelectedPrompt
  const promptList = props.promptList
  const setPromptList = props.setPromptList

  useEffect(() => {
    persistPromptSetting({cppSelectedPromptID: selectedPrompt})
  }, [selectedPrompt])

  function newPrompt() {
    const template = getPromptTemplate()
    const id = template.id
    const updatedPromptList = {
      ...promptList,
      [id]: template,
    }
    setPromptList(updatedPromptList)
    persistPromptList(updatedPromptList)
    setSelectedPrompt(id)
  }

  async function onDeletePrompt(id: string) {
    const record = await destroyPrompt(id)
    setSelectedPrompt("default")
    setPromptList(record)
  }

  function onClickPrompt(_: MouseEvent, id: string) {
    setSelectedPrompt(id)
  }

  return (
  <nav className="flex h-full flex-col space-y-1 p-2 bg-gray-900" style={{ width: "16rem" }}>
    <div className="flex-col flex-1 overflow-y-auto overscroll-none border-b border-white/20 h-full">
      <PromptBox key="default" prompt={ defaultPrompt } selected={ selectedPrompt === "default" } onClick={ onClickPrompt } onDelete={ onDeletePrompt }/>
      {Object.values(promptList).sort(sortBytimeCreated).filter(prompt => prompt.id != "default").map(prompt => 
        <PromptBox key={ prompt.id } prompt={ prompt } selected={ prompt.id === selectedPrompt } onClick={ onClickPrompt } onDelete={ onDeletePrompt } />
      )}
    </div>
    <a 
      onClick = { newPrompt }
      className="flex mt-2 py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20">
      <svg.plusMark />
      New prompt
    </a>
  </nav>
  )
}

interface PromptFormProps { 
  selectedPrompt: string 
  promptList: PromptList
  setPromptList: StateUpdater<PromptList>
  isDialogOpen: boolean
}
function PromptForm(props: PromptFormProps) {
  const [isDefault, setIsDefault] = useState<boolean>(false)
  const [name, setName] = useState<string>(defaultPrompt.name)
  const [body, setBody] = useState<string>(defaultPrompt.body)
  const [pattern, setPattern] = useState<string>(defaultPrompt.pattern)
  const [advanced, setAdvanced] = useState<boolean>(false)
  const [resolvedPattern, setResolvedPattern] = useState<string>("")

  document.querySelector<HTMLDivElement>("#cpp-dialog-root")?.style.display == "none"

  useEffect(() => {
    async function updatePrompt() {
      const prompt = props.selectedPrompt != "default" ? props.promptList[props.selectedPrompt] : defaultPrompt
      setName(prompt.name)
      setBody(prompt.body)
      setPattern(prompt.pattern)
      setIsDefault(prompt.id === "default")
      setResolvedPattern(await resolvePattern(prompt))
    }
    updatePrompt()
  }, [props.selectedPrompt, props.promptList, props.isDialogOpen])

  function persist(prompt: Prompt) {
    const updatedPromptList = {
      ...props.promptList,
      [prompt.id]: prompt,
    }

    persistPromptList(updatedPromptList)
    props.setPromptList(updatedPromptList)
  }

  function autoSave(e: any, key: string) {
    if (!e.target) return
    const updatedPrompt = {
      ...props.promptList[props.selectedPrompt],
      [key]: e.target.value
    }

    persist(updatedPrompt)
  }

  async function updateBody(e: any) {
    const body = e.target.value
    setBody(body)
    
    const promptDirty = {
      ...props.promptList[props.selectedPrompt],
      body: body
    }
    setResolvedPattern(await resolvePattern(promptDirty))
  }

  async function updatePattern(e: any) {
    const pattern = e.target.value
    setPattern(pattern)

    const promptDirty = {
      ...props.promptList[props.selectedPrompt],
      pattern: pattern
    }
    setResolvedPattern(await resolvePattern(promptDirty))
  }

  async function resetPattern() {
    const updatedPrompt = {
      ...props.promptList[props.selectedPrompt],
      pattern: defaultPrompt.pattern
    }

    setPattern(defaultPrompt.pattern)
    setResolvedPattern(await resolvePattern(updatedPrompt))
    persist(updatedPrompt)
  }

  function toggleAdvanced() {
    setAdvanced(!advanced)
  }

  const containerWidthInPx = 640
  const splittedResolved = resolvedPattern.split(keywords.message)
  return (
  <>
    <div className="relative h-full w-full transition-width flex flex-col items-stretch flex-1">
      <div className="flex overflow-y-auto overscroll-none h-full flex-col items-center text-sm dark:bg-gray-800" style={{ width: `${containerWidthInPx}px` }}>
        <div className="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800">
          <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto justify-center">
            <div className="relative flex" style={{ width: `${containerWidthInPx - 95}px` }}>
              <div className="flex items-center justify-center mr-2" style="width: 100px">
                <span>Prompt name</span>
              </div>
              <input type="text" placeholder={ isDefault ? "Default prompt" : "Enter a prompt name" }
                class="w-full rounded-md dark:bg-gray-800 dark:focus:border-white dark:focus:ring-white"
                style={{ height: "44px", width: `${containerWidthInPx - 220}px` }} 
                tabIndex={ 1 }
                disabled={ isDefault }
                value={ name }
                onBlur={ (event) => autoSave(event, "name") } />
            </div>
          </div>
        </div>
        <div className="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#444654]">
          <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto justify-center">
            <div className="relative flex flex-col" style={{ width: `${containerWidthInPx - 95}px` }}>
              <div className="flex items-center">
                <svg.instruction />
                <span className="ml-2">Prompt</span>
              </div>
              <textarea placeholder= { isDefault ? "Default has no instruction" : "Enter an instruction" }
                class="w-full rounded-md dark:bg-gray-800 dark:focus:border-white dark:focus:ring-white text-sm disabled:text-gray-300 disabled:italic"
                style={{ height: "96px", overflowY: "hidden", fontStyle: isDefault ? "italic" : "normal" }}
                tabIndex={ 2 }
                disabled={ isDefault } 
                value={ body }
                onInput={ updateBody }
                onBlur={ (event) => autoSave(event, "body") } />
              <button className="relative " onClick= { toggleAdvanced }>
                <div className="flex absolute justify-center items-center right-0">
                  { advanced ? <svg.arrowUp /> : <svg.arrowDown /> }
                  <span className="text-gray-300 hover:text-white">Advnaced prompt</span>
                </div>
              </button>

              { advanced && <> 
              {/*TODO: add transition*/} 
              <div className="mt-6" />
              <div className="flex items-center">
                <svg.gears />
                <span className="ml-2">Pattern</span>
              </div>
              <textarea placeholder= { isDefault ? "(Default prompt is empty)" : "You can restore the default pattern by the button below." }
                class="w-full rounded-md dark:bg-gray-800 dark:focus:border-white dark:focus:ring-white text-sm disabled:text-gray-300 disabled:italic"
                style={{ height: "112px", overflowY: "auto", fontStyle: isDefault ? "italic" : "normal", whiteSpace: "nowrap" }}
                tabIndex={ 3 }
                disabled={ isDefault } 
                value={ pattern }
                onInput={ updatePattern }
                onBlur={ (event) => autoSave(event, "pattern") } />
              {!isDefault && (
              <button className="p-1" disabled={ isDefault } onClick={ resetPattern }>
                <div className="flex w-full items-center justify-center text-sm">
                  <svg.restore/>
                  <span className="pl-1">set to default</span>
                </div>
              </button>
              )}
              <div className="flex items-center mt-2">
                <svg.preview/>
                <span className="ml-2">Preview</span>
              </div>
              <div className="p-1 border-b border-black/10 dark:border-gray-900/50 dark:focus:ring-white rounded-md dark:bg-gray-800">
                <pre className="text-sm text-gray-300" style={{ height: "136px", overflow: "auto", whiteSpace: "pre-wrap", resize: "vertical"}} >
                  {
                    splittedResolved.map((str, i) => (
                    <>
                      <span style={{fontFamily: defaultFontFamily}}>{str}</span>
                      {i < splittedResolved.length - 1 && (
                        <span style={{fontStyle: "italic", textDecoration: "underline"}}>Your message on chat</span>
                      )}
                    </>
                    ))
                  }
                </pre>
              </div>
              </>}
            </div>
          </div>
        </div>
        <div className="w-full flex-shrink-0" style="height: 4rem"/>
      </div>
      <div className="absolute w-full bottom-0 left-0 dark:bg-gray-800" style="height: 4rem">
        <div className="flex w-full h-full items-center">
          <a class="btn relative btn-neutral ml-2" href="https://prompts.chat/" target="_blank" rel="noopener noreferrer">
            <svg.community />
            <div class="flex w-full items-center justify-center gap-2">Community prompts</div>
          </a>
          {/* <button class="btn relative btn-neutral ml-auto mr-2" style="width: 6rem">
            <div class="flex w-full items-center justify-center gap-2">Close</div>
          </button> */}
        </div>
      </div>
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

  const [selectedPrompt, setSelectedPrompt] = useState<string>(defaultPromptSetting.cppSelectedPromptID)
  const [promptList, setPromptList] = useState<PromptList>({ default: defaultPrompt })
  const [isDialogOpen, setDialogOpen] = useState<boolean>(true)

  function updateSetting() {
    readPromptSetting().then((setting) => {
      setSelectedPrompt(setting.cppSelectedPromptID)
    })
  }
  
  useEffect(() => {
    readPromptList().then((list) => {
      if (Object.keys(list).length === 0) return
      setPromptList(list)
    })
    updateSetting()

    //Check if this dialog is currently shown, currently only checks whether the root's display is none. 
    //Unnecessary re-rendering would happen if multiple dialogs are being created.
    const dialogRoot = document.querySelector<HTMLDivElement>("#cpp-dialog-root")
    let observer: MutationObserver
    if (dialogRoot) {
      observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            setDialogOpen(dialogRoot.style.display !== "none")
          }
        }
      })
      observer.observe(dialogRoot, { attributes: true })
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    updateSetting()
  }, [isDialogOpen])

  return( 
    <div className={ ContainerClassName } style={ ContainerStyle }>
      <div className="relative flex h-full max-w-full">
        <PromptList selectedPrompt={ selectedPrompt } setSelectedPrompt={ setSelectedPrompt } promptList={ promptList } setPromptList={ setPromptList }/>
        <PromptForm selectedPrompt={ selectedPrompt } promptList={ promptList } setPromptList={ setPromptList } isDialogOpen={ isDialogOpen } />
      </div>
    </div>
  )
}