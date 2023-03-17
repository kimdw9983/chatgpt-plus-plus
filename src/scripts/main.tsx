import { render } from 'preact'
import { getElement, getChatgptRoot } from '../utils/element'
import ToggleButton from '../components/toggleButton' 

async function patch() {
  const textarea = getElement('div#__next textarea')
  const submit = textarea?.parentNode?.querySelector('button')
  const inputHolder = textarea?.parentElement
  if (!textarea || !submit || !inputHolder ) return

  render(<ToggleButton style={{width: "80px", height: "80px", position: "absolute", right: "50px"}} popup={(
    <div>Popup!</div>
  )}/>, inputHolder) 
}

window.onload = function() {
  patch()
  new MutationObserver(() => { patch() }).observe(getChatgptRoot(), { childList: true }) 
}