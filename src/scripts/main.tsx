import { render } from 'preact'
import { BooleanProvider } from '../hooks/booleanContext'
import { getElement, getChatgptRoot } from '../utils/element'
import svg from '../assets/svg'
import ToggleButton from '../components/base/toggleButton'
import Toolbar from '../components/toolbar'

const constants = {
  toolbarButtonRight: 36,
  toolbarButtonWidth: 28,
  getToolbarWidth(inputContainer: HTMLElement): string {
    return window.getComputedStyle(inputContainer).width
  },
  calculateToolbarPosition(inputContainer: HTMLElement): string {
    return -Number(this.getToolbarWidth(inputContainer).replace("px", "")) + this.toolbarButtonRight + this.toolbarButtonWidth + "px"
  },
}
async function patch() {
  const cppToolbar = document.querySelector("div.cpp-toolbar-button")
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
  buttonContainer.style.right = constants.toolbarButtonRight + 'px'

  const toolbarWidth = constants.getToolbarWidth(inputContainer)
  const toolbarLeft = constants.calculateToolbarPosition(inputContainer)
  const toolbarButton = (
  <BooleanProvider>
    <Toolbar style={{ top: '-12px', width: toolbarWidth, left: toolbarLeft, transform: "translate(0, -100%)" }} />
    <ToggleButton innerText={(<svg.settings/>)} style={{ width: constants.toolbarButtonWidth+"px", height: "24px", fontSize: "10pt" }} className={ "cpp-toolbar-button" } />
  </BooleanProvider>
  )
  const toolbarButtonContainer = document.createElement('div')
  buttonContainer.appendChild(toolbarButtonContainer)
  render(toolbarButton, toolbarButtonContainer) 
}

window.onload = function() {
  //TODO: improve this to wait until chilren are loaded
  patch()
  new MutationObserver(() => { patch() }).observe(getChatgptRoot(), { childList: true }) 
}