import { getElement, getChatgptRoot } from '../utils/elementUtil'

async function patch() {
  const textarea = getElement('div#__next textarea')
  const submit = textarea?.parentNode?.querySelector('button')
  const cppToolbar = textarea?.parentElement?.parentNode?.querySelector(".btn-neutral")?.parentElement

  if (!textarea || !submit || !cppToolbar) return
  cppToolbar.classList.add('chatgpt-cpp-toolbar')
  textarea.classList.add("chatgpt-textarea")
  submit.classList.add('chatgpt-submit')
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