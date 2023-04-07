import { render } from 'preact'
import { BooleanProvider } from '../hooks/booleanContext'
import { getElement, getChatgptRoot } from '../utils/element'
import { uiUtils } from '../utils/ui'
import ToggleButton from '../components/base/toggleButton'
import Toolbar from '../components/toolbar'

async function patch() {
  const cppToolbar = document.querySelector("div.cpp-toolbarButton")
  if (cppToolbar) return

  const textarea = getElement('div#__next textarea')
  const submit = textarea?.parentNode?.querySelector('button')
  const inputContainer = textarea?.parentElement
  const form = textarea?.parentElement?.parentElement?.parentElement
  if (!textarea || !submit || !inputContainer || !form ) return

  const buttonContainer = document.createElement('div')
  inputContainer.appendChild(buttonContainer)
  buttonContainer.style.display = 'flex'
  buttonContainer.style.alignItems = 'center'
  buttonContainer.style.position = 'absolute'
  buttonContainer.style.right = uiUtils.toolbarButtonRight + 'px'

  const inputClassName = `${uiUtils.getBoxClassName()} absolute py-3 md:pl-4 cpp-toolbar`
  const toolbarWidth = uiUtils.getToolbarWidth(inputContainer)
  const toolbarLeft = uiUtils.calculateToolbarPosition(inputContainer)
  const toolbarButton = (
  <BooleanProvider>
    <Toolbar style={{ top: '-12px', width: toolbarWidth, left: toolbarLeft, transform: "translate(0, -100%)" }} className={ inputClassName } />
    <ToggleButton innerText={"⚙️"} style={{ width: uiUtils.toolbarButtonWidth+"px", height: "24px", fontSize: "10pt" }} className={ "cpp-toolbarButton" } />
  </BooleanProvider>
  )
  const toolbarButtonContainer = document.createElement('div')
  buttonContainer.appendChild(toolbarButtonContainer)
  render(toolbarButton, toolbarButtonContainer) 
}

window.onload = function() {
  patch()
  new MutationObserver(() => { patch() }).observe(getChatgptRoot(), { childList: true }) 
}