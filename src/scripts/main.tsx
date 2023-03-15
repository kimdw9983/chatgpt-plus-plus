import { getElement, getChatgptRoot } from '../utils/elementUtil'

async function patch() {
  const textarea = getElement('div#__next textarea')
  const submit = textarea?.parentNode?.querySelector('button')
  const inputHolder = textarea?.parentElement
  if (!textarea || !submit || !inputHolder ) return

  const toolbarButton = document.createElement('button')
  toolbarButton.style.position = "absolute"
  toolbarButton.style.right = "50px"
  toolbarButton.innerHTML = 'test'
  
  inputHolder.appendChild(toolbarButton)
}

const root = getChatgptRoot()
window.onload = function() {
  patch()

  try {
    new MutationObserver(() => { patch() }).observe(root, { childList: true }) 
  } catch(e: any) {
    console.info("error occured during patch", e)
  }
}