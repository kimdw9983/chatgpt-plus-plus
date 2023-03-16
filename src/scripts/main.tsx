import { h, render } from 'preact'
import { getElement, getChatgptRoot } from '../utils/element'
import HoverButton from '../components/hoverButton' 
import MyButton from '../components/myButton' 

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
  // render(<HoverButton render={hover => (
  //   <div>{hover}</div>
  // )}/>, inputHolder)
  // render(<MyButton />, inputHolder)
  render(<HoverButton />, inputHolder)
  
}

window.onload = function() {
  patch()
  new MutationObserver(() => { patch() }).observe(getChatgptRoot(), { childList: true }) 
}