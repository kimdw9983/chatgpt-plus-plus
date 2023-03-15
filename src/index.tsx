import { h, render } from 'preact'
import App from './view/App'
import './index.css'

const rootElement = document.createElement("div");
rootElement.id = "root";
document.body.appendChild(rootElement);

render(<App />, rootElement)