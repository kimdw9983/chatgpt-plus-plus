import { getElement, getChatgptRoot } from '../utils/element'

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

window.onload = function() {
  patch()
  new MutationObserver(() => { patch() }).observe(getChatgptRoot(), { childList: true }) 
}