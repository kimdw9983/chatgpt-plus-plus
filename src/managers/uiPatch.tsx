import { render } from 'preact'
import svg from '../assets/svg'
import ToggleButton from '../components/base/toggleButton'
import Toolbar from '../components/toolbar'
import { BooleanProvider } from '../hooks/booleanContext'
import { readPromptSetting } from '../managers/prompt'
import { readPrompt } from '../managers/prompt'
import { resolvePattern } from '../managers/prompt'

const toolbarButtonWidth = 28
const toolbarROffset = 46

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

function initButtonContainer(holder: HTMLElement, form: HTMLFormElement, sidebarHolder: HTMLElement): HTMLDivElement {
  const buttonContainer = document.createElement('div')
  function positionToolbarButton() {
    //I had to move this button outside of the form and hack the position related to textarea's size and location. 
    //Because the event for submitting the message is bound to all descendants of the form, not to the direct child, currently.
    if (!form) return
    
    const formRect = form.getBoundingClientRect()
    const buttonXPos = formRect.right - toolbarButtonWidth - toolbarROffset
    buttonContainer.style.width = `${toolbarButtonWidth}px`
    buttonContainer.style.left = `${buttonXPos}px`
  }

  holder.appendChild(buttonContainer) 
  positionToolbarButton()
  window.addEventListener("resize", (_) => positionToolbarButton())

  const observer = new MutationObserver((mutations) => {
    for(let mutation of mutations) {
      if (mutation.type === 'attributes') {
        positionToolbarButton()
      }
    }
  })
  observer.observe(sidebarHolder, { attributes: true, attributeFilter: ['style'] })

  buttonContainer.classList.value = "flex fixed text-gray-500 items-center"
  buttonContainer.style.bottom = 68 + 'px'

  return buttonContainer
}

function handlePromptSubmit(textarea: HTMLTextAreaElement, submit: HTMLButtonElement) {
  textarea.classList.add("chatgpt-textarea")
  textarea.style.paddingRight = "4.5rem"
  submit.classList.add("chatgpt-submit")
  
  function resolve() {
    if (!textarea || !textarea.value.trim()) return
    
    textarea.focus()
    const e = new KeyboardEvent('keydown', {
      key: 'Enter', 
      code: 'Enter', 
      ctrlKey: true,
      bubbles: true
    })
    textarea.dispatchEvent(e)
  }
  
  textarea.addEventListener("keydown", async function(e) {
    if(e.key !== 'Enter' || e.shiftKey || e.ctrlKey) return
    e.preventDefault()
    e.stopImmediatePropagation()
    await applyPrompt(textarea)
    resolve()
  }, {capture: true})
  
  submit.addEventListener("click", async function(e) {
    e.stopImmediatePropagation()
    await applyPrompt(textarea)
    resolve()
  }, {capture: true})
}

async function patch() {
  console.debug("chatgpt++ patch")

  const chatgptTextarea = document.querySelector<HTMLTextAreaElement>('div#__next textarea')
  const chatgptSubmit = chatgptTextarea?.parentNode?.querySelector<HTMLButtonElement>('button')
  const chatgptForm = document.querySelector<HTMLFormElement>('form')
  const chatgptFormHolder = chatgptForm?.parentElement as HTMLDivElement
  const chatgptSidebarHolder = document.querySelector<HTMLDivElement>('div#__next div.dark')
  const inputContainer = chatgptTextarea?.parentElement as HTMLDivElement
  if (!chatgptTextarea || !chatgptSubmit || !inputContainer || !chatgptForm || !chatgptFormHolder || !chatgptSidebarHolder) {
    console.error("Chatgpt++ patch failed. Some of elements doesn't exist")
    return
  }

  handlePromptSubmit(chatgptTextarea, chatgptSubmit)
  const buttonContainer = initButtonContainer(chatgptFormHolder, chatgptForm, chatgptSidebarHolder)
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

export async function waitForPatch() {
  //Properly waits any actual conversation text is appeared.
  let intervalId = setInterval(function() {
  if(document.querySelector('p')) {
    patch()
    clearInterval(intervalId)
  }
  }, 500)

  window.addEventListener('beforeunload', function() {
    clearInterval(intervalId)
})
}