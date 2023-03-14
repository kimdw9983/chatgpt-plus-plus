import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './view/App'
import './index.css'

const rootElement = document.createElement("div");
rootElement.id = "root";
document.body.appendChild(rootElement);

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
