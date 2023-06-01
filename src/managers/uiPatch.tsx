import { render } from 'preact'
import svg from '../assets/svg'
import ToggleButton from '../components/base/toggleButton'
import Toolbar from '../components/toolbar'
import { BooleanProvider } from '../hooks/booleanContext'
import { readPromptSetting } from '../managers/prompt'
import { readPrompt } from '../managers/prompt'
import { resolvePattern } from '../managers/prompt'

async function applyPrompt(textarea: HTMLTextAreaElement) {
  const message = textarea.value
  if (!message.trim()) return

  const promptSetting = await readPromptSetting()
  const selected = promptSetting.cppSelectedPromptID
  const prompt = await readPrompt(selected)
  if (!prompt) return //TODO: handle as error

  const resolvedPattern = await resolvePattern(prompt, message)
  textarea.value = resolvedPattern
}

export async function patch() {
  console.debug("chatgpt++ patch")

  const chatgptTextarea = document.querySelector<HTMLTextAreaElement>('div#__next textarea')
  const chatgptSubmit = chatgptTextarea?.parentNode?.querySelector<HTMLButtonElement>('button')
  const chatgptForm = document.querySelector<HTMLFormElement>('form')
  const chatgptFormHolder = chatgptForm?.parentElement as HTMLDivElement
  const inputContainer = chatgptTextarea?.parentElement as HTMLDivElement
  if (!chatgptTextarea || !chatgptSubmit || !inputContainer || !chatgptForm || !chatgptFormHolder ) {
    console.error("Chatgpt++ patch failed. Some of elements doesn't exist")
    return
  }

  chatgptTextarea.classList.add("chatgpt-textarea")
  chatgptTextarea.style.paddingRight = "4.5rem"
  chatgptSubmit.classList.add("chatgpt-submit")
  
  function submit() {
    if (!chatgptTextarea || !chatgptTextarea.value.trim()) return
    
    chatgptTextarea.focus()
    const e = new KeyboardEvent('keydown', {
      key: 'Enter', 
      code: 'Enter', 
      ctrlKey: true,
      bubbles: true
    })
    chatgptTextarea.dispatchEvent(e)
  }
  
  chatgptTextarea.addEventListener("keydown", async function(e) {
    if(e.key !== 'Enter' || e.shiftKey || e.ctrlKey) return
    e.preventDefault()
    e.stopImmediatePropagation()
    await applyPrompt(chatgptTextarea)
    submit()
  }, {capture: true})
  
  chatgptSubmit.addEventListener("click", async function(e) {
    e.stopImmediatePropagation()
    await applyPrompt(chatgptTextarea)
    submit()
  }, {capture: true})
  
  const toolbarButtonWidth = 28
  const toolbarROffset = 46
  const buttonContainer = document.createElement('div')
  function positionToolbarButton(buttonContainer: HTMLDivElement) {
    //I had to move this button outside of the form and hack the position related to textarea's size and location. 
    //Because the event for submitting the message is bound to all descendants of the form, not to the direct child, currently.
    if (!chatgptForm) return
    
    const formRect = chatgptForm.getBoundingClientRect()
    const buttonXPos = formRect.right - toolbarButtonWidth - toolbarROffset
    buttonContainer.style.width = `${toolbarButtonWidth}px`
    buttonContainer.style.left = `${buttonXPos}px`
  }

  chatgptFormHolder.appendChild(buttonContainer) 
  positionToolbarButton(buttonContainer)
  window.addEventListener("resize", (_) => positionToolbarButton(buttonContainer))
  buttonContainer.classList.value = "flex fixed text-gray-500 items-center"
  buttonContainer.style.bottom = 68 + 'px'

  const toolbarWidth = window.getComputedStyle(inputContainer).width
  const toolbarLeft = -Number(toolbarWidth.replace("px", "")) + toolbarButtonWidth + toolbarROffset + "px"
  const toolbarButton = (
  <BooleanProvider>
    <Toolbar style={{ top: '-14px', width: toolbarWidth, left: toolbarLeft, transform: "translate(0, -100%)" }} />
    <ToggleButton innerText={ <svg.settings/> } style={{ width: toolbarButtonWidth+"px", height: "24px", fontSize: "10pt" }} className={ "cpp-toolbar-button" } />
  </BooleanProvider>
  )
  render(toolbarButton, buttonContainer) 
}