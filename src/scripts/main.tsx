import { getElement, getChatgptRoot } from '../utils/elementUtil'

function isPatched() {
  const bool = !!document.querySelector('chatgpt-textarea')
  console.log("isPatched", bool)
  return bool
}

async function patch() {
  if (isPatched()) return

  const textarea = getElement('div#__next textarea')
  const submit = textarea?.parentNode?.querySelector('button')
  const regenButton = textarea?.parentElement?.parentNode?.querySelector(".btn-neutral") as HTMLButtonElement
  const cppToolbar = regenButton?.parentElement
  if (!textarea || !submit || !regenButton || !cppToolbar) {
    console.error('[ChatGPT++] Failed to find elements', textarea, submit, regenButton, cppToolbar, textarea?.parentElement?.parentNode)
    return
  }

  cppToolbar.classList.add('chatgpt-cpp-toolbar')
  cppToolbar.classList.remove('justify-center')
  regenButton.style.right = '0'
  regenButton.style.position = 'absolute'
  textarea.classList.add("chatgpt-textarea")
  submit.classList.add('chatgpt-submit')

  const element = document.createElement('div')
  element.innerHTML = "Hello World!"
  cppToolbar.appendChild(element)
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