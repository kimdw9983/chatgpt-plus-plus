import Browser from 'webextension-polyfill'
import './popup.css'

function openChatGPT() { 
  Browser.tabs.create({
    url: "https://chat.openai.com/",
  })
}

function popup() {
  return (
    <>
      <p>ChatGPT++</p>
      <button onClick={openChatGPT} style={{whiteSpace: "nowrap"}}>Open ChatGPT</button>
    </>
  )
}

export default popup