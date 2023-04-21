import { render } from 'preact'
import { BooleanProvider } from '../hooks/booleanContext'
import svg from '../assets/svg'
import ToggleButton from '../components/base/toggleButton'
import Toolbar from '../components/toolbar'
import { readPromptSetting } from '../managers/prompt'
import { readPrompt } from '../managers/prompt'
import { resolvePattern } from '../managers/prompt'

const toolbarButtonRight = 38
const toolbarButtonWidth = 28
function getToolbarWidth(inputContainer: HTMLElement) {
  return window.getComputedStyle(inputContainer).width
}
function calculateToolbarPosition(inputContainer: HTMLElement): string {
  return -Number(getToolbarWidth(inputContainer).replace("px", "")) + toolbarButtonWidth + 38 + "px"
}

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

function submit(textarea: HTMLTextAreaElement) {
  if (!textarea.value.trim()) return

  textarea.focus()
  const e = new KeyboardEvent('keydown', {
    key: 'Enter', 
    code: 'Enter', 
    ctrlKey: true,
    bubbles: true
  })
  textarea.dispatchEvent(e)
}

async function patch() {
  const chatgptTextarea = document.querySelector('div#__next textarea') as HTMLTextAreaElement
  const chatgptSubmit = chatgptTextarea?.parentNode?.querySelector('button') as HTMLButtonElement
  const chatgptForm = chatgptTextarea?.parentElement?.parentElement?.parentElement as HTMLFormElement
  const chatgptFormHolder = chatgptForm?.parentElement as HTMLDivElement
  const inputContainer = chatgptTextarea?.parentElement as HTMLDivElement
  if (!chatgptTextarea || !chatgptSubmit || !inputContainer || !chatgptForm || !chatgptFormHolder ) return

  chatgptTextarea.classList.add("chatgpt-textarea")
  chatgptSubmit.classList.add("chatgpt-submit")

  chatgptTextarea.addEventListener("keydown", async function(e) {
    if(e.key !== 'Enter' || e.shiftKey || e.ctrlKey) return
    e.stopImmediatePropagation()
    await applyPrompt(chatgptTextarea)
    submit(chatgptTextarea)
  }, {capture: true})
  chatgptSubmit.addEventListener("click", async function(e) {
    e.stopImmediatePropagation()
    await applyPrompt(chatgptTextarea)
    submit(chatgptTextarea)
  }, {capture: true})

  const buttonContainer = document.createElement('div')
  function positionToolbarButton(buttonContainer: HTMLDivElement, e?:any) {
    //I had to move this button outside of the form and hack the position related to textarea's size and location. 
    //Because the event for submitting the message is bound to all descendants of the form, not the direct child, currently.
    const formRect = chatgptForm.getBoundingClientRect()
    const buttonXPos = formRect.right - toolbarButtonWidth - 38
    buttonContainer.style.width = `${toolbarButtonWidth}px`
    buttonContainer.style.left = `${buttonXPos}px`
    console.log("resize", formRect, toolbarButtonWidth, buttonXPos)
  }
  chatgptFormHolder.appendChild(buttonContainer) 
  positionToolbarButton(buttonContainer)
  window.addEventListener("resize", (e) => positionToolbarButton(buttonContainer))
  
  buttonContainer.classList.value = "flex fixed text-gray-500 items-center"
  buttonContainer.style.right = 486 + 'px'
  buttonContainer.style.bottom = 63 + 'px'

  const toolbarWidth = getToolbarWidth(inputContainer)
  const toolbarLeft = calculateToolbarPosition(inputContainer)
  const toolbarButton = (
  <BooleanProvider>
    <Toolbar style={{ top: '-14px', width: toolbarWidth, left: toolbarLeft, transform: "translate(0, -100%)" }} />
    <ToggleButton innerText={ <svg.settings/> } style={{ width: toolbarButtonWidth+"px", height: "24px", fontSize: "10pt" }} className={ "cpp-toolbar-button" } />
  </BooleanProvider>
  )
  render(toolbarButton, buttonContainer) 
}

window.onload = function() {
  //TODO: improve this to wait until chilren are loaded
  const chatgptRoot = document.querySelector('div#__next')
  if(!chatgptRoot) return

  patch()
  new MutationObserver(() => { patch() }).observe(chatgptRoot, { childList: true }) 
}