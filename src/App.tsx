import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [url, setUrl] = useState<string>('')
  const [responseFromContent, setResponseFromContent] = useState<string>('')

  useEffect(() => {
    const queryInfo = {active: true, lastFocusedWindow: true}

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const url = tabs[0]?.url
      if (url) setUrl(url)
    })
  }, [])
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo"/>
        <p>URL:</p>
        <p>{url}</p>
      </header>
    </div>
  )
}

export default App
