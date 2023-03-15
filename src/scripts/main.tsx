import { getElement, getChatgptRoot } from '../utils/elementUtil'

async function patch() {
  const textarea = getElement('div#__next textarea')
  const submit = textarea?.parentNode?.querySelector('button')
  const regenButton = textarea?.parentElement?.parentNode?.querySelector(".btn-neutral") as HTMLButtonElement
  const cppToolbar = regenButton?.parentElement
  if (!textarea || !submit || !regenButton || !cppToolbar) return

  cppToolbar.classList.add('chatgpt-cpp-toolbar')
  cppToolbar.classList.remove('justify-center')
  // regenButton.style.right = '0'
  // regenButton.style.position = 'absolute'
  textarea.classList.add("chatgpt-textarea")
  submit.classList.add('chatgpt-submit')

  // const element = document.createElement('div')
  // element.innerHTML = "Hello World!"
  // cppToolbar.appendChild(element)
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