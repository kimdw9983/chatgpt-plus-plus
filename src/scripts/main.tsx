import { getElement, getRootElement } from '../utils/elementUtil'

let textarea: HTMLElement

async function patch() {
  textarea = getElement('textarea')

  const textareaParentParent = textarea?.parentElement?.parentElement
  // if (!textareaParentParent) throw new Error('textareaParentParent is not found')

  console.log(textareaParentParent)
}

const rootEl = getRootElement()
window.onload = function () {
  patch()

  try {
    new MutationObserver(() => { patch() }).observe(rootEl, { childList: true }) 
  } catch(e: any) {
    console.info("error occured during patch", e)
  }
}
