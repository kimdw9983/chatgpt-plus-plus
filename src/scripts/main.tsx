import { render } from 'preact'
import { ClickProvider } from '../hooks/click'
import { getElement, getChatgptRoot } from '../utils/element'
import { getInputClassName, getToolbarWidth, calculateToolbarPosition, toolbarButtonRight, toolbarButtonWidth } from '../utils/ui'
import ToggleButton from '../components/toggleButton'
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
  buttonContainer.style.right = toolbarButtonRight + 'px'

  const inputContainerClass = inputContainer.className
  const inputClassName = getInputClassName(inputContainerClass)
  const toolbarWidth = getToolbarWidth(inputContainer)
  const left = calculateToolbarPosition(inputContainer)
  const toolbarButtonContainer = document.createElement('div')
  const toolbarButton = (
    <ClickProvider>
      <Toolbar style={{ top: '-225%', width: toolbarWidth, left: left }} class={ inputClassName } />
      <ToggleButton style={{ width: toolbarButtonWidth+"px", height: "24px", fontSize: "10pt" }} class={ "hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md cpp-toolbarButton" } />
    </ClickProvider>
  )
  buttonContainer.appendChild(toolbarButtonContainer)
  render(toolbarButton, toolbarButtonContainer) 
}

window.onload = function() {
  patch()
  new MutationObserver(() => { patch() }).observe(getChatgptRoot(), { childList: true }) 
}