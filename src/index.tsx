import { render } from 'preact'
import Popup from './view/popup'
import './index.css'

const rootElement = document.createElement("div");
rootElement.id = "root";
document.body.appendChild(rootElement);

render(<Popup />, rootElement)