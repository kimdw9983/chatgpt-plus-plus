import { createContext, render } from 'preact'
import { ClickProvider } from '../context/click'
import { getElement, getChatgptRoot } from '../utils/element'
import ToggleButton from '../components/toggleButton'
import Toolbar from '../components/toolbar'

async function patch() {
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
  buttonContainer.classList.add("right-1")

  submit.classList.remove('absolute')
  form.classList.add('relative')

  const ToolbarContainer = document.createElement('div')
  ToolbarContainer.className = "flex absolute ml-1 md:w-full md:m-auto gap-0 md:gap-2 p-2 rounded-md dark:bg-gray-700 border border-black/10 bg-white dark:border-gray-900/50 dark:text-white shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)"
  form.appendChild(ToolbarContainer)
  render(
    (<ClickProvider>
      <Toolbar/>
    </ClickProvider>
    ), ToolbarContainer)

  const toolbarButtonContainer = document.createElement('div')
  const toolbarButton = (
    <ClickProvider>
      <ToggleButton style={{width: "28px", height: "24px", fontSize: "10pt"}} class={"hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"} />
    </ClickProvider>
  )
  buttonContainer.appendChild(toolbarButtonContainer)
  render(toolbarButton, toolbarButtonContainer) 
  buttonContainer.appendChild(submit)
}

window.onload = function() {
  patch()
  new MutationObserver(() => { patch() }).observe(getChatgptRoot(), { childList: true }) 
}