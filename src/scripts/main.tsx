import { getElement, getChatgptRoot } from '../utils/elementUtil'

async function patch() {
  const textarea = getElement('div#__next textarea')
  if (!textarea) return

  textarea.classList.add("chatgpt-textarea")
  
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