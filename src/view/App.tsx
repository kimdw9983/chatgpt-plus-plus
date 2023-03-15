import { h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import './App.css'

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" alt="logo"/>
      </header>
      Hello World!
    </div>
  )
}

export default App