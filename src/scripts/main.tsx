import { render } from 'preact'
import { BooleanProvider } from '../hooks/booleanContext'
import svg from '../assets/svg'
import ToggleButton from '../components/base/toggleButton'
import Toolbar from '../components/toolbar'

const toolbarButtonRight = 36
const toolbarButtonWidth = 28
function getToolbarWidth(inputContainer: HTMLElement) {
  return window.getComputedStyle(inputContainer).width
}
function calculateToolbarPosition(inputContainer: HTMLElement): string {
  return -Number(getToolbarWidth(inputContainer).replace("px", "")) + toolbarButtonRight + toolbarButtonWidth + "px"
}

async function patch() {
  const cppToolbar = document.querySelector("div.cpp-toolbar-button")
  if (cppToolbar) return

  const textarea = document.querySelector('div#__next textarea')
  const submit = textarea?.parentNode?.querySelector('button')
  const inputContainer = textarea?.parentElement
  const form = textarea?.parentElement?.parentElement?.parentElement
  if (!textarea || !submit || !inputContainer || !form ) return

  const buttonContainer = document.createElement('div')
  inputContainer.appendChild(buttonContainer)
  buttonContainer.style.display = 'flex'
  buttonContainer.style.alignItems = 'center'
  buttonContainer.style.position = 'absolute'
  buttonContainer.style.right = toolbarButtonRight + 'px'

  const toolbarWidth = getToolbarWidth(inputContainer)
  const toolbarLeft = calculateToolbarPosition(inputContainer)
  const toolbarButton = (
  <BooleanProvider>
    <Toolbar style={{ top: '-12px', width: toolbarWidth, left: toolbarLeft, transform: "translate(0, -100%)" }} />
    <ToggleButton innerText={ <svg.settings/> } style={{ width: toolbarButtonWidth+"px", height: "24px", fontSize: "10pt" }} className={ "cpp-toolbar-button" } />
  </BooleanProvider>
  )
  const toolbarButtonContainer = document.createElement('div')
  buttonContainer.appendChild(toolbarButtonContainer)
  render(toolbarButton, toolbarButtonContainer) 
}

window.onload = function() {
  //TODO: improve this to wait until chilren are loaded
  const chatgptRoot = document.querySelector('div#__next')
  if(!chatgptRoot) return

  patch()
  new MutationObserver(() => { patch() }).observe(chatgptRoot, { childList: true }) 
}